import { CheckCircle, Clock, Star, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useBookingReviews, useBookingReviewStatus, useCanReviewBooking } from '../../hooks/useReviews';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import ReviewCard from './ReviewCard';

const BookingReviewsDisplay = ({ booking, onCreateReview, compact = false }) => {
    const { user } = useAuth();
    const { data: reviews, isLoading: reviewsLoading } = useBookingReviews(booking?.id);
    const { data: reviewStatus } = useBookingReviewStatus(booking?.id);
    const { data: canReview } = useCanReviewBooking(booking?.id);

    if (!booking) return null;

    const listing = booking?.match?.listing;
    const petSitter = booking?.match?.petSitter;
    const owner = { username: listing?.ownerUsername, avatarUrl: listing?.ownerAvatarUrl, id: listing?.ownerId };
    
    const isOwner = user?.id === listing?.ownerId;
    const isPetSitter = user?.id === petSitter?.id;

    // Séparer les reviews par type
    const ownerReview = reviews?.find(review => review.reviewerId === owner.id);
    const petSitterReview = reviews?.find(review => review.reviewerId === petSitter?.id);

    // Déterminer si l'utilisateur actuel peut encore reviewer
    const userCanReview = canReview?.canReview && booking.status === 'COMPLETED';

    if (compact) {
        // Version compacte pour affichage dans les cards de booking
        const hasReviews = reviews && reviews.length > 0;
        const userHasReviewed = isOwner ? !!ownerReview : !!petSitterReview;

        return (
            <div className="flex items-center justify-between">
                {hasReviews && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {ownerReview && (
                                <Badge variant="outline" className="text-xs">
                                    <User className="w-3 h-3 mr-1" />
                                    Propriétaire: {ownerReview.rating}★
                                </Badge>
                            )}
                            {petSitterReview && (
                                <Badge variant="outline" className="text-xs">
                                    <User className="w-3 h-3 mr-1" />
                                    Pet-sitter: {petSitterReview.rating}★
                                </Badge>
                            )}
                        </div>
                    </div>
                )}
                
                {userCanReview && !userHasReviewed && (
                    <Button
                        size="sm"
                        onClick={() => onCreateReview(booking)}
                        className="flex items-center gap-2"
                    >
                        <Star className="w-4 h-4" />
                        {hasReviews ? 'Mon avis' : 'Laisser un avis'}
                    </Button>
                )}

                {userHasReviewed && (
                    <div className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Avis publié
                    </div>
                )}
            </div>
        );
    }

    // Version complète pour affichage détaillé
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Évaluations de cette réservation
                    <Badge variant={reviews?.length === 2 ? "default" : "secondary"}>
                        {reviews?.length || 0}/2 avis
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {reviewsLoading ? (
                    <div className="text-center py-4">
                        <p className="text-gray-500">Chargement des avis...</p>
                    </div>
                ) : (
                    <>
                        {/* Statut des reviews */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                {owner.avatarUrl ? (
                                    <img
                                        src={owner.avatarUrl}
                                        alt={owner.username}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        {owner.username?.[0]?.toUpperCase() || 'P'}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{owner.username}</p>
                                    <p className="text-xs text-gray-600">Propriétaire</p>
                                    {ownerReview ? (
                                        <div className="flex items-center gap-1 mt-1">
                                            <CheckCircle className="w-3 h-3 text-green-600" />
                                            <span className="text-xs text-green-600">Avis publié</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3 text-gray-400" />
                                            <span className="text-xs text-gray-500">En attente</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                {petSitter?.avatarUrl ? (
                                    <img
                                        src={petSitter.avatarUrl}
                                        alt={petSitter.username}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        {petSitter?.username?.[0]?.toUpperCase() || 'S'}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{petSitter?.username}</p>
                                    <p className="text-xs text-gray-600">Pet-sitter</p>
                                    {petSitterReview ? (
                                        <div className="flex items-center gap-1 mt-1">
                                            <CheckCircle className="w-3 h-3 text-green-600" />
                                            <span className="text-xs text-green-600">Avis publié</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3 text-gray-400" />
                                            <span className="text-xs text-gray-500">En attente</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Affichage des avis */}
                        {reviews && reviews.length > 0 ? (
                            <div className="space-y-4">
                                {ownerReview && (
                                    <div>
                                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Avis du propriétaire
                                        </h4>
                                        <ReviewCard review={ownerReview} showBookingInfo={false} />
                                    </div>
                                )}

                                {petSitterReview && (
                                    <div>
                                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Avis du pet-sitter
                                        </h4>
                                        <ReviewCard review={petSitterReview} showBookingInfo={false} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <Star className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                <p className="text-gray-600 mb-2">Aucun avis pour cette réservation</p>
                                <p className="text-sm text-gray-500">
                                    Les avis apparaîtront après la finalisation de la garde
                                </p>
                            </div>
                        )}

                        {/* Bouton pour laisser un avis */}
                        {userCanReview && (
                            <div className="pt-4 border-t">
                                {isOwner && !ownerReview && (
                                    <Button
                                        onClick={() => onCreateReview(booking)}
                                        className="w-full flex items-center gap-2"
                                    >
                                        <Star className="w-4 h-4" />
                                        Évaluer le pet-sitter
                                    </Button>
                                )}
                                {isPetSitter && !petSitterReview && (
                                    <Button
                                        onClick={() => onCreateReview(booking)}
                                        className="w-full flex items-center gap-2"
                                    >
                                        <Star className="w-4 h-4" />
                                        Évaluer le propriétaire
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Information si tous les avis sont publiés */}
                        {reviews?.length === 2 && (
                            <div className="bg-green-50 p-3 rounded-lg text-center">
                                <CheckCircle className="w-5 h-5 mx-auto mb-2 text-green-600" />
                                <p className="text-sm text-green-800 font-medium">
                                    Tous les avis ont été publiés !
                                </p>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default BookingReviewsDisplay;
