import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService.js';
import authStorage from '../utils/authStorage.js';
import { getUserFromToken } from '../utils/jwt.js';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    // Fonction pour charger le profil complet de l'utilisateur
    const loadUserProfile = async () => {
        try {
            console.log('🔍 Tentative de chargement du profil utilisateur...');
            const fullProfile = await authService.getCurrentUser();
            console.log('✅ Profil chargé avec succès:', fullProfile);
            setUser(fullProfile);
            setIsAuthenticated(true);
            
            // Mettre en cache le profil complet
            const token = authStorage.getToken();
            if (token) {
                authStorage.setAuth(token, fullProfile);
            }
            
            return true;
        } catch (error) {
            console.error('❌ Erreur lors du chargement du profil:', error);
            // Token probablement expiré, on déconnecte
            authStorage.clearAuth();
            setUser(null);
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
            setIsInitialized(true);
        }
    };

    // Initialisation optimisée - ne se lance qu'une fois
    useEffect(() => {
        if (isInitialized) return;

        const initializeAuth = async () => {
            // Vérification rapide avec le gestionnaire centralisé
            if (!authStorage.isValidAuth()) {
                console.log('📭 Aucun token valide trouvé');
                authStorage.clearAuth();
                setIsLoading(false);
                setIsInitialized(true);
                return;
            }

            // Token valide, récupérer les données en cache
            const cachedUser = authStorage.getCachedUser();
            const token = authStorage.getToken();

            if (cachedUser) {
                console.log('⚡ Utilisation des données en cache:', cachedUser);
                setUser(cachedUser);
                setIsAuthenticated(true);
                setIsLoading(false);
                setIsInitialized(true);

                // Rafraîchir les données en arrière-plan
                try {
                    const freshProfile = await authService.getCurrentUser();
                    setUser(freshProfile);
                    authStorage.setAuth(token, freshProfile);
                } catch (error) {
                    console.warn('⚠️ Échec du rafraîchissement en arrière-plan:', error);
                }
            } else {
                // Pas de cache, charger le profil
                console.log('🚀 Chargement du profil depuis l\'API...');
                const tokenData = getUserFromToken(token);
                if (tokenData) {
                    setUser({ id: tokenData.id, username: tokenData.username });
                    setIsAuthenticated(true);
                }
                
                await loadUserProfile();
            }
        };

        initializeAuth();
    }, [isInitialized]);

    const login = async (token) => {
        console.log('🎯 Login appelé avec token:', typeof token, token);
        
        // S'assurer que le token est une chaîne
        if (typeof token !== 'string') {
            console.error('❌ Token n\'est pas une chaîne:', token);
            throw new Error('Token invalide reçu');
        }
        
        // Extraction rapide des données du token
        const tokenData = getUserFromToken(token);
        if (tokenData) {
            const userData = { id: tokenData.id, username: tokenData.username };
            setUser(userData);
            setIsAuthenticated(true);
            authStorage.setAuth(token, userData);
        }
        
        // Charger le profil complet après login
        const fullProfile = await loadUserProfile();
        if (fullProfile) {
            authStorage.setAuth(token, user);
        }
    };

    const logout = () => {
        authStorage.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
        setIsInitialized(false); // Permettre une réinitialisation
    };

    const updateUser = (updatedUserData) => {
        setUser(prev => ({ ...prev, ...updatedUserData }));
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        isInitialized,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
