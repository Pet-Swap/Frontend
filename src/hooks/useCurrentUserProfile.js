import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext.jsx';

// Hook pour récupérer le profil de l'utilisateur connecté
// Utilise les données du contexte comme fallback
export const useCurrentUserProfile = () => {
    const { user, isAuthenticated } = useAuth();
    
    return useQuery({
        queryKey: ['current-user-profile'],
        queryFn: async () => {
            // Pour l'instant, on retourne les données du contexte
            // Plus tard, vous pourrez faire un appel API pour récupérer le profil complet
            return user;
        },
        enabled: isAuthenticated && !!user,
        staleTime: 1000 * 60 * 5, // 5 minutes
        initialData: user
    });
};

export default useCurrentUserProfile;
