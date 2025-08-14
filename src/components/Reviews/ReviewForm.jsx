import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';
import { useCreateReview } from '../../hooks/useReviews';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import StarRating from './StarRating';

const ReviewForm = ({ booking, onClose }) => {
    const { user } = useAuth();
    const createReviewMutation = useCreateReview();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const listing = booking?.match?.listing;
    const pet = listing?.pet;
    const petSitter = booking?.match?.petSitter;
    const owner = { username: listing?.ownerUsername, avatarUrl: listing?.ownerAvatarUrl };

    // Déterminer qui on évalue
    const isOwner = user?.id === listing?.ownerId;
    const reviewedUser = isOwner ? petSitter : owner;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error('Veuillez sélectionner une note');
            return;
        }

        const reviewData = {
            bookingId: booking.id,
            rating,
            comment: comment.trim() || null
        };

        createReviewMutation.mutate(reviewData, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    if (!booking || !reviewedUser) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6 text-center">
                    <p className="text-red-600">Erreur : informations de réservation manquantes</p>
                    <Button onClick={onClose} className="mt-4">Fermer</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <CardTitle>
                            {isOwner ? 'Évaluer le pet-sitter' : 'Évaluer le propriétaire'}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                            Votre avis sur {reviewedUser.username} pour la garde de {pet?.name}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                            💡 {isOwner ? 'Le pet-sitter pourra également vous évaluer' : 'Le propriétaire pourra également vous évaluer'}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Résumé de la réservation */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-2">{listing?.title}</h3>
                    <div className="flex items-center gap-3">
                        {reviewedUser.avatarUrl ? (
                            <img
                                src={reviewedUser.avatarUrl}
                                alt={reviewedUser.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                {reviewedUser.username?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                        <div>
                            <p className="font-medium">{reviewedUser.username}</p>
                            <p className="text-sm text-gray-600">
                                {isOwner ? 'Pet-sitter' : 'Propriétaire'}
                            </p>
                        </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                        <p>
                            Garde du {new Date(booking.startDate).toLocaleDateString('fr-FR')}
                            {' '}au {new Date(booking.endDate).toLocaleDateString('fr-FR')}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Note *</Label>
                        <div className="flex items-center gap-4">
                            <StarRating
                                rating={rating}
                                onRatingChange={setRating}
                                size="w-8 h-8"
                            />
                            <span className="text-sm text-gray-600">
                                {rating === 0 ? 'Sélectionnez une note' :
                                    rating === 1 ? 'Très insatisfait' :
                                        rating === 2 ? 'Insatisfait' :
                                            rating === 3 ? 'Correct' :
                                                rating === 4 ? 'Satisfait' : 'Très satisfait'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="comment">Commentaire (optionnel)</Label>
                        <Textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={`Partagez votre expérience avec ${reviewedUser.username}...`}
                            rows={4}
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500">
                            {comment.length}/500 caractères
                        </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Nouveau système d'avis :</strong> Chaque participant peut maintenant laisser un avis.
                            Votre évaluation sera publique et aidera les autres utilisateurs. 
                            Soyez constructif et respectueux.
                        </p>
                        <p className="text-xs text-blue-700 mt-2">
                            ✅ {isOwner ? 'Vous évaluez le pet-sitter' : 'Vous évaluez le propriétaire'}<br/>
                            ⏳ {isOwner ? 'Le pet-sitter peut aussi vous évaluer' : 'Le propriétaire peut aussi vous évaluer'}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={createReviewMutation.isPending || rating === 0}
                            className="flex-1"
                        >
                            {createReviewMutation.isPending ? 'Publication...' : 'Publier l\'avis'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ReviewForm;
