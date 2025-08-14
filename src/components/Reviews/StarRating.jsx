import { Star } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 'w-5 h-5' }) => {
    const stars = [1, 2, 3, 4, 5];

    const handleStarClick = (starRating) => {
        if (!readonly && onRatingChange) {
            onRatingChange(starRating);
        }
    };

    return (
        <div className="flex gap-1">
            {stars.map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    disabled={readonly}
                    className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
                >
                    <Star
                        className={`${size} ${star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export default StarRating;
