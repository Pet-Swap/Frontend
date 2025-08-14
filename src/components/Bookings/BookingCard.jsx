import { Calendar, CheckCircle, Clock, Euro, MapPin, Star, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCancelBooking, useCompleteBooking, useConfirmBooking } from '../../hooks/useBookings';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import BookingReviewsDisplay from '../Reviews/BookingReviewsDisplay';

const BookingCard = ({ booking, onCreateReview, onRebook }) => {
    const { user } = useAuth();
    const confirmMutation = useConfirmBooking();
    const cancelMutation = useCancelBooking();
    const completeMutation = useCompleteBooking();

    const listing = booking?.match?.listing;
    const pet = listing?.pet;
    const petSitter = booking?.match?.petSitter;
    const owner = { username: listing?.ownerUsername, avatarUrl: listing?.ownerAvatarUrl };

    const isOwner = user?.id === listing?.ownerId;
    const isPetSitter = user?.id === petSitter?.id;

    const getStatusInfo = (status) => {
        const configs = {
            PENDING: {
                label: 'En attente de réponse',
                color: 'bg-yellow-100 text-yellow-800',
                icon: Clock
            },
            CONFIRMED: {
                label: 'Garde confirmée',
                color: 'bg-green-100 text-green-800',
                icon: CheckCircle
            },
            IN_PROGRESS: {
                label: 'Garde en cours',
                color: 'bg-blue-100 text-blue-800',
                icon: Clock
            },
            COMPLETED: {
                label: 'Garde terminée',
                color: 'bg-gray-100 text-gray-800',
                icon: CheckCircle
            },
            CANCELLED: {
                label: 'Demande annulée',
                color: 'bg-red-100 text-red-800',
                icon: XCircle
            }
        };
        return configs[status] || configs.PENDING;
    };

    const statusInfo = getStatusInfo(booking.status);
    const StatusIcon = statusInfo.icon;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    };

    const calculateDays = () => {
        const start = new Date(booking.startDate);
        const end = new Date(booking.endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const days = calculateDays();

    const isBookingEnded = booking.status === 'CONFIRMED' &&
        new Date(booking.endDate) < new Date();

    const handleConfirm = () => {
        if (window.confirm('Êtes-vous sûr de vouloir confirmer cette réservation ?')) {
            confirmMutation.mutate(booking.id);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            cancelMutation.mutate(booking.id);
        }
    };

    const handleComplete = () => {
        const message = isBookingEnded
            ? 'Confirmer que cette garde est terminée ? Vous pourrez ensuite laisser un avis.'
            : 'Marquer cette réservation comme terminée ?';

        if (window.confirm(message)) {
            completeMutation.mutate(booking.id);
        }
    };

    const handleRebook = () => {
        if (onRebook) {
            onRebook(booking);
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{listing?.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {statusInfo.label}
                            </span>
                        </div>

                        {/* Informations sur l'animal */}
                        <div className="mb-3">
                            <p className="text-blue-600 font-medium">
                                {pet?.name} ({pet?.species})
                            </p>
                            {pet?.breed && (
                                <p className="text-sm text-gray-600">{pet.breed}</p>
                            )}
                        </div>

                        {/* Détails de la réservation */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>
                                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                    ({days} jour{days > 1 ? 's' : ''})
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{listing?.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Euro className="w-4 h-4 mr-2" />
                                <span>{booking.totalPrice}€ total</span>
                            </div>
                        </div>

                        {/* Demandes spéciales */}
                        {booking.specialRequests && (
                            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-blue-800">
                                    <strong>Instructions du propriétaire :</strong> {booking.specialRequests}
                                </p>
                            </div>
                        )}

                        {/* Participants */}
                        <div className="flex justify-between items-center pt-3 border-t">
                            <div className="flex items-center">
                                {owner.avatarUrl ? (
                                    <img
                                        src={owner.avatarUrl}
                                        alt={owner.username}
                                        className="w-8 h-8 rounded-full object-cover mr-2"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-xs">
                                        {owner.username?.[0]?.toUpperCase() || 'P'}
                                    </div>
                                )}
                                <span className="text-sm font-medium">Propriétaire: {owner.username}</span>
                            </div>

                            <div className="flex items-center">
                                {petSitter?.avatarUrl ? (
                                    <img
                                        src={petSitter.avatarUrl}
                                        alt={petSitter.username}
                                        className="w-8 h-8 rounded-full object-cover mr-2"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-xs">
                                        {petSitter?.username?.[0]?.toUpperCase() || 'S'}
                                    </div>
                                )}
                                <span className="text-sm font-medium">Pet-sitter: {petSitter?.username}</span>
                            </div>
                        </div>
                    </div>

                    {/* Photo de l'animal */}
                    {pet?.photoUrl && (
                        <img
                            src={pet.photoUrl}
                            alt={pet.name}
                            className="w-20 h-20 rounded-lg object-cover ml-4"
                        />
                    )}
                </div>

                {/* Notification pour garde terminée */}
                {isBookingEnded && (
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Clock className="w-3 h-3 text-white" />
                            </div>
                            <div>
                                <p className="text-orange-800 font-medium text-sm">
                                    Cette garde est terminée !
                                </p>
                                <p className="text-orange-700 text-xs mt-1">
                                    Marquez-la comme terminée pour pouvoir laisser un avis et débloquer de nouvelles réservations.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                    {booking.status === 'PENDING' && isPetSitter && (
                        <>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleCancel}
                                disabled={cancelMutation.isPending}
                            >
                                Refuser
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleConfirm}
                                disabled={confirmMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Accepter
                            </Button>
                        </>
                    )}

                    {booking.status === 'PENDING' && isOwner && (
                        <div className="w-full text-center">
                            <p className="text-sm text-gray-600 mb-2">En attente de la réponse du pet-sitter...</p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancel}
                                disabled={cancelMutation.isPending}
                                className="text-red-600 hover:text-red-700"
                            >
                                Annuler ma demande
                            </Button>
                        </div>
                    )}

                    {booking.status === 'CONFIRMED' && (
                        <>
                            {!isBookingEnded && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancel}
                                    disabled={cancelMutation.isPending}
                                >
                                    Annuler
                                </Button>
                            )}
                            {(isOwner || isPetSitter) && (
                                <Button
                                    size={isBookingEnded ? "default" : "sm"}
                                    onClick={handleComplete}
                                    disabled={completeMutation.isPending}
                                    className={`${isBookingEnded
                                        ? "bg-green-600 hover:bg-green-700 w-full animate-pulse"
                                        : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                >
                                    {isBookingEnded ? "✅ Finaliser cette garde" : "Marquer terminée"}
                                </Button>
                            )}
                        </>
                    )}

                    {booking.status === 'COMPLETED' && isOwner && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRebook}
                            className="flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            Redemander une garde
                        </Button>
                    )}
                </div>

                {/* Affichage des reviews pour les réservations terminées */}
                {booking.status === 'COMPLETED' && (
                    <div className="mt-4 pt-4 border-t">
                        <BookingReviewsDisplay 
                            booking={booking} 
                            onCreateReview={onCreateReview}
                            compact={true}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default BookingCard;
