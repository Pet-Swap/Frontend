import httpClient from '../utils/httpClient.js';

export const swipeService = {
    // Effectuer un swipe
    swipe: async (swipeData) => {
        return await httpClient.post('api/swipes', { json: swipeData }).json();
    },

    // Récupérer les annonces à découvrir
    getDiscoverListings: async () => {
        return await httpClient.get('api/swipes/discover').json();
    },

    // Récupérer tous mes matches
    getMyMatches: async () => {
        return await httpClient.get('api/swipes/matches').json();
    },

    // Récupérer les matches confirmés
    getConfirmedMatches: async () => {
        return await httpClient.get('api/swipes/matches/confirmed').json();
    },

    // Récupérer les matches en attente
    getPendingMatches: async () => {
        return await httpClient.get('api/swipes/matches/pending').json();
    },

    // Répondre à un match
    respondToMatch: async (matchId, response) => {
        return await httpClient.post(`api/swipes/matches/${matchId}/respond`, { json: response }).json();
    }
};
