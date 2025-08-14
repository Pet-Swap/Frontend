import { useQuery } from '@tanstack/react-query';
import httpClient from '../utils/httpClient.js';

// Hook pour récupérer le profil de l'utilisateur connecté
// Vous devrez ajouter cet endpoint à votre backend : GET /api/auth/me
export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            return await httpClient.get('api/auth/me').json();
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false, // Ne pas retry si l'utilisateur n'est pas connecté
    });
};

export default useCurrentUser;
