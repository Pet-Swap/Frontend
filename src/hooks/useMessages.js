import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { messageService } from '../services/messageService.js';

// Hook pour récupérer les conversations
export const useConversations = () => {
    return useQuery({
        queryKey: ['conversations'],
        queryFn: messageService.getConversations,
        staleTime: 1000 * 60 * 1, // 1 minute
    });
};

// Hook pour récupérer les messages d'une conversation
export const useMatchMessages = (matchId) => {
    return useQuery({
        queryKey: ['messages', matchId],
        queryFn: () => messageService.getMatchMessages(matchId),
        enabled: !!matchId,
        staleTime: 1000 * 30, // 30 secondes
    });
};

// Hook pour envoyer un message
export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: messageService.sendMessage,
        onSuccess: (data, variables) => {
            // Invalider les messages de la conversation
            queryClient.invalidateQueries({ queryKey: ['messages', variables.matchId] });
            // Invalider les conversations pour mettre à jour le dernier message
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        },
        onError: (error) => {
            console.error('Erreur lors de l\'envoi du message:', error);
            toast.error('Erreur lors de l\'envoi du message');
        }
    });
};
