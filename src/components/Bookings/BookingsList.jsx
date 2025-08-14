import { useSearch } from '@tanstack/react-router';
import { Calendar, CheckCircle, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
    useAllBookings,
    useCompletedBookings,
    useConfirmedBookings,
    usePendingBookings
} from '../../hooks/useBookings';
import ReviewForm from '../Reviews/ReviewForm';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import BookingCard from './BookingCard';
import BookingFlowHelp from './BookingFlowHelp';
import BookingForm from './BookingForm';

const BookingsList = () => {
    const { user } = useAuth();
    const search = useSearch({ strict: false });
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showRebookForm, setShowRebookForm] = useState(false);
    const [rebookingData, setRebookingData] = useState(null);

    const defaultTab = search?.tab || 'all';

    const { data: allBookings, isLoading: allLoading } = useAllBookings();
    const { data: pendingBookings, isLoading: pendingLoading } = usePendingBookings();
    const { data: confirmedBookings, isLoading: confirmedLoading } = useConfirmedBookings();
    const { data: completedBookings, isLoading: completedLoading } = useCompletedBookings();

    const handleCreateReview = (booking) => {
        setSelectedBooking(booking);
        setShowReviewForm(true);
    };

    const handleCloseReviewForm = () => {
        setShowReviewForm(false);
        setSelectedBooking(null);
    };

    const handleRebook = (booking) => {
        // Créer un "match virtuel" basé sur la réservation précédente
        const virtualMatch = {
            id: `rebook-${booking.id}`, // ID unique pour le re-booking
            listing: booking.match?.listing,
            petSitter: booking.match?.petSitter,
            confirmed: true, // On considère que c'est déjà "confirmé" puisqu'ils se connaissent
            isRebooking: true // Flag pour indiquer que c'est un re-booking
        };

        setRebookingData(virtualMatch);
        setShowRebookForm(true);
    };

    const handleCloseRebookForm = () => {
        setShowRebookForm(false);
        setRebookingData(null);
    };

    if (!user) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600">
                            Vous devez être connecté pour voir les réservations.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (showReviewForm && selectedBooking) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <ReviewForm
                    booking={selectedBooking}
                    onClose={handleCloseReviewForm}
                />
            </div>
        );
    }

    if (showRebookForm && rebookingData) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <BookingForm
                    match={rebookingData}
                    onClose={handleCloseRebookForm}
                    isRebooking={true}
                />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Mes Demandes de Garde</h1>
                <BookingFlowHelp />
            </div>

            <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Toutes ({allBookings?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        En attente ({pendingBookings?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="confirmed" className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Acceptées ({confirmedBookings?.length || 0})
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Terminées ({completedBookings?.length || 0})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    {allLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <p>Chargement des réservations...</p>
                            </CardContent>
                        </Card>
                    ) : !allBookings || allBookings.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 mb-2">Aucune demande de garde</p>
                                <p className="text-sm text-gray-500">
                                    Vos demandes de garde apparaîtront ici une fois envoyées
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {allBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onCreateReview={handleCreateReview}
                                    onRebook={handleRebook}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="pending" className="mt-6">
                    {pendingLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <p>Chargement des réservations en attente...</p>
                            </CardContent>
                        </Card>
                    ) : !pendingBookings || pendingBookings.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 mb-2">Aucune demande en attente</p>
                                <p className="text-sm text-gray-500">
                                    Les demandes en attente de réponse du pet-sitter apparaîtront ici
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {pendingBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onCreateReview={handleCreateReview}
                                    onRebook={handleRebook}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="confirmed" className="mt-6">
                    {confirmedLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <p>Chargement des réservations confirmées...</p>
                            </CardContent>
                        </Card>
                    ) : !confirmedBookings || confirmedBookings.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 mb-2">Aucune réservation confirmée</p>
                                <p className="text-sm text-gray-500">
                                    Les réservations confirmées apparaîtront ici
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {confirmedBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onCreateReview={handleCreateReview}
                                    onRebook={handleRebook}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                    {completedLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <p>Chargement des réservations terminées...</p>
                            </CardContent>
                        </Card>
                    ) : !completedBookings || completedBookings.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Star className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 mb-2">Aucune réservation terminée</p>
                                <p className="text-sm text-gray-500">
                                    Les réservations terminées apparaîtront ici
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {completedBookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onCreateReview={handleCreateReview}
                                    onRebook={handleRebook}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default BookingsList;
