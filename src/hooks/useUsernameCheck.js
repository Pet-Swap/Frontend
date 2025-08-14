import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useUsernameCheck = () => {
    return useMutation({
        mutationFn: (username) => authService.checkUsernameExists(username),
        onError: (error) => {
            console.error('Erreur lors de la vérification du nom d\'utilisateur:', error);
        }
    });
};
