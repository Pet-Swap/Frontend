import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useCreatePet, useUpdatePet } from '../../hooks/usePets';
import { PetSpecies } from '../../types/index';
import { toast } from 'sonner';

const PetForm = ({ pet, onClose }) => {
    const createPetMutation = useCreatePet();
    const updatePetMutation = useUpdatePet();
    const isEditing = !!pet;

    const [formData, setFormData] = useState({
        name: '',
        species: 'DOG',
        breed: '',
        age: '',
        photoUrl: '',
        specialNotes: ''
    });

    // Charger les données si on édite
    useEffect(() => {
        if (pet) {
            setFormData({
                name: pet.name || '',
                species: pet.species || 'DOG',
                breed: pet.breed || '',
                age: pet.age || '',
                photoUrl: pet.photoUrl || '',
                specialNotes: pet.specialNotes || ''
            });
        }
    }, [pet]);

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
        if (!formData.name.trim()) {
            toast.error('Le nom de l\'animal est requis');
            return;
        }

        if (!formData.age || formData.age < 0) {
            toast.error('L\'âge doit être un nombre positif');
            return;
        }

        const petData = {
            ...formData,
            age: parseInt(formData.age)
        };

        const mutation = isEditing ? updatePetMutation : createPetMutation;
        const mutationData = isEditing 
            ? { id: pet.id, petData } 
            : petData;

        mutation.mutate(mutationData, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    const speciesOptions = [
        { value: 'DOG', label: 'Chien' },
        { value: 'CAT', label: 'Chat' },
        { value: 'BIRD', label: 'Oiseau' },
        { value: 'RABBIT', label: 'Lapin' },
        { value: 'FISH', label: 'Poisson' },
        { value: 'OTHER', label: 'Autre' }
    ];

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {isEditing ? 'Modifier l\'animal' : 'Ajouter un animal'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom de l'animal *</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Rex, Minou, etc."
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="species">Espèce *</Label>
                        <select
                            id="species"
                            name="species"
                            value={formData.species}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        >
                            {speciesOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="breed">Race</Label>
                        <Input
                            id="breed"
                            name="breed"
                            type="text"
                            value={formData.breed}
                            onChange={handleInputChange}
                            placeholder="Labrador, Persan, etc."
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="age">Âge (en années) *</Label>
                        <Input
                            id="age"
                            name="age"
                            type="number"
                            min="0"
                            max="30"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="2"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="photoUrl">URL de la photo</Label>
                        <Input
                            id="photoUrl"
                            name="photoUrl"
                            type="url"
                            value={formData.photoUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/photo.jpg"
                        />
                        {formData.photoUrl && (
                            <div className="mt-2">
                                <img
                                    src={formData.photoUrl}
                                    alt="Aperçu"
                                    className="w-32 h-32 rounded-lg object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="specialNotes">Notes spéciales</Label>
                        <Textarea
                            id="specialNotes"
                            name="specialNotes"
                            value={formData.specialNotes}
                            onChange={handleInputChange}
                            placeholder="Allergies, médicaments, comportements particuliers..."
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            type="submit" 
                            disabled={createPetMutation.isPending || updatePetMutation.isPending}
                            className="flex-1"
                        >
                            {(createPetMutation.isPending || updatePetMutation.isPending)
                                ? 'Sauvegarde...'
                                : (isEditing ? 'Mettre à jour' : 'Ajouter')
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

export default PetForm;
