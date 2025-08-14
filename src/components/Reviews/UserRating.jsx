import { Star } from 'lucide-react';
import { useUserReviews } from '../../hooks/useReviews';
import StarRating from './StarRating';

const UserRating = ({ userId, username, compact = false }) => {
    const { data: reviews, isLoading } = useUserReviews(userId);

    if (isLoading) {
        return (
            <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''}`}>
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className={`flex items-center gap-2 text-gray-500 ${compact ? 'text-sm' : ''}`}>
                <Star className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
                <span>Aucun avis</span>
            </div>
        );
    }

    // Calculer la moyenne
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const roundedRating = Math.round(averageRating * 10) / 10;

    return (
        <div className={`space-y-1 ${compact ? 'text-sm' : ''}`}>
            <div className={`flex items-center gap-2`}>
                <StarRating
                    rating={Math.round(averageRating)}
                    readonly
                    size={compact ? 'w-4 h-4' : 'w-5 h-5'}
                />
                <span className="font-medium">
                    {roundedRating}
                </span>
                <span className="text-gray-500">
                    ({reviews.length} avis reçus)
                </span>
            </div>
            {!compact && (
                <div className="text-xs text-blue-600">
                    💡 Note moyenne des avis reçus de propriétaires et pet-sitters
                </div>
            )}
        </div>
    );
};

export default UserRating;
