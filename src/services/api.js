import httpClient from '../utils/httpClient.js';

// Service d'authentification
export const authService = {
    login: async (credentials) => {
        return await httpClient.post('api/auth/login', { json: credentials }).json();
    },

    register: async (userData) => {
        return await httpClient.post('api/auth/register', { json: userData }).json();
    },

    logout: async () => {
        return await httpClient.post('api/auth/logout').json();
    }
};

// Service des profils
export const profileService = {
    getProfile: async (id) => {
        return await httpClient.get(`api/profiles/${id}`).json();
    },

    getAllProfiles: async () => {
        return await httpClient.get('api/profiles').json();
    },

    updateProfile: async (id, profileData) => {
        return await httpClient.put(`api/profiles/${id}`, { json: profileData }).json();
    },

    createProfile: async (profileData) => {
        return await httpClient.post('api/profiles', { json: profileData }).json();
    }
};

// Service utilisateur
export const userService = {
    getCurrentUser: async () => {
        return await httpClient.get('api/user').json();
    }
};
