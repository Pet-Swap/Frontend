// Types pour l'authentification
export const UserRole = {
    OWNER: 'OWNER',
    PET_SITTER: 'PET_SITTER',
    BOTH: 'BOTH'
};

export const AuthRequest = {
    username: '',
    password: ''
};

export const AuthResponse = {
    token: ''
};

// Types pour les pets
export const PetSpecies = {
    DOG: 'DOG',
    CAT: 'CAT',
    BIRD: 'BIRD',
    RABBIT: 'RABBIT',
    FISH: 'FISH',
    OTHER: 'OTHER'
};

// Types pour les annonces
export const ListingStatus = {
    ACTIVE: 'ACTIVE',
    MATCHED: 'MATCHED',
    COMPLETED: 'COMPLETED'
};

// Types pour les swipes
export const SwipeDirection = {
    LIKE: 'LIKE',
    PASS: 'PASS'
};

// Types pour les matches
export const MatchStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    DECLINED: 'DECLINED'
};

// Types pour les profils
export const ProfileDto = {
    id: '',
    username: '',
    avatarUrl: '',
    bio: '',
    role: '' // OWNER, PET_SITTER, BOTH
};

// Types pour l'utilisateur
export const User = {
    id: '',
    username: '',
    avatarUrl: '',
    bio: '',
    role: '',
    rating: 0,
    createdAt: ''
};
