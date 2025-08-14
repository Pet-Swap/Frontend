import { Calendar, Euro, Heart, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useDiscoverListings, useSwipe } from '../../hooks/useSwipes';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const SwipeInterface = () => {
    const { user } = useAuth();
    const { data: listings, isLoading, refetch } = useDiscoverListings();
    const swipeMutation = useSwipe();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Réinitialiser l'index quand de nouvelles annonces arrivent
    useEffect(() => {
        if (listings && listings.length > 0 && currentIndex >= listings.length) {
            setCurrentIndex(0);
        }
    }, [listings, currentIndex]);

    // Vérifier si l'utilisateur peut swiper
    const canSwipe = user?.role === 'PET_SITTER' || user?.role === 'BOTH';

    if (!canSwipe) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600">
                            Seuls les pet-sitters peuvent découvrir des annonces.
                            Modifiez votre rôle dans les paramètres de profil.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p>Découverte d'annonces...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!listings || listings.length === 0) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <h3 className="text-lg font-semibold mb-2">Plus d'annonces disponibles</h3>
                        <p className="text-gray-600 mb-4">
                            Revenez plus tard pour découvrir de nouvelles annonces !
                        </p>
                        <Button onClick={() => refetch()}>
                            Actualiser
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentListing = listings[currentIndex];

    // Si on a dépassé le nombre d'annonces disponibles, afficher le message de fin
    if (currentIndex >= listings.length) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <h3 className="text-lg font-semibold mb-2">Plus d'annonces disponibles</h3>
                        <p className="text-gray-600 mb-4">
                            Revenez plus tard pour découvrir de nouvelles annonces !
                        </p>
                        <Button onClick={() => {
                            refetch();
                            setCurrentIndex(0);
                        }}>
                            Actualiser
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!currentListing) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p>Aucune annonce à afficher</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleSwipe = async (direction) => {
        if (isAnimating) return;

        setIsAnimating(true);

        try {
            await swipeMutation.mutateAsync({
                listingId: currentListing.id,
                direction: direction
            });

            setTimeout(() => {
                // Toujours passer à l'annonce suivante
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setIsAnimating(false);
            }, 300);
        } catch (error) {
            setIsAnimating(false);
        }
    };

    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const totalDays = calculateDays(currentListing.startDate, currentListing.endDate);
    const totalPrice = totalDays * currentListing.pricePerDay;

    return (
        <div className="p-4 max-w-md mx-auto min-h-screen flex flex-col">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Découvrir</h1>
                <p className="text-gray-600">{Math.max(0, listings.length - currentIndex)} annonces restantes</p>
            </div>

            <div className={`flex-1 flex items-center justify-center transition-transform duration-300 ${isAnimating ? 'scale-95 opacity-50' : ''}`}>
                <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg">
                    {/* Photo de l'animal */}
                    {currentListing.pet?.photoUrl ? (
                        <div className="aspect-square overflow-hidden">
                            <img
                                src={currentListing.pet.photoUrl}
                                alt={currentListing.pet.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="aspect-square bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">Pas de photo</p>
                        </div>
                    )}

                    <CardContent className="p-4">
                        {/* Titre et animal */}
                        <div className="mb-3">
                            <h2 className="text-xl font-bold">{currentListing.title}</h2>
                            <p className="text-lg text-blue-600 font-medium">
                                {currentListing.pet?.name} • {currentListing.pet?.species}
                            </p>
                            {currentListing.pet?.breed && (
                                <p className="text-sm text-gray-600">{currentListing.pet.breed}</p>
                            )}
                        </div>

                        {/* Description */}
                        {currentListing.description && (
                            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                {currentListing.description}
                            </p>
                        )}

                        {/* Informations pratiques */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>
                                    {new Date(currentListing.startDate).toLocaleDateString()} - {new Date(currentListing.endDate).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>{currentListing.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Euro className="w-4 h-4 mr-2" />
                                <span>{currentListing.pricePerDay}€/jour • {totalDays} jours • Total: {totalPrice}€</span>
                            </div>
                        </div>

                        {/* Propriétaire */}
                        <div className="flex items-center pt-3 border-t">
                            {currentListing.owner?.avatarUrl ? (
                                <img
                                    src={currentListing.owner.avatarUrl}
                                    alt={currentListing.owner.username}
                                    className="w-8 h-8 rounded-full object-cover mr-3"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3 text-xs">
                                    {currentListing.owner?.username?.[0]?.toUpperCase()}
                                </div>
                            )}
                            <span className="text-sm font-medium">{currentListing.owner?.username}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Boutons de swipe */}
            <div className="flex justify-center gap-8 mt-6 pb-4">
                <Button
                    size="lg"
                    variant="outline"
                    className="w-16 h-16 rounded-full p-0 border-red-300 hover:bg-red-50"
                    onClick={() => handleSwipe('PASS')}
                    disabled={isAnimating || swipeMutation.isPending}
                >
                    <X className="w-6 h-6 text-red-500" />
                </Button>
                <Button
                    size="lg"
                    className="w-16 h-16 rounded-full p-0 bg-pink-500 hover:bg-pink-600"
                    onClick={() => handleSwipe('LIKE')}
                    disabled={isAnimating || swipeMutation.isPending}
                >
                    <Heart className="w-6 h-6 text-white" />
                </Button>
            </div>
        </div>
    );
};

export default SwipeInterface;
