import ky from 'ky';
import authStorage from './authStorage.js';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8089';

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const httpClient = ky.create({
    prefixUrl: backendUrl,
    credentials: 'include',
    timeout: 5000,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
    },
    hooks: {
        beforeRequest: [
            (request) => {
                // Utiliser le gestionnaire d'authentification centralisé
                const isValid = authStorage.isValidAuth();
                console.log('🔑 HttpClient: Auth valide?', isValid);
                
                if (isValid) {
                    const token = authStorage.getToken();
                    console.log('🚀 HttpClient: Ajout du token à la requête');
                    request.headers.set('Authorization', `Bearer ${token}`);
                } else {
                    console.log('❌ HttpClient: Pas de token valide pour la requête');
                }
            }
        ],
        afterResponse: [
            async (_request, _options, response) => {
                if (response.status === 401) {
                    // Token expiré ou invalide
                    authStorage.clearAuth();
                    // Rediriger vers la page d'accueil ou afficher une notification
                    window.location.reload();
                } else if (response.type === 'cors' && response.status === 401) {
                    // Comportement avec oauth2
                    window.location.href = backendUrl;
                    await delay(5000);
                } else if (response.redirected) {
                    // Comportement avec form login (dev local)
                    window.location.href = response.url;
                }
                return response;
            }
        ]
    }
});

export default httpClient;
