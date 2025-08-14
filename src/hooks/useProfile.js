import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profileService.js';

export const useProfile = (id) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => profileService.getProfileById(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useProfiles = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: profileService.getAllProfiles,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, profileData }) => profileService.updateProfile(id, profileData),
        onSuccess: (data, variables) => {
            // Mettre à jour le cache
            queryClient.setQueryData(['profile', variables.id], data);
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        }
    });
};

export const useCreateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileService.createProfile,
        onSuccess: (data) => {
            // Mettre à jour la liste des profils
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
            return data;
        }
    });
};
