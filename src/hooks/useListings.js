import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { listingService } from '../services/listingService.js';

// Hook pour récupérer mes annonces
export const useMyListings = () => {
    return useQuery({
        queryKey: ['listings', 'my'],
        queryFn: listingService.getMyListings,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour récupérer les annonces à parcourir
export const useBrowseListings = () => {
    return useQuery({
        queryKey: ['listings', 'browse'],
        queryFn: listingService.getBrowseListings,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

// Hook pour créer une annonce
export const useCreateListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: listingService.createListing,
        onSuccess: () => {
            toast.success('Annonce créée avec succès !');
            queryClient.invalidateQueries({ queryKey: ['listings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la création:', error);
            toast.error('Erreur lors de la création de l\'annonce');
        }
    });
};

// Hook pour mettre à jour une annonce
export const useUpdateListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, listingData }) => listingService.updateListing(id, listingData),
        onSuccess: (data, variables) => {
            toast.success('Annonce mise à jour avec succès !');
            queryClient.invalidateQueries({ queryKey: ['listings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            toast.error('Erreur lors de la mise à jour de l\'annonce');
        }
    });
};

// Hook pour supprimer une annonce
export const useDeleteListing = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: listingService.deleteListing,
        onSuccess: () => {
            toast.success('Annonce supprimée avec succès !');
            queryClient.invalidateQueries({ queryKey: ['listings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la suppression:', error);
            toast.error('Erreur lors de la suppression de l\'annonce');
        }
    });
};
