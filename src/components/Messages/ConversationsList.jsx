import { Clock, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useConversations } from '../../hooks/useMessages';
import { useMyMatches } from '../../hooks/useSwipes';
import { Card, CardContent } from '../ui/card';

const ConversationsList = ({ onSelectConversation, selectedConversationId }) => {
    const { user } = useAuth();
    const { data: conversations, isLoading, error } = useConversations();
    const { data: allMatches } = useMyMatches();
    const [enrichedConversations, setEnrichedConversations] = useState([]);

    // Enrichir les conversations avec les données des matches
    useEffect(() => {
        if (conversations && allMatches) {
            // Grouper les conversations par matchId pour éviter les doublons
            const conversationsMap = new Map();

            conversations.forEach(conversation => {
                const matchId = conversation.matchId;

                // Si on a déjà cette conversation, garder celle avec le message le plus récent
                if (conversationsMap.has(matchId)) {
                    const existing = conversationsMap.get(matchId);
                    const existingTime = existing.lastMessage?.sentAt || '1970-01-01';
                    const currentTime = conversation.lastMessage?.sentAt || '1970-01-01';

                    if (currentTime > existingTime) {
                        conversationsMap.set(matchId, conversation);
                    }
                } else {
                    conversationsMap.set(matchId, conversation);
                }
            });

            // Enrichir avec les données des matches
            const enriched = Array.from(conversationsMap.values()).map(conversation => {
                const match = allMatches.find(m => m.id === conversation.matchId);
                if (match && !conversation.otherUser) {
                    // Déterminer qui est l'autre utilisateur
                    const isUserOwner = user?.id === match.listing?.ownerId;
                    const otherUser = isUserOwner
                        ? match.petSitter
                        : {
                            id: match.listing?.ownerId,
                            username: match.listing?.ownerUsername,
                            avatarUrl: match.listing?.ownerAvatarUrl
                        };

                    return {
                        ...conversation,
                        otherUser,
                        listing: match.listing
                    };
                }
                return conversation;
            });

            // Trier par date du dernier message (le plus récent en premier)
            enriched.sort((a, b) => {
                const timeA = a.lastMessage?.sentAt || '1970-01-01';
                const timeB = b.lastMessage?.sentAt || '1970-01-01';
                return new Date(timeB) - new Date(timeA);
            });

            setEnrichedConversations(enriched);
        } else {
            setEnrichedConversations(conversations || []);
        }
    }, [conversations, allMatches, user?.id]);

    if (isLoading) {
        return (
            <Card className="h-full">
                <CardContent className="p-6">
                    <p>Chargement des conversations...</p>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="h-full">
                <CardContent className="p-6">
                    <p className="text-red-600">Erreur lors du chargement des conversations</p>
                </CardContent>
            </Card>
        );
    }

    if (!enrichedConversations || enrichedConversations.length === 0) {
        return (
            <Card className="h-full">
                <CardContent className="p-6 text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">Aucune conversation</p>
                    <p className="text-sm text-gray-500">
                        Vos conversations avec les autres utilisateurs apparaîtront ici
                    </p>
                </CardContent>
            </Card>
        );
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'À l\'instant';
        } else if (diffInHours < 24) {
            return `Il y a ${Math.floor(diffInHours)}h`;
        } else if (diffInHours < 168) {
            return `Il y a ${Math.floor(diffInHours / 24)}j`;
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short'
            });
        }
    };

    return (
        <Card className="h-full">
            <CardContent className="p-0">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Conversations ({enrichedConversations.length})
                    </h2>
                </div>
                <div className="overflow-y-auto max-h-96">
                    {enrichedConversations.map((conversation) => (
                        <div
                            key={conversation.matchId}
                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversationId === conversation.matchId ? 'bg-blue-50 border-blue-200' : ''
                                }`}
                            onClick={() => onSelectConversation(conversation)}
                        >
                            <div className="flex items-start gap-3">
                                {/* Avatar de l'autre utilisateur */}
                                <div className="flex-shrink-0">
                                    {conversation.otherUser?.avatarUrl ? (
                                        <img
                                            src={conversation.otherUser.avatarUrl}
                                            alt={conversation.otherUser.username}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                            {conversation.otherUser?.username?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-medium text-sm truncate">
                                            {conversation.otherUser?.username || 'Utilisateur'}
                                        </p>
                                        {conversation.lastMessage && (
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatTime(conversation.lastMessage.sentAt)}
                                            </span>
                                        )}
                                    </div>

                                    {/* Titre de l'annonce */}
                                    <p className="text-xs text-blue-600 mb-1 truncate">
                                        {conversation.listing?.title || 'Annonce'}
                                    </p>

                                    {/* Dernier message */}
                                    {conversation.lastMessage ? (
                                        <p className="text-sm text-gray-600 truncate">
                                            {conversation.lastMessage.senderUsername === conversation.otherUser?.username ? '' : 'Vous: '}
                                            {conversation.lastMessage.content}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">
                                            Aucun message
                                        </p>
                                    )}
                                </div>

                                {/* Badge pour nouveaux messages (si implémenté côté backend) */}
                                {conversation.unreadCount > 0 && (
                                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {conversation.unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ConversationsList;
