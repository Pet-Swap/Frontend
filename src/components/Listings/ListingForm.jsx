import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCreateListing, useUpdateListing } from '../../hooks/useListings';
import { useMyPets } from '../../hooks/usePets';
import { toast } from 'sonner';

const ListingForm = ({ listing, onClose }) => {
    const createListingMutation = useCreateListing();
    const updateListingMutation = useUpdateListing();
    const { data: pets, isLoading: petsLoading } = useMyPets();
    const isEditing = !!listing;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        petId: '',
        startDate: '',
        endDate: '',
        pricePerDay: '',
        location: ''
    });

    // Charger les données si on édite
    useEffect(() => {
        if (listing) {
            setFormData({
                title: listing.title || '',
                description: listing.description || '',
                petId: listing.petId || '',
                startDate: listing.startDate ? listing.startDate.split('T')[0] : '',
                endDate: listing.endDate ? listing.endDate.split('T')[0] : '',
                pricePerDay: listing.pricePerDay || '',
                location: listing.location || ''
            });
        }
    }, [listing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            toast.error('Le titre est requis');
            return;
        }

        if (!formData.petId) {
            toast.error('Veuillez sélectionner un animal');
            return;
        }

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

        if (!formData.pricePerDay || formData.pricePerDay <= 0) {
            toast.error('Le prix par jour doit être supérieur à 0');
            return;
        }

        const listingData = {
            ...formData,
            pricePerDay: parseFloat(formData.pricePerDay)
        };

        const mutation = isEditing ? updateListingMutation : createListingMutation;
        const mutationData = isEditing 
            ? { id: listing.id, listingData } 
            : listingData;

        mutation.mutate(mutationData, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    if (petsLoading) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                    <p>Chargement des animaux...</p>
                </CardContent>
            </Card>
        );
    }

    if (!pets || pets.length === 0) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6 text-center">
                    <p className="text-gray-600 mb-4">
                        Vous devez d'abord ajouter des animaux avant de créer une annonce.
                    </p>
                    <Button onClick={onClose}>
                        Retour
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {isEditing ? 'Modifier l\'annonce' : 'Créer une annonce'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Titre de l'annonce *</Label>
                        <Input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Garde de mon chien pendant les vacances"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Décrivez ce que vous recherchez chez un pet-sitter..."
                            rows={4}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="petId">Animal *</Label>
                        <select
                            id="petId"
                            name="petId"
                            value={formData.petId}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        >
                            <option value="">Sélectionner un animal</option>
                            {pets.map(pet => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.name} ({pet.species})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="grid gap-2">
                        <Label htmlFor="pricePerDay">Prix par jour (€) *</Label>
                        <Input
                            id="pricePerDay"
                            name="pricePerDay"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.pricePerDay}
                            onChange={handleInputChange}
                            placeholder="25.00"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Localisation *</Label>
                        <Input
                            id="location"
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Paris, Lyon, Marseille..."
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            type="submit" 
                            disabled={createListingMutation.isPending || updateListingMutation.isPending}
                            className="flex-1"
                        >
                            {(createListingMutation.isPending || updateListingMutation.isPending)
                                ? 'Sauvegarde...'
                                : (isEditing ? 'Mettre à jour' : 'Créer l\'annonce')
                            }
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ListingForm;
