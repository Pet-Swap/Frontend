import httpClient from '../utils/httpClient.js';

export const listingService = {
    // Créer une nouvelle annonce
    createListing: async (listingData) => {
        return await httpClient.post('api/listings', { json: listingData }).json();
    },

    // Récupérer mes annonces
    getMyListings: async () => {
        return await httpClient.get('api/listings/my-listings').json();
    },

    // Récupérer les annonces à parcourir (pour swiper)
    getBrowseListings: async () => {
        return await httpClient.get('api/listings/browse').json();
    },

    // Mettre à jour une annonce
    updateListing: async (id, listingData) => {
        return await httpClient.put(`api/listings/${id}`, { json: listingData }).json();
    },

    // Supprimer une annonce
    deleteListing: async (id) => {
        return await httpClient.delete(`api/listings/${id}`).json();
    }
};
