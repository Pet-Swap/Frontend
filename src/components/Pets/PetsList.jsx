import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useMyPets, useDeletePet } from '../../hooks/usePets';
import { useAuth } from '../../contexts/AuthContext';
import { PetSpecies } from '../../types/index';
import PetForm from './PetForm';

const PetsList = () => {
    const { user } = useAuth();
    const { data: pets, isLoading } = useMyPets();
    const deletePetMutation = useDeletePet();
    const [showForm, setShowForm] = useState(false);
    const [editingPet, setEditingPet] = useState(null);

    // Vérifier si l'utilisateur peut gérer des pets
    const canManagePets = user?.role === 'OWNER' || user?.role === 'BOTH';

    if (!canManagePets) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600">
                            Seuls les propriétaires peuvent gérer des animaux.
                            Modifiez votre rôle dans les paramètres de profil.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6">
                        <p>Chargement des animaux...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleEdit = (pet) => {
        setEditingPet(pet);
        setShowForm(true);
    };

    const handleDelete = async (petId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
            deletePetMutation.mutate(petId);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingPet(null);
    };

    if (showForm) {
        return (
            <div className="p-8">
                <div className="max-w-2xl mx-auto mb-4">
                    <Button 
                        variant="outline" 
                        onClick={handleCloseForm}
                        className="mb-4"
                    >
                        ← Retour à mes animaux
                    </Button>
                </div>
                <PetForm pet={editingPet} onClose={handleCloseForm} />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Mes Animaux</h1>
                <Button onClick={() => setShowForm(true)}>
                    + Ajouter un animal
                </Button>
            </div>

            {!pets || pets.length === 0 ? (
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600 mb-4">
                            Vous n'avez pas encore ajouté d'animaux.
                        </p>
                        <Button onClick={() => setShowForm(true)}>
                            Ajouter votre premier animal
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map((pet) => (
                        <Card key={pet.id} className="overflow-hidden">
                            {pet.photoUrl && (
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={pet.photoUrl}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start">
                                    <span>{pet.name}</span>
                                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {pet.species}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><strong>Race:</strong> {pet.breed || 'Non spécifiée'}</p>
                                    <p><strong>Âge:</strong> {pet.age} an{pet.age > 1 ? 's' : ''}</p>
                                    {pet.specialNotes && (
                                        <p><strong>Notes:</strong> {pet.specialNotes}</p>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(pet)}
                                        className="flex-1"
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(pet.id)}
                                        disabled={deletePetMutation.isPending}
                                        className="flex-1"
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetsList;
