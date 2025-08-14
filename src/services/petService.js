import httpClient from '../utils/httpClient.js';

export const petService = {
    // Récupérer tous mes pets
    getMyPets: async () => {
        return await httpClient.get('api/pets').json();
    },

    // Créer un nouveau pet
    createPet: async (petData) => {
        return await httpClient.post('api/pets', { json: petData }).json();
    },

    // Mettre à jour un pet
    updatePet: async (id, petData) => {
        return await httpClient.put(`api/pets/${id}`, { json: petData }).json();
    },

    // Supprimer un pet
    deletePet: async (id) => {
        return await httpClient.delete(`api/pets/${id}`).json();
    }
};
