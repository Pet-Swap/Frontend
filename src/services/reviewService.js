import httpClient from '../utils/httpClient.js';

export const reviewService = {
    // Créer un avis
    createReview: async (reviewData) => {
        return await httpClient.post('api/reviews', { json: reviewData }).json();
    },

    // Récupérer les avis d'une réservation (maintenant retourne une liste)
    getBookingReviews: async (bookingId) => {
        return await httpClient.get(`api/reviews/booking/${bookingId}`).json();
    },

    // Récupérer le statut des reviews d'une réservation
    getBookingReviewStatus: async (bookingId) => {
        return await httpClient.get(`api/reviews/booking/${bookingId}/status`).json();
    },

    // Vérifier si on peut encore reviewer une réservation
    getCanReviewBooking: async (bookingId) => {
        return await httpClient.get(`api/reviews/booking/${bookingId}/can-review`).json();
    },

    // Récupérer les avis reçus par un utilisateur
    getUserReviews: async (userId) => {
        return await httpClient.get(`api/reviews/user/${userId}`).json();
    },

    // Récupérer mes avis donnés
    getMyReviews: async () => {
        return await httpClient.get('api/reviews/my-reviews').json();
    }
};
