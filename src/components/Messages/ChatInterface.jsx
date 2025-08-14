import { useSearch } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ChatWindow from './ChatWindow';
import ConversationsList from './ConversationsList';

const ChatInterface = () => {
    const { user } = useAuth();
    const search = useSearch({ from: '/messages' });
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [showChat, setShowChat] = useState(false);

    // Si un matchId est fourni dans l'URL, créer automatiquement une "conversation"
    useEffect(() => {
        if (search?.matchId) {
            // Créer une conversation temporaire avec juste le matchId
            const tempConversation = {
                matchId: search.matchId,
                // Les autres données seront chargées par le ChatWindow
            };
            setSelectedConversation(tempConversation);
            setShowChat(true);
        }
    }, [search?.matchId]);

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
        setShowChat(true);
    };

    const handleBackToList = () => {
        setShowChat(false);
        setSelectedConversation(null);
    };

    if (!user) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <div className="text-center">
                    <p className="text-gray-600">Vous devez être connecté pour accéder aux messages.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
                {/* Liste des conversations - masquée sur mobile quand chat ouvert */}
                <div className={`md:col-span-1 ${showChat ? 'hidden md:block' : 'block'}`}>
                    <ConversationsList
                        onSelectConversation={handleSelectConversation}
                        selectedConversationId={selectedConversation?.matchId}
                    />
                </div>

                {/* Fenêtre de chat - masquée sur mobile quand pas de conversation */}
                <div className={`md:col-span-2 ${!showChat ? 'hidden md:block' : 'block'}`}>
                    <ChatWindow
                        conversation={selectedConversation}
                        onBack={handleBackToList}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
