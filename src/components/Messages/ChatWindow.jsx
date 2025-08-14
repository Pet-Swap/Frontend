import { ArrowLeft, Calendar, MessageCircle, User, Clock, AlertCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useMatchCompletedBookings, useMatchActiveBookings, useConfirmBooking, useCancelBooking } from '../../hooks/useBookings';
import { useMatchMessages } from '../../hooks/useMessages';
import { useMyMatches } from '../../hooks/useSwipes';
import BookingForm from '../Bookings/BookingForm';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import MessageBubble from './MessageBubble';
import SendMessageForm from './SendMessageForm';
import UserProfileDialog from './UserProfileDialog';
import BookingInfo from './BookingInfo';
import BookingIndicator from './BookingIndicator';
import BookingInfoCompact from './BookingInfoCompact';
import ListingInfoDialog from './ListingInfoDialog';

const ChatWindow = ({ conversation, onBack }) => {
    const { user } = useAuth();
    const messagesEndRef = useRef(null);
    const [fullConversation, setFullConversation] = useState(conversation);
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [showRebookForm, setShowRebookForm] = useState(false);
    const [showBookingDialog, setShowBookingDialog] = useState(false);
    const [showListingDialog, setShowListingDialog] = useState(false);

    const { data: messages, isLoading, error } = useMatchMessages(conversation?.matchId);
    const { data: allMatches } = useMyMatches();
    const { data: completedBookings } = useMatchCompletedBookings(conversation?.matchId);
    const { data: activeBookings } = useMatchActiveBookings(conversation?.matchId);
    const confirmBookingMutation = useConfirmBooking();
    const cancelBookingMutation = useCancelBooking();

    useEffect(() => {
        if (conversation?.matchId && allMatches && (!conversation?.match || !conversation?.match?.confirmed !== undefined)) {
            const match = allMatches.find(m => m.id === conversation.matchId);

            if (match) {
                const isUserOwner = user?.id === match.listing?.ownerId;

                let otherUser = conversation?.otherUser;
                if (!otherUser) {
                    otherUser = isUserOwner
                        ? match.petSitter
                        : {
                            id: match.listing?.ownerId,
                            username: match.listing?.ownerUsername,
                            avatarUrl: match.listing?.ownerAvatarUrl
                        };
                }

                const newFullConversation = {
                    ...conversation,
                    matchId: match.id,
                    otherUser,
                    listing: match.listing,
                    match: match
                };

                setFullConversation(newFullConversation);
            }
        } else if (!conversation?.match && conversation) {
            setFullConversation(conversation);
        }
    }, [conversation, allMatches, user?.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleShowProfile = () => {
        setShowProfileDialog(true);
    };

    const handleCloseProfileDialog = () => {
        setShowProfileDialog(false);
    };

    const handleShowListing = () => {
        setShowListingDialog(true);
    };

    const handleCloseListingDialog = () => {
        setShowListingDialog(false);
    };

    const handleRebook = () => {
        const virtualMatch = {
            id: `rebook-${fullConversation.matchId}`,
            listing: fullConversation.listing,
            petSitter: fullConversation.match?.petSitter,
            confirmed: true,
            isRebooking: true
        };
        setShowRebookForm(virtualMatch);
    };

    const handleCloseRebookForm = () => {
        setShowRebookForm(false);
    };

    const handleConfirmBooking = (bookingId) => {
        confirmBookingMutation.mutate(bookingId);
    };

    const handleCancelBooking = (bookingId) => {
        cancelBookingMutation.mutate(bookingId);
    };

    const getMatchStatus = (match) => {
        if (match?.confirmed) return 'CONFIRMED';
        if (!match?.ownerLikedBack) return 'PENDING';
        return 'DECLINED';
    };

    if (!fullConversation) {
        return (
            <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Sélectionnez une conversation pour commencer</p>
                </CardContent>
            </Card>
        );
    }

    const matchStatus = getMatchStatus(fullConversation.match);
    const isConfirmedMatch = matchStatus === 'CONFIRMED';
    const hasCompletedBookings = completedBookings && completedBookings.length > 0;
    const hasActiveBookings = activeBookings && activeBookings.length > 0;
    
    // Trouver la prochaine réservation la plus importante à afficher
    const getNextImportantBooking = () => {
        if (!activeBookings || activeBookings.length === 0) return null;
        
        // Prioriser : en cours > aujourd'hui > en attente > à venir
        const ongoing = activeBookings.find(b => {
            const now = new Date();
            return new Date(b.startDate) <= now && new Date(b.endDate) >= now;
        });
        if (ongoing) return ongoing;
        
        const today = activeBookings.find(b => {
            const today = new Date().toDateString();
            return new Date(b.startDate).toDateString() === today;
        });
        if (today) return today;
        
        const pending = activeBookings.find(b => b.status === 'PENDING');
        if (pending) return pending;
        
        // Sinon la plus proche dans le temps
        return activeBookings.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];
    };
    
    const nextBooking = getNextImportantBooking();

    if (showRebookForm) {
        return (
            <div className="h-full">
                <BookingForm
                    match={showRebookForm}
                    onClose={handleCloseRebookForm}
                    isRebooking={true}
                />
            </div>
        );
    }

    return (
        <Card className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    className="md:hidden"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>

                {/* Photo et nom d'utilisateur - cliquable pour le profil */}
                <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={handleShowProfile}
                >
                    {fullConversation.otherUser?.avatarUrl ? (
                        <img
                            src={fullConversation.otherUser.avatarUrl}
                            alt={fullConversation.otherUser.username}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                            {fullConversation.otherUser?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                    )}

                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-medium">{fullConversation.otherUser?.username}</h3>
                            <User className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Informations listing et réservation */}
                <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        {/* Titre du listing - cliquable pour voir les détails */}
                        <p 
                            className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 hover:underline transition-colors"
                            onClick={handleShowListing}
                        >
                            {fullConversation.listing?.title}
                        </p>
                        
                        {!isConfirmedMatch && (
                            <p className="text-xs text-orange-600">Match en attente de confirmation</p>
                        )}
                    </div>

                    {/* Indicateur de réservation - cliquable pour voir les détails */}
                    {nextBooking && (
                        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
                            <DialogTrigger asChild>
                                <div>
                                    <BookingIndicator booking={nextBooking} />
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Réservation avec {fullConversation.otherUser?.username}</DialogTitle>
                                </DialogHeader>
                                <BookingInfoCompact
                                    booking={nextBooking}
                                    currentUserId={user?.id}
                                    otherUser={fullConversation.otherUser}
                                    onConfirm={handleConfirmBooking}
                                    onCancel={handleCancelBooking}
                                />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {/* Suggestion de re-booking pour les conversations avec réservations terminées */}
                {hasCompletedBookings && isConfirmedMatch && !hasActiveBookings && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-blue-800 font-medium text-sm mb-1">
                                    ✨ Vous avez déjà travaillé ensemble !
                                </p>
                                <p className="text-blue-700 text-xs mb-3">
                                    Vous avez eu {completedBookings.length} garde{completedBookings.length > 1 ? 's' : ''} ensemble.
                                    Planifiez facilement une nouvelle réservation.
                                </p>
                                <Button
                                    size="sm"
                                    onClick={handleRebook}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Planifier une nouvelle garde
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading ? (
                    <div className="text-center py-8">
                        <p>Chargement des messages...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-600">Erreur lors du chargement des messages</p>
                    </div>
                ) : !messages || messages.length === 0 ? (
                    <div className="text-center py-8">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 mb-2">Aucun message</p>
                        <p className="text-sm text-gray-500">
                            Commencez la conversation en envoyant un message
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <SendMessageForm
                matchId={fullConversation.matchId}
                disabled={!isConfirmedMatch}
            />

            <UserProfileDialog
                user={fullConversation.otherUser}
                isOpen={showProfileDialog}
                onClose={handleCloseProfileDialog}
            />

            {/* Dialog pour les détails du listing */}
            <Dialog open={showListingDialog} onOpenChange={setShowListingDialog}>
                <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Détails du listing</DialogTitle>
                    </DialogHeader>
                    <ListingInfoDialog
                        listing={fullConversation.listing}
                        petSitter={fullConversation.match?.petSitter}
                    />
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ChatWindow;
