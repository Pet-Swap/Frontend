import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { bookingService } from '../services/bookingService.js';

// Hook pour récupérer toutes les réservations
export const useAllBookings = () => {
    return useQuery({
        queryKey: ['bookings', 'all'],
        queryFn: bookingService.getAllBookings,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour les réservations en attente
export const usePendingBookings = () => {
    return useQuery({
        queryKey: ['bookings', 'pending'],
        queryFn: bookingService.getPendingBookings,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};

// Hook pour les réservations confirmées
export const useConfirmedBookings = () => {
    return useQuery({
        queryKey: ['bookings', 'confirmed'],
        queryFn: bookingService.getConfirmedBookings,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour les réservations terminées
export const useCompletedBookings = () => {
    return useQuery({
        queryKey: ['bookings', 'completed'],
        queryFn: bookingService.getCompletedBookings,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

// Hook pour mes gardes (pet-sitter)
export const useMyPetSittingBookings = () => {
    return useQuery({
        queryKey: ['bookings', 'pet-sitter'],
        queryFn: bookingService.getMyPetSittingBookings,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour mes demandes (propriétaire)
export const useMyOwnerBookings = () => {
    return useQuery({
        queryKey: ['bookings', 'owner'],
        queryFn: bookingService.getMyOwnerBookings,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour récupérer une réservation spécifique
export const useBookingById = (bookingId) => {
    return useQuery({
        queryKey: ['bookings', 'detail', bookingId],
        queryFn: () => bookingService.getBookingById(bookingId),
        enabled: !!bookingId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour créer une réservation
export const useCreateBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookingData) => {
            // Si c'est un re-booking, utiliser l'endpoint spécialisé
            if (bookingData.isRebooking) {
                return bookingService.createRebooking(bookingData);
            }
            return bookingService.createBooking(bookingData);
        },
        onSuccess: (data, variables) => {
            if (variables.isRebooking) {
                toast.success('Nouvelle réservation créée ! Elle a été automatiquement confirmée car vous vous connaissez déjà.');
            } else {
                toast.success('Réservation créée avec succès !');
            }
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la création:', error);
            toast.error('Erreur lors de la création de la réservation');
        }
    });
};

// Hook pour confirmer une réservation
export const useConfirmBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bookingService.confirmBooking,
        onSuccess: () => {
            toast.success('Réservation confirmée !');
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la confirmation:', error);
            toast.error('Erreur lors de la confirmation');
        }
    });
};

// Hook pour terminer une réservation
export const useCompleteBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bookingService.completeBooking,
        onSuccess: (data) => {
            toast.success('Réservation marquée comme terminée ! Vous pouvez maintenant laisser un avis.');
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de la finalisation:', error);
            toast.error('Erreur lors de la finalisation');
        }
    });
};

// Hook pour annuler une réservation
export const useCancelBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bookingService.cancelBooking,
        onSuccess: () => {
            toast.success('Réservation annulée');
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error) => {
            console.error('Erreur lors de l\'annulation:', error);
            toast.error('Erreur lors de l\'annulation');
        }
    });
};

// Hook pour détecter les réservations qui devraient être finalisées
export const useBookingsToComplete = () => {
    return useQuery({
        queryKey: ['bookings', 'to-complete'],
        queryFn: async () => {
            const confirmedBookings = await bookingService.getConfirmedBookings();
            const now = new Date();
            now.setHours(0, 0, 0, 0); // Début de la journée

            return confirmedBookings.filter(booking => {
                const endDate = new Date(booking.endDate);
                endDate.setHours(23, 59, 59, 999); // Fin de la journée
                return endDate < now; // Garde terminée depuis au moins hier
            });
        },
        staleTime: 1000 * 60 * 30, // 30 minutes
        refetchInterval: 1000 * 60 * 60, // Vérifier toutes les heures
    });
};

// Hook pour récupérer les réservations terminées d'un match spécifique
export const useMatchCompletedBookings = (matchId) => {
    return useQuery({
        queryKey: ['bookings', 'match-completed', matchId],
        queryFn: async () => {
            if (!matchId) return [];
            const allBookings = await bookingService.getAllBookings();
            return allBookings.filter(booking =>
                booking.match?.id === matchId && booking.status === 'COMPLETED'
            );
        },
        enabled: !!matchId,
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

// Hook pour récupérer les réservations en cours d'un match spécifique
export const useMatchActiveBookings = (matchId) => {
    return useQuery({
        queryKey: ['bookings', 'match-active', matchId],
        queryFn: async () => {
            if (!matchId) return [];
            const allBookings = await bookingService.getAllBookings();
            return allBookings.filter(booking =>
                booking.match?.id === matchId && 
                (booking.status === 'PENDING' || booking.status === 'CONFIRMED')
            );
        },
        enabled: !!matchId,
        staleTime: 1000 * 60 * 2, // 2 minutes pour les données en temps réel
    });
};

// Hook pour récupérer toutes les réservations d'un match spécifique
export const useMatchBookings = (matchId) => {
    return useQuery({
        queryKey: ['bookings', 'match-all', matchId],
        queryFn: async () => {
            if (!matchId) return [];
            const allBookings = await bookingService.getAllBookings();
            return allBookings.filter(booking => booking.match?.id === matchId);
        },
        enabled: !!matchId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
