import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext.jsx';
import { authService } from '../services/authService.js';

export const useLogin = () => {
    const queryClient = useQueryClient();
    const { login } = useAuth();

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {


            // S'assurer d'utiliser le bon token
            let token;
            if (typeof data.token === 'string') {
                token = data.token;
            } else if (typeof data === 'string') {
                token = data;
            } else {
                console.error('❌ Aucun token string trouvé dans la réponse:', data);
                toast.error('Erreur lors de la connexion : token manquant');
                return;
            }

            console.log('🎯 Token final à envoyer à login():', typeof token, token);
            login(token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success('Connexion réussie !');
        }
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    const { login } = useAuth();

    return useMutation({
        mutationFn: authService.register,
        onSuccess: (data) => {
            // S'assurer d'utiliser le bon token
            let token;
            if (typeof data.token === 'string') {
                token = data.token;
            } else if (typeof data === 'string') {
                token = data;
            } else {
                console.error('❌ Aucun token string trouvé dans la réponse:', data);
                toast.error('Erreur lors de l\'inscription : token manquant');
                return;
            }

            console.log('🎯 Token final à envoyer à login():', typeof token, token);
            login(token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success('🎉 Inscription réussie ! Bienvenue sur PetSwap !');
        },
        onError: (error) => {
            console.error('❌ Erreur lors de l\'inscription:', error);
            toast.error('Erreur lors de l\'inscription');
        }
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const { logout } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            logout();
            queryClient.clear();
            toast.success('Déconnexion réussie');
            // Rediriger vers la page d'accueil
            navigate({ to: '/' });
        }
    });
};
