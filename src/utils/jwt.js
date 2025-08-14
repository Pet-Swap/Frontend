// Fonction simple pour décoder un JWT (sans vérification de signature côté client)
export const decodeJWT = (token) => {
    try {
        console.log('🔑 Token reçu pour décodage:', typeof token, token);
        
        if (!token || typeof token !== 'string') {
            console.error('❌ Token invalide:', token);
            return null;
        }
        
        const parts = token.split('.');
        console.log('🔧 Parties du token:', parts.length, parts);
        
        if (parts.length !== 3) {
            console.error('❌ Token mal formaté, attendu 3 parties, reçu:', parts.length);
            return null;
        }
        
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erreur lors du décodage du JWT:', error);
        return null;
    }
};

export const getUserFromToken = (token) => {
    const decoded = decodeJWT(token);
    console.log('🔓 JWT décodé:', decoded);
    
    if (!decoded) return null;

    const userData = {
        id: decoded.userId || decoded.id, // ID utilisateur
        username: decoded.sub, // subject contient le username
        role: decoded.role,
        avatarUrl: null, // Sera récupéré via l'API
        bio: null, // Sera récupéré via l'API
        exp: decoded.exp // expiration
    };
    
    console.log('👤 Données utilisateur extraites:', userData);
    return userData;
};
