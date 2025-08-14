import httpClient from '../utils/httpClient.js';
import { getUserFromToken } from '../utils/jwt.js';

export const authService = {
    // Login
    login: async (credentials) => {
        return await httpClient.post('api/auth/login', { json: credentials }).json();
    },

    // Check if username exists
    checkUsernameExists: async (username) => {
        console.log('🌐 checkUsernameExists appelé avec:', username);
        try {
            const url = `api/auth/check-username/${encodeURIComponent(username)}`;
            console.log('📞 Requête vers:', url);
            const result = await httpClient.get(url).json();
            console.log('📥 Réponse reçue:', result);
            return result;
        } catch (error) {
            console.log('⚠️ Erreur dans checkUsernameExists:', error);
            // Si l'API retourne 404, l'utilisateur n'existe pas
            if (error.response?.status === 404) {
                console.log('✅ 404 reçu, utilisateur n\'existe pas');
                return { exists: false };
            }
            console.error('❌ Erreur inattendue:', error);
            throw error;
        }
    },

    // Register
    register: async (userData) => {
        return await httpClient.post('api/auth/register', { json: userData }).json();
    },

    // Logout
    logout: async () => {
        return await httpClient.post('api/auth/logout').json();
    },

    // Get current user profile
    getCurrentUser: async () => {
        const token = localStorage.getItem('authToken');
        console.log('🔑 Token récupéré:', token);
        
        if (!token) {
            throw new Error('Aucun token d\'authentification trouvé');
        }
        
        const tokenData = getUserFromToken(token);
        console.log('📋 Données extraites du JWT:', tokenData);
        
        if (!tokenData || !tokenData.username) {
            console.error('❌ Token invalide ou username manquant dans le JWT');
            throw new Error('Token invalide ou username manquant');
        }
        
        // Si on a l'ID dans le token, l'utiliser directement
        if (tokenData.id) {
            console.log('🌐 Requête vers /api/profiles/' + tokenData.id);
            return await httpClient.get(`api/profiles/${tokenData.id}`).json();
        }
        
        // Sinon, récupérer tous les profils et trouver celui avec le bon username
        console.log('🔍 Recherche du profil par username:', tokenData.username);
        const profiles = await httpClient.get('api/profiles').json();
        const userProfile = profiles.find(profile => profile.username === tokenData.username);
        
        if (!userProfile) {
            throw new Error('Profil utilisateur non trouvé');
        }
        
        console.log('✅ Profil trouvé:', userProfile);
        return userProfile;
    }
};
