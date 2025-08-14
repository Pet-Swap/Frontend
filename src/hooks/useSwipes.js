import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { swipeService } from '../services/swipeService.js';

// Hook pour récupérer les annonces à découvrir
export const useDiscoverListings = () => {
    return useQuery({
        queryKey: ['discover'],
        queryFn: swipeService.getDiscoverListings,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

// Hook pour effectuer un swipe
export const useSwipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: swipeService.swipe,
        onSuccess: (data) => {
            // Si c'est un match, afficher une notification
            if (data.isMatch) {
                toast.success('🎉 Nouveau match !');
            }
            // Invalider les queries pour rafraîchir les données
            queryClient.invalidateQueries({ queryKey: ['discover'] });
            queryClient.invalidateQueries({ queryKey: ['matches'] });
        },
        onError: (error) => {
            console.error('Erreur lors du swipe:', error);
            toast.error('Erreur lors du swipe');
        }
    });
};

// Hook pour récupérer tous les matches
export const useMyMatches = () => {
    return useQuery({
        queryKey: ['matches', 'all'],
        queryFn: swipeService.getMyMatches,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour récupérer les matches confirmés
export const useConfirmedMatches = () => {
    return useQuery({
        queryKey: ['matches', 'confirmed'],
        queryFn: swipeService.getConfirmedMatches,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour récupérer les matches en attente
export const usePendingMatches = () => {
    return useQuery({
        queryKey: ['matches', 'pending'],
        queryFn: swipeService.getPendingMatches,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour répondre à un match
export const useRespondToMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ matchId, accept }) => swipeService.respondToMatch(matchId, { accept }),
        onSuccess: (data, variables) => {
            const message = variables.accept ? 'Match accepté !' : 'Match refusé';
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: ['matches'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la réponse:', error);
            toast.error('Erreur lors de la réponse au match');
        }
    });
};
