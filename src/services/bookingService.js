import httpClient from '../utils/httpClient.js';

export const bookingService = {
    // Créer une réservation
    createBooking: async (bookingData) => {
        return await httpClient.post('api/bookings', { json: bookingData }).json();
    },

    // Créer un re-booking (réservation avec des personnes qui ont déjà travaillé ensemble)
    createRebooking: async (bookingData) => {
        return await httpClient.post('api/bookings/rebook', { json: bookingData }).json();
    },

    // Confirmer une réservation (propriétaire)
    confirmBooking: async (bookingId) => {
        return await httpClient.post(`api/bookings/${bookingId}/confirm`).json();
    },

    // Marquer comme terminée
    completeBooking: async (bookingId) => {
        return await httpClient.post(`api/bookings/${bookingId}/complete`).json();
    },

    // Annuler une réservation
    cancelBooking: async (bookingId) => {
        return await httpClient.post(`api/bookings/${bookingId}/cancel`).json();
    },

    // Récupérer les détails d'une réservation
    getBookingById: async (bookingId) => {
        return await httpClient.get(`api/bookings/${bookingId}`).json();
    },

    // Récupérer toutes mes réservations
    getAllBookings: async () => {
        return await httpClient.get('api/bookings').json();
    },

    // Réservations en attente
    getPendingBookings: async () => {
        return await httpClient.get('api/bookings/pending').json();
    },

    // Réservations confirmées
    getConfirmedBookings: async () => {
        return await httpClient.get('api/bookings/confirmed').json();
    },

    // Réservations terminées
    getCompletedBookings: async () => {
        return await httpClient.get('api/bookings/completed').json();
    },

    // Mes gardes (en tant que pet-sitter)
    getMyPetSittingBookings: async () => {
        return await httpClient.get('api/bookings/as-pet-sitter').json();
    },

    // Mes demandes (en tant que propriétaire)
    getMyOwnerBookings: async () => {
        return await httpClient.get('api/bookings/as-owner').json();
    }
};
