import { useNavigate } from '@tanstack/react-router';
import { Calendar, CheckCircle, Clock, Euro, MapPin, MessageCircle, Star, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserReviews } from '../../hooks/useReviews';
import { useConfirmedMatches, useMyMatches, usePendingMatches, useRespondToMatch } from '../../hooks/useSwipes';
import BookingForm from '../Bookings/BookingForm';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const MatchesList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { data: allMatches, isLoading: allLoading } = useMyMatches();
    const { data: pendingMatches, isLoading: pendingLoading } = usePendingMatches();
    const { data: confirmedMatches, isLoading: confirmedLoading } = useConfirmedMatches();
    const respondToMatchMutation = useRespondToMatch();

    const [showBookingForm, setShowBookingForm] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [selectedPetSitter, setSelectedPetSitter] = useState(null);

    const isOwner = user?.role === 'OWNER' || user?.role === 'BOTH';
    const isPetSitter = user?.role === 'PET_SITTER' || user?.role === 'BOTH';

    const getMatchStatus = (match) => {
        if (match?.confirmed) return 'CONFIRMED';
        if (!match?.ownerLikedBack) return 'PENDING';
        return 'DECLINED';
    };

    const handleRespond = (matchId, accept) => {
        respondToMatchMutation.mutate({ matchId, accept });
    };

    const handleCreateBooking = (match) => {
        setSelectedMatch(match);
        setShowBookingForm(true);
    };

    const handleCloseBookingForm = () => {
        setShowBookingForm(false);
        setSelectedMatch(null);
    };

    const handleShowPetSitterProfile = (petSitter) => {
        setSelectedPetSitter(petSitter);
        setShowProfileDialog(true);
    };

    const handleCloseProfileDialog = () => {
        setShowProfileDialog(false);
        setSelectedPetSitter(null);
    };

    const handleGoToMessages = (matchId = null) => {
        if (matchId) {
            navigate({ to: '/messages', search: { matchId } });
        } else {
            navigate({ to: '/messages' });
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            CONFIRMED: 'bg-green-100 text-green-800',
            DECLINED: 'bg-red-100 text-red-800'
        };
        const labels = {
            PENDING: 'En attente',
            CONFIRMED: 'Confirmé',
            DECLINED: 'Refusé'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const MatchCard = ({ match, showActions = false }) => {
        const listing = match.listing;
        const petSitter = match.petSitter || {};
        const pet = listing?.pet || {};

        const matchStatus = getMatchStatus(match);

        const ownerInfo = {
            username: listing?.ownerUsername,
            avatarUrl: listing?.ownerAvatarUrl
        };

        const calculateDays = (startDate, endDate) => {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        };

        const totalDays = calculateDays(listing.startDate, listing.endDate);
        const totalPrice = totalDays * listing.pricePerDay;

        return (
            <Card key={match.id} className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold">{listing.title}</h3>
                                {getStatusBadge(matchStatus)}
                            </div>

                            {/* Informations sur l'animal */}
                            <div className="mb-3">
                                <p className="text-lg text-blue-600 font-medium">
                                    {pet.name} ({pet.species})
                                </p>
                                {pet.breed && (
                                    <p className="text-sm text-gray-600">{pet.breed}</p>
                                )}
                            </div>

                            {/* Détails pratiques */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>
                                        {new Date(listing.startDate).toLocaleDateString()} - {new Date(listing.endDate).toLocaleDateString()}
                                        ({totalDays} jours)
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{listing.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Euro className="w-4 h-4 mr-2" />
                                    <span>{listing.pricePerDay}€/jour • Total: {totalPrice}€</span>
                                </div>
                            </div>

                            {/* Informations sur les personnes */}
                            <div className="flex justify-between items-center pt-3 border-t">
                                <div className="flex items-center">
                                    {ownerInfo.avatarUrl ? (
                                        <img
                                            src={ownerInfo.avatarUrl}
                                            alt={ownerInfo.username || 'Propriétaire'}
                                            className="w-8 h-8 rounded-full object-cover mr-2"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-xs">
                                            {ownerInfo.username?.[0]?.toUpperCase() || 'P'}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">
                                        Propriétaire: {ownerInfo.username || 'Non renseigné'}
                                    </span>
                                </div>

                                <div
                                    className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                    onClick={() => isOwner && handleShowPetSitterProfile(petSitter)}
                                >
                                    {petSitter?.avatarUrl ? (
                                        <img
                                            src={petSitter.avatarUrl}
                                            alt={petSitter.username || 'Pet-sitter'}
                                            className="w-8 h-8 rounded-full object-cover mr-2"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-xs">
                                            {petSitter?.username?.[0]?.toUpperCase() || 'S'}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium">
                                        Pet-sitter: {petSitter?.username || 'Non renseigné'}
                                    </span>
                                    {isOwner && (
                                        <User className="w-4 h-4 ml-1 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {pet.photoUrl && (
                            <img
                                src={pet.photoUrl}
                                alt={pet.name}
                                className="w-20 h-20 rounded-lg object-cover ml-4"
                            />
                        )}
                    </div>

                    {showActions && matchStatus === 'PENDING' && (
                        <div className="flex gap-2 pt-4 border-t">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRespond(match.id, false)}
                                disabled={respondToMatchMutation.isPending}
                            >
                                Refuser
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => handleRespond(match.id, true)}
                                disabled={respondToMatchMutation.isPending}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Accepter
                            </Button>
                        </div>
                    )}

                    {/* Actions pour matches confirmés */}
                    {matchStatus === 'CONFIRMED' && (
                        <div className="flex gap-2 pt-4 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGoToMessages(match.id)}
                                className="flex-1"
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Messages
                            </Button>
                            {isOwner && (
                                <Button
                                    size="sm"
                                    onClick={() => handleCreateBooking(match)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Demander une garde
                                </Button>
                            )}
                            {isPetSitter && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleShowPetSitterProfile(petSitter)}
                                    className="flex-1"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Voir mon profil
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    const PetSitterProfileDialog = ({ petSitter, isOpen, onClose }) => {
        const { data: reviews, isLoading: reviewsLoading } = useUserReviews(petSitter?.id);

        if (!petSitter) return null;

        // Calcul des ratings basé sur les vraies données
        const averageRating = reviews && reviews.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
            : 0;
        const totalReviews = reviews?.length || 0;

        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            {petSitter.avatarUrl ? (
                                <img
                                    src={petSitter.avatarUrl}
                                    alt={petSitter.username}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="w-6 h-6 text-blue-600" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-semibold">{petSitter.username}</h3>
                                <p className="text-sm text-gray-600">Pet-sitter</p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Bio */}
                        <div>
                            <h4 className="font-semibold mb-2">À propos</h4>
                            <p className="text-gray-700">
                                {petSitter.bio || "Aucune bio disponible pour le moment."}
                            </p>
                        </div>

                        {/* Ratings */}
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
                                            {averageRating.toFixed(1)}/5 ({totalReviews} avis reçus)
                                        </span>
                                    </div>
                                    <div className="text-xs text-blue-600 bg-blue-50 p-1 rounded">
                                        💡 Avis de propriétaires et autres pet-sitters
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Aucune évaluation disponible</p>
                            )}
                        </div>

                        {/* Informations supplémentaires */}
                        <div>
                            <h4 className="font-semibold mb-2">Informations</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                                <p>Rôle: {petSitter.role === 'PET_SITTER' ? 'Pet-sitter' : petSitter.role}</p>
                                <p>Membre depuis: {new Date().getFullYear()}</p>
                            </div>
                        </div>

                        {/* Quelques avis récents */}
                        {reviews && reviews.length > 0 && (
                            <div>
                                <h4 className="font-semibold mb-2">Avis récents</h4>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {reviews.slice(0, 3).map((review, index) => (
                                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                                            <div className="flex items-center gap-1 mb-1">
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
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Fermer
                        </Button>
                        <Button onClick={handleGoToMessages} className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    if (showBookingForm && selectedMatch) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <BookingForm
                    match={selectedMatch}
                    onClose={handleCloseBookingForm}
                />
            </div>
        );
    }

    if (!isPetSitter && !isOwner) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600">
                            Vous devez être propriétaire ou pet-sitter pour voir les matches.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Mes Matches</h1>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Tous ({allMatches?.length || 0})
                    </TabsTrigger>
                    {isOwner && (
                        <TabsTrigger value="pending" className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            En attente ({pendingMatches?.length || 0})
                        </TabsTrigger>
                    )}
                    <TabsTrigger value="confirmed" className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Confirmés ({confirmedMatches?.length || 0})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    {allLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <p>Chargement des matches...</p>
                            </CardContent>
                        </Card>
                    ) : !allMatches || allMatches.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="text-gray-600">Aucun match pour le moment.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {allMatches.map((match) => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    showActions={isOwner && getMatchStatus(match) === 'PENDING'}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {isOwner && (
                    <TabsContent value="pending" className="mt-6">
                        {pendingLoading ? (
                            <Card>
                                <CardContent className="p-6">
                                    <p>Chargement des matches en attente...</p>
                                </CardContent>
                            </Card>
                        ) : !pendingMatches || pendingMatches.length === 0 ? (
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <p className="text-gray-600">Aucun match en attente.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {pendingMatches.map((match) => (
                                    <MatchCard key={match.id} match={match} showActions={true} />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                )}

                <TabsContent value="confirmed" className="mt-6">
                    {confirmedLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <p>Chargement des matches confirmés...</p>
                            </CardContent>
                        </Card>
                    ) : !confirmedMatches || confirmedMatches.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <p className="text-gray-600">Aucun match confirmé.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {confirmedMatches.map((match) => (
                                <MatchCard key={match.id} match={match} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Dialog pour afficher le profil du pet-sitter */}
            <PetSitterProfileDialog
                petSitter={selectedPetSitter}
                isOpen={showProfileDialog}
                onClose={handleCloseProfileDialog}
            />
        </div>
    );
};

export default MatchesList;
