import { ArrowLeft, ArrowRight, Camera, Heart, PawPrint, Users, Sparkles, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRegister } from '../../hooks/useAuth';
import { useUsernameCheck } from '../../hooks/useUsernameCheck';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';


const OnboardingFlow = ({ onClose, onSwitchToLogin }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        role: '',
        avatarUrl: '',
        bio: ''
    });
    const [usernameStatus, setUsernameStatus] = useState(null); // null, 'checking', 'available', 'taken'
    const [usernameCheckTimeout, setUsernameCheckTimeout] = useState(null);
    
    const registerMutation = useRegister();
    const usernameCheckMutation = useUsernameCheck();

    const steps = [
        {
            id: 'credentials',
            title: '👋 Créons votre compte',
            subtitle: 'Commençons par vos identifiants',
            emoji: '🎯'
        },
        {
            id: 'role',
            title: '🤔 Qui êtes-vous ?',
            subtitle: 'Choisissez votre rôle sur PetSwap',
            emoji: '🎭'
        },
        {
            id: 'avatar',
            title: '📸 Ajoutez votre photo',
            subtitle: 'Montrez-vous sous votre meilleur jour',
            emoji: '✨'
        },
        {
            id: 'bio',
            title: '📝 Parlez-nous de vous',
            subtitle: 'Une petite description pour vous présenter',
            emoji: '💬'
        }
    ];

    const roleOptions = [
        {
            id: 'OWNER',
            title: 'Propriétaire',
            subtitle: 'Je cherche des pet-sitters pour mes animaux',
            icon: Heart,
            color: 'bg-pink-500 hover:bg-pink-600',
            bgColor: 'bg-pink-50 hover:bg-pink-100'
        },
        {
            id: 'PET_SITTER',
            title: 'Pet-sitter',
            subtitle: 'Je veux garder les animaux de compagnie',
            icon: PawPrint,
            color: 'bg-blue-500 hover:bg-blue-600',
            bgColor: 'bg-blue-50 hover:bg-blue-100'
        },
        {
            id: 'BOTH',
            title: 'Les deux',
            subtitle: 'Je veux garder ET faire garder mes animaux',
            icon: Users,
            color: 'bg-purple-500 hover:bg-purple-600',
            bgColor: 'bg-purple-50 hover:bg-purple-100'
        }
    ];

    // Effet pour vérifier l'username avec debounce
    useEffect(() => {
        console.log('🔍 UseEffect username check déclenché, username:', userData.username, 'longueur:', userData.username.trim().length);
        
        if (userData.username.trim().length >= 3) {
            console.log('✅ Username assez long, démarrage de la vérification');
            
            // Nettoyer le timeout précédent
            if (usernameCheckTimeout) {
                console.log('🧹 Nettoyage du timeout précédent');
                clearTimeout(usernameCheckTimeout);
            }

            setUsernameStatus('checking');
            console.log('⏳ Status défini sur "checking"');

            // Définir un nouveau timeout pour éviter trop de requêtes
            const timeout = setTimeout(() => {
                console.log('🚀 Lancement de la requête de vérification pour:', userData.username);
                usernameCheckMutation.mutate(userData.username, {
                    onSuccess: (data) => {
                        console.log('✅ Réponse de vérification reçue:', data);
                        const newStatus = data.exists ? 'taken' : 'available';
                        console.log('🎯 Nouveau status:', newStatus);
                        setUsernameStatus(newStatus);
                    },
                    onError: (error) => {
                        console.error('❌ Erreur lors de la vérification:', error);
                        setUsernameStatus(null);
                    }
                });
            }, 800); // Attendre 800ms après l'arrêt de frappe

            setUsernameCheckTimeout(timeout);
        } else {
            console.log('❌ Username trop court, reset du status');
            setUsernameStatus(null);
            if (usernameCheckTimeout) {
                clearTimeout(usernameCheckTimeout);
                setUsernameCheckTimeout(null);
            }
        }

        // Cleanup à la destruction du composant
        return () => {
            if (usernameCheckTimeout) {
                clearTimeout(usernameCheckTimeout);
            }
        };
    }, [userData.username]);

    const handleNext = () => {
        // Validation spécifique pour l'étape des identifiants
        if (currentStep === 0) {
            if (!userData.username.trim() || !userData.password.trim()) {
                toast.error('Veuillez remplir tous les champs');
                return;
            }
            if (userData.username.length < 3) {
                toast.error('Le nom d\'utilisateur doit contenir au moins 3 caractères');
                return;
            }
            if (userData.password.length < 6) {
                toast.error('Le mot de passe doit contenir au moins 6 caractères');
                return;
            }
            if (usernameStatus !== 'available') {
                toast.error('Veuillez choisir un nom d\'utilisateur disponible');
                return;
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const canProceed = () => {
        const result = (() => {
            switch (currentStep) {
                case 0:
                    const step0Result = userData.username.trim() && 
                           userData.password.trim() && 
                           userData.username.length >= 3 && 
                           userData.password.length >= 6 && 
                           usernameStatus === 'available';
                    console.log('🔍 canProceed step 0:', {
                        username: userData.username,
                        usernameLength: userData.username.length,
                        password: userData.password ? '***' : '',
                        passwordLength: userData.password.length,
                        usernameStatus,
                        result: step0Result
                    });
                    return step0Result;
                case 1:
                    return userData.role;
                case 2:
                    return true; // Avatar est optionnel
                case 3:
                    return true; // Bio est optionnelle
                default:
                    return false;
            }
        })();
        
        console.log('🎯 canProceed final result for step', currentStep, ':', result);
        return result;
    };

    const handleSubmit = async () => {
        try {
            // Préparer les données pour l'inscription
            const registrationData = {
                username: userData.username,
                password: userData.password,
                role: userData.role,
                bio: userData.bio || null,
                avatarUrl: userData.avatarUrl || null
            };
            
            registerMutation.mutate(registrationData, {
                onSuccess: () => {
                    toast.success('🎉 Bienvenue sur PetSwap !');
                    onClose();
                },
                onError: (error) => {
                    console.error('Erreur inscription:', error);
                    toast.error('Erreur lors de l\'inscription');
                }
            });
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Une erreur est survenue');
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    value={userData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    placeholder="Choisissez un nom d'utilisateur unique"
                                    className={`text-lg p-4 pr-12 ${
                                        usernameStatus === 'available' ? 'border-green-500 focus:border-green-500' :
                                        usernameStatus === 'taken' ? 'border-red-500 focus:border-red-500' :
                                        'border-gray-300'
                                    }`}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    {usernameStatus === 'checking' && (
                                        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                                    )}
                                    {usernameStatus === 'available' && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    )}
                                    {usernameStatus === 'taken' && (
                                        <XCircle className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                            </div>
                            {usernameStatus === 'taken' && (
                                <p className="text-sm text-red-500 mt-1">
                                    Ce nom d'utilisateur est déjà pris
                                </p>
                            )}
                            {usernameStatus === 'available' && (
                                <p className="text-sm text-green-500 mt-1">
                                    Ce nom d'utilisateur est disponible
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                value={userData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                placeholder="Créez un mot de passe sécurisé"
                                className="text-lg p-4"
                            />
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-4">
                        {roleOptions.map((option) => {
                            const IconComponent = option.icon;
                            const isSelected = userData.role === option.id;
                            
                            return (
                                <Card
                                    key={option.id}
                                    className={`cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                                        isSelected 
                                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                                            : 'hover:shadow-lg'
                                    }`}
                                    onClick={() => handleInputChange('role', option.id)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-full ${option.color} text-white`}>
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {option.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {option.subtitle}
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="relative mx-auto w-32 h-32 mb-4">
                                {userData.avatarUrl ? (
                                    <img
                                        src={userData.avatarUrl}
                                        alt="Aperçu de votre avatar"
                                        className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-100 border-4 border-gray-200 flex items-center justify-center">
                                        <Camera className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                                {userData.avatarUrl && (
                                    <div className="hidden w-full h-full rounded-full bg-gray-100 border-4 border-gray-200 items-center justify-center absolute top-0">
                                        <Camera className="w-12 h-12 text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="avatarUrl">URL de votre photo de profil</Label>
                            <Input
                                id="avatarUrl"
                                type="url"
                                value={userData.avatarUrl}
                                onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                                placeholder="https://exemple.com/votre-photo.jpg"
                                className="text-lg p-4"
                            />
                            <p className="text-sm text-gray-600">
                                Ajoutez l'URL d'une photo ou laissez vide pour utiliser un avatar par défaut
                            </p>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="bio">Votre bio</Label>
                            <Textarea
                                id="bio"
                                value={userData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                placeholder={`Parlez-nous un peu de vous... ${
                                    userData.role === 'OWNER' 
                                        ? 'Quels animaux avez-vous ? Que recherchez-vous chez un pet-sitter ?' 
                                        : userData.role === 'PET_SITTER'
                                        ? 'Quelle est votre expérience avec les animaux ? Pourquoi aimez-vous les garder ?'
                                        : 'Partagez votre passion pour les animaux !'
                                }`}
                                rows={4}
                                className="resize-none"
                                maxLength={500}
                            />
                            <div className="text-right text-xs text-gray-500">
                                {userData.bio.length}/500 caractères
                            </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                                💡 <strong>Conseil :</strong> Une bio engageante vous aidera à créer de meilleurs liens avec la communauté PetSwap !
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-md mx-auto">
            {/* Indicateur de progression */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                        Étape {currentStep + 1} sur {steps.length}
                    </span>
                    <span className="text-sm text-gray-500">
                        {Math.round(((currentStep + 1) / steps.length) * 100)}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* En-tête */}
            <div className="text-center mb-8">
                <div className="text-4xl mb-2">{steps[currentStep].emoji}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {steps[currentStep].title}
                </h2>
                <p className="text-gray-600">
                    {steps[currentStep].subtitle}
                </p>
            </div>

            {/* Contenu de l'étape */}
            <div className="mb-8">
                {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between space-x-4">
                <Button
                    variant="outline"
                    onClick={currentStep === 0 ? onClose : handleBack}
                    className="flex items-center space-x-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{currentStep === 0 ? 'Fermer' : 'Retour'}</span>
                </Button>

                <Button
                    onClick={handleNext}
                    disabled={!canProceed() || registerMutation.isPending}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600"
                >
                    <span>
                        {registerMutation.isPending 
                            ? 'Création...' 
                            : currentStep === steps.length - 1 
                            ? 'Créer mon compte' 
                            : 'Suivant'
                        }
                    </span>
                    {!registerMutation.isPending && <ArrowRight className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    );
};

export default OnboardingFlow;
