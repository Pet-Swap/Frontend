import httpClient from '../utils/httpClient.js';

export const profileService = {
    // Récupérer un profil par ID
    getProfileById: async (id) => {
        return await httpClient.get(`api/profiles/${id}`).json();
    },

    // Récupérer tous les profils
    getAllProfiles: async () => {
        return await httpClient.get('api/profiles').json();
    },

    // Créer un nouveau profil (si nécessaire)
    createProfile: async (profileData) => {
        return await httpClient.post('api/profiles', { json: profileData }).json();
    },

    // Mettre à jour un profil (si nécessaire)
    updateProfile: async (id, profileData) => {
        return await httpClient.put(`api/profiles/${id}`, { json: profileData }).json();
    },

    // Supprimer un profil (si nécessaire)
    deleteProfile: async (id) => {
        return await httpClient.delete(`api/profiles/${id}`).json();
    }
};
