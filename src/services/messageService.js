import httpClient from '../utils/httpClient.js';

export const messageService = {
    // Envoyer un message
    sendMessage: async (messageData) => {
        return await httpClient.post('api/messages', { json: messageData }).json();
    },

    // Récupérer les messages d'une conversation
    getMatchMessages: async (matchId) => {
        return await httpClient.get(`api/messages/match/${matchId}`).json();
    },

    // Récupérer toutes les conversations
    getConversations: async () => {
        return await httpClient.get('api/messages/conversations').json();
    }
};
