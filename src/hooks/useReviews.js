import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { reviewService } from '../services/reviewService.js';

// Hook pour récupérer les avis d'un utilisateur
export const useUserReviews = (userId) => {
    return useQuery({
        queryKey: ['reviews', 'user', userId],
        queryFn: () => reviewService.getUserReviews(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

// Hook pour récupérer les avis d'une réservation (maintenant une liste)
export const useBookingReviews = (bookingId) => {
    return useQuery({
        queryKey: ['reviews', 'booking', bookingId],
        queryFn: () => reviewService.getBookingReviews(bookingId),
        enabled: !!bookingId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour récupérer le statut des reviews d'une réservation
export const useBookingReviewStatus = (bookingId) => {
    return useQuery({
        queryKey: ['reviews', 'booking', bookingId, 'status'],
        queryFn: () => reviewService.getBookingReviewStatus(bookingId),
        enabled: !!bookingId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour vérifier si on peut reviewer une réservation
export const useCanReviewBooking = (bookingId) => {
    return useQuery({
        queryKey: ['reviews', 'booking', bookingId, 'can-review'],
        queryFn: () => reviewService.getCanReviewBooking(bookingId),
        enabled: !!bookingId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour récupérer mes avis donnés
export const useMyReviews = () => {
    return useQuery({
        queryKey: ['reviews', 'my'],
        queryFn: reviewService.getMyReviews,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

// Hook pour créer un avis
export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reviewService.createReview,
        onSuccess: (data, variables) => {
            toast.success('Avis publié avec succès !');
            // Invalider les avis de l'utilisateur et de la réservation
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la publication:', error);
            toast.error('Erreur lors de la publication de l\'avis');
        }
    });
};

// Maintien de la compatibilité avec l'ancien hook (deprecated)
export const useBookingReview = (bookingId) => {
    console.warn('useBookingReview is deprecated, use useBookingReviews instead');
    return useBookingReviews(bookingId);
};
