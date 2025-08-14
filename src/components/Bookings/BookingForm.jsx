import { Calendar, Euro, MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateBooking } from '../../hooks/useBookings';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const BookingForm = ({ match, onClose, isRebooking = false }) => {
    const createBookingMutation = useCreateBooking();
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        specialRequests: ''
    });

    const listing = match?.listing;
    const pet = listing?.pet;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculatePrice = () => {
        if (!formData.startDate || !formData.endDate || !listing?.pricePerDay) {
            return { days: 0, total: 0 };
        }

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const diffTime = Math.abs(end - start);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const total = days * listing.pricePerDay;

        return { days, total };
    };

    const { days, total } = calculatePrice();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.startDate || !formData.endDate) {
            toast.error('Les dates de début et fin sont requises');
            return;
        }

        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            toast.error('La date de fin doit être après la date de début');
            return;
        }

        if (new Date(formData.startDate) < new Date()) {
            toast.error('La date de début ne peut pas être dans le passé');
            return;
        }

        const bookingData = {
            matchId: match.isRebooking ? match.id.replace('rebook-', '') : match.id, // Utiliser l'ID original pour les re-bookings
            startDate: formData.startDate,
            endDate: formData.endDate,
            specialRequests: formData.specialRequests.trim() || null,
            isRebooking: isRebooking
        };

        createBookingMutation.mutate(bookingData, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    if (!match || !listing) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6 text-center">
                    <p className="text-red-600">Erreur : informations du match manquantes</p>
                    <Button onClick={onClose} className="mt-4">Fermer</Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {isRebooking ? 'Nouvelle réservation' : 'Demander une garde'}
                </CardTitle>
                <div className="text-sm text-gray-600">
                    {isRebooking ? 'Planifier une nouvelle garde de' : 'Demande de garde pour'} {pet?.name} par {match.petSitter?.username}
                    {isRebooking && (
                        <div className="mt-1 p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
                            ✨ Vous avez déjà travaillé ensemble ! Cette demande sera prioritaire.
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {/* Résumé de l'annonce */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-2">{listing.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{listing.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Euro className="w-4 h-4" />
                            <span>{listing.pricePerDay}€/jour</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">Date de début *</Label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="endDate">Date de fin *</Label>
                            <Input
                                id="endDate"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                min={formData.startDate || new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                    </div>

                    {/* Calcul du prix */}
                    {days > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-blue-800 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">Récapitulatif</span>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p>{days} jour{days > 1 ? 's' : ''} × {listing.pricePerDay}€</p>
                                <p className="font-semibold text-lg">Total: {total}€</p>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="specialRequests">Instructions pour mon animal (optionnel)</Label>
                        <Textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            placeholder="Habitudes de mon animal, médicaments, instructions spéciales, allergies, préférences alimentaires..."
                            rows={4}
                        />
                        <p className="text-xs text-gray-500">
                            Ces informations aideront le pet-sitter à mieux s'occuper de votre animal
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
                            disabled={createBookingMutation.isPending || days <= 0}
                            className="flex-1"
                        >
                            {createBookingMutation.isPending ? 'Envoi...' : `Envoyer la demande (${total}€)`}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default BookingForm;
