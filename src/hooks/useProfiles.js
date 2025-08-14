import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { profileService } from '../services/profileService.js';

// Hook pour récupérer un profil par ID
export const useProfile = (id) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => profileService.getProfileById(id),
        enabled: !!id, // Ne s'exécute que si id existe
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour récupérer tous les profils
export const useProfiles = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: profileService.getAllProfiles,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook pour créer un profil
export const useCreateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileService.createProfile,
        onSuccess: () => {
            toast.success('Profil créé avec succès !');
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        }
    });
};

// Hook pour mettre à jour un profil
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, profileData }) => profileService.updateProfile(id, profileData),
        onSuccess: (data, variables) => {
            toast.success('Profil mis à jour avec succès !');
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
            queryClient.invalidateQueries({ queryKey: ['profile', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
};

// Hook pour supprimer un profil
export const useDeleteProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileService.deleteProfile,
        onSuccess: (data, id) => {
            toast.success('Profil supprimé avec succès !');
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
            queryClient.removeQueries({ queryKey: ['profile', id] });
        }
    });
};
