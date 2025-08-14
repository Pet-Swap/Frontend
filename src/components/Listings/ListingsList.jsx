import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useMyListings, useDeleteListing } from '../../hooks/useListings';
import { useAuth } from '../../contexts/AuthContext';
import { ListingStatus } from '../../types/index';
import ListingForm from './ListingForm';

const ListingsList = () => {
    const { user } = useAuth();
    const { data: listings, isLoading } = useMyListings();
    const deleteListingMutation = useDeleteListing();
    const [showForm, setShowForm] = useState(false);
    const [editingListing, setEditingListing] = useState(null);

    // Vérifier si l'utilisateur peut créer des annonces
    const canManageListings = user?.role === 'OWNER' || user?.role === 'BOTH';

    if (!canManageListings) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600">
                            Seuls les propriétaires peuvent créer des annonces.
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
                        <p>Chargement des annonces...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleEdit = (listing) => {
        setEditingListing(listing);
        setShowForm(true);
    };

    const handleDelete = async (listingId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
            deleteListingMutation.mutate(listingId);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingListing(null);
    };

    const getStatusBadge = (status) => {
        const styles = {
            ACTIVE: 'bg-green-100 text-green-800',
            MATCHED: 'bg-blue-100 text-blue-800',
            COMPLETED: 'bg-gray-100 text-gray-800'
        };
        const labels = {
            ACTIVE: 'Active',
            MATCHED: 'Matchée',
            COMPLETED: 'Terminée'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
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
                        ← Retour à mes annonces
                    </Button>
                </div>
                <ListingForm listing={editingListing} onClose={handleCloseForm} />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Mes Annonces</h1>
                <Button onClick={() => setShowForm(true)}>
                    + Créer une annonce
                </Button>
            </div>

            {!listings || listings.length === 0 ? (
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600 mb-4">
                            Vous n'avez pas encore créé d'annonces.
                        </p>
                        <Button onClick={() => setShowForm(true)}>
                            Créer votre première annonce
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {listings.map((listing) => (
                        <Card key={listing.id} className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold">{listing.title}</h3>
                                            {getStatusBadge(listing.status)}
                                        </div>
                                        <p className="text-gray-600 mb-3">{listing.description}</p>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium">Animal:</span>
                                                <p>{listing.pet?.name} ({listing.pet?.species})</p>
                                            </div>
                                            <div>
                                                <span className="font-medium">Dates:</span>
                                                <p>{new Date(listing.startDate).toLocaleDateString()} - {new Date(listing.endDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium">Prix/jour:</span>
                                                <p>{listing.pricePerDay}€</p>
                                            </div>
                                            <div>
                                                <span className="font-medium">Lieu:</span>
                                                <p>{listing.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {listing.pet?.photoUrl && (
                                        <img
                                            src={listing.pet.photoUrl}
                                            alt={listing.pet.name}
                                            className="w-20 h-20 rounded-lg object-cover ml-4"
                                        />
                                    )}
                                </div>

                                <div className="flex gap-2 pt-4 border-t">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(listing)}
                                        disabled={listing.status !== 'ACTIVE'}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(listing.id)}
                                        disabled={deleteListingMutation.isPending || listing.status === 'MATCHED'}
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

export default ListingsList;
