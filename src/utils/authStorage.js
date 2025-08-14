// Gestionnaire centralisé du stockage d'authentification
class AuthStorage {
    constructor() {
        this.TOKEN_KEY = 'authToken';
        this.USER_KEY = 'userData';
        this.listeners = new Set();
    }

    // Sauvegarder le token et les données utilisateur
    setAuth(token, userData) {
        localStorage.setItem(this.TOKEN_KEY, token);
        if (userData) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        }
        this.notifyListeners();
    }

    // Récupérer le token
    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Récupérer les données utilisateur mises en cache
    getCachedUser() {
        try {
            const userData = localStorage.getItem(this.USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    }

    // Vérifier si l'authentification est valide
    isValidAuth() {
        const token = this.getToken();
        if (!token) {
            console.log('❌ AuthStorage: Aucun token trouvé');
            return false;
        }

        try {
            const base64Url = token.split('.')[1];
            if (!base64Url) {
                console.log('❌ AuthStorage: Token mal formaté');
                return false;
            }
            
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            
            // Vérifier l'expiration (sans marge de sécurité pour le moment)
            const isValid = payload.exp * 1000 > Date.now();
            console.log('🔍 AuthStorage: Token valide?', isValid, 'Expire à:', new Date(payload.exp * 1000));
            
            return isValid;
        } catch (error) {
            console.error('❌ AuthStorage: Erreur lors de la vérification:', error);
            return false;
        }
    }

    // Supprimer l'authentification
    clearAuth() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.notifyListeners();
    }

    // Système d'écoute des changements
    addListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
}

export default new AuthStorage();
