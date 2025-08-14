import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/api.js';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: userService.getCurrentUser,
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 60 * 20, // refetch every 20 minutes to keep session
        refetchIntervalInBackground: true,
        retry: false, // Ne pas retry automatiquement sur les erreurs d'auth
    });
};

export default useUser;
