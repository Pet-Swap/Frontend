import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '../services/statisticsService';

export const useStatistics = () => {
    return useQuery({
        queryKey: ['statistics'],
        queryFn: statisticsService.getStatistics,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false
    });
};
