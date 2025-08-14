import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import StarRating from './StarRating';

const ReviewCard = ({ review, showBookingInfo = true }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    {/* Avatar du reviewer */}
                    <div className="flex-shrink-0">
                        {review.reviewerAvatarUrl ? (
                            <img
                                src={review.reviewerAvatarUrl}
                                alt={review.reviewerUsername}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                {review.reviewerUsername?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        {/* Header de l'avis */}
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <p className="font-medium">{review.reviewerUsername}</p>
                                {review.reviewerRole && (
                                    <Badge variant="outline" className="text-xs">
                                        {review.reviewerRole === 'OWNER' ? 'Propriétaire' : 'Pet-sitter'}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <StarRating rating={review.rating} readonly size="w-4 h-4" />
                                <span className="text-sm text-gray-600">
                                    {formatDate(review.createdAt)}
                                </span>
                            </div>
                        </div>

                        {/* Informations sur la réservation si demandé */}
                        {showBookingInfo && review.booking && (
                            <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                                <p className="text-gray-600">
                                    Garde de <strong>{review.booking.match?.listing?.pet?.name}</strong>
                                    {' '}• {review.booking.match?.listing?.title}
                                </p>
                            </div>
                        )}

                        {/* Commentaire */}
                        {review.comment && (
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        )}

                        {/* Note d'aide si pas de commentaire */}
                        {!review.comment && (
                            <p className="text-gray-500 italic text-sm">
                                Aucun commentaire ajouté
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
