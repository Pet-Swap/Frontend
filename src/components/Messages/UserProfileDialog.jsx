import { Star, User } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useUserReviews } from '../../hooks/useReviews';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const UserProfileDialog = ({ user, isOpen, onClose }) => {
    const { data: fullProfile, isLoading: profileLoading } = useProfile(user?.id);
    const { data: reviews, isLoading: reviewsLoading } = useUserReviews(user?.id);

    if (!user) return null;

    const profile = fullProfile || user;
    const averageRating = reviews && reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;
    const totalReviews = reviews?.length || 0;

    const formatRole = (role) => {
        switch (role) {
            case 'PET_SITTER': return 'Pet-sitter';
            case 'OWNER': return 'Propriétaire';
            case 'BOTH': return 'Propriétaire & Pet-sitter';
            default: return 'Utilisateur';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        {profile.avatarUrl ? (
                            <img
                                src={profile.avatarUrl}
                                alt={profile.username}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-semibold">{profile.username}</h3>
                            <p className="text-sm text-gray-600">
                                {formatRole(profile.role)}
                            </p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                {profileLoading ? (
                    <div className="text-center py-4">
                        <p className="text-gray-500">Chargement du profil...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2">À propos</h4>
                            <p className="text-gray-700">
                                {profile.bio || "Aucune bio disponible pour le moment."}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Évaluations reçues</h4>
                            {reviewsLoading ? (
                                <p className="text-sm text-gray-500">Chargement des évaluations...</p>
                            ) : totalReviews > 0 ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(averageRating)
                                                            ? 'text-yellow-400 fill-current'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            {averageRating.toFixed(1)}/5 ({totalReviews} avis)
                                        </span>
                                    </div>
                                    <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                                        💡 Avis reçus des propriétaires et pet-sitters
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Aucune évaluation disponible</p>
                            )}
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">Informations</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>Rôle: {formatRole(profile.role)}</p>
                                <p>Membre depuis: {new Date().getFullYear()}</p>
                                {profile.location && <p>Localisation: {profile.location}</p>}
                            </div>
                        </div>

                        {reviews && reviews.length > 0 && (
                            <div>
                                <h4 className="font-semibold mb-2">Avis récents</h4>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {reviews.slice(0, 3).map((review, index) => (
                                        <div key={review.id || index} className="bg-gray-50 p-2 rounded text-sm">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-3 h-3 ${i < review.rating
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    par {review.reviewerUsername}
                                                </span>
                                            </div>
                                            {review.comment && (
                                                <p className="text-gray-700">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Fermer
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserProfileDialog;
