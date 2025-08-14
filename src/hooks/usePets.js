import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { petService } from '../services/petService.js';

// Hook pour récupérer mes pets
export const useMyPets = () => {
    return useQuery({
        queryKey: ['pets', 'my'],
        queryFn: petService.getMyPets,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour créer un pet
export const useCreatePet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: petService.createPet,
        onSuccess: () => {
            toast.success('Animal ajouté avec succès !');
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la création:', error);
            toast.error('Erreur lors de l\'ajout de l\'animal');
        }
    });
};

// Hook pour mettre à jour un pet
export const useUpdatePet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, petData }) => petService.updatePet(id, petData),
        onSuccess: (data, variables) => {
            toast.success('Animal mis à jour avec succès !');
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            toast.error('Erreur lors de la mise à jour de l\'animal');
        }
    });
};

// Hook pour supprimer un pet
export const useDeletePet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: petService.deletePet,
        onSuccess: () => {
            toast.success('Animal supprimé avec succès !');
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la suppression:', error);
            toast.error('Erreur lors de la suppression de l\'animal');
        }
    });
};
