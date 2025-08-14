import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import OnboardingFlow from './OnboardingFlow';

const AuthDialog = ({ triggerButton, defaultMode = 'login' }) => {
    const [isLogin, setIsLogin] = useState(defaultMode === 'login');
    const [isOpen, setIsOpen] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const loginMutation = useLogin();

    // Réinitialiser le mode quand la dialog s'ouvre
    useEffect(() => {
        if (isOpen) {
            setIsLogin(defaultMode === 'login');
            // Si c'est une inscription, démarrer directement le parcours onboarding
            setShowOnboarding(defaultMode === 'register');
        }
    }, [isOpen, defaultMode]);

    const switchToSignup = () => {
        setIsLogin(false);
        setShowOnboarding(true);
    };

    const switchToLogin = () => {
        setIsLogin(true);
        setShowOnboarding(false);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
        setShowOnboarding(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (isLogin) {
            loginMutation.mutate({
                username: data.username,
                password: data.password
            }, {
                onSuccess: () => {
                    handleCloseDialog(); // Fermer le dialog après connexion réussie
                }
            });
        } else {
            // Pour l'inscription, on lance le parcours d'onboarding
            switchToSignup();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {triggerButton}
            </DialogTrigger>
            <DialogContent className={showOnboarding || defaultMode === 'register' ? "sm:max-w-[500px]" : "sm:max-w-[425px]"}>
                {showOnboarding || defaultMode === 'register' ? (
                    <OnboardingFlow
                        onClose={handleCloseDialog}
                        onSwitchToLogin={switchToLogin}
                    />
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                {isLogin ? 'Se connecter' : "S'inscrire"}
                            </DialogTitle>
                            <DialogDescription>
                                {isLogin
                                    ? 'Veuillez vous connecter à votre compte.'
                                    : 'Créez votre compte pour rejoindre PetSwap.'
                                }
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                {/* Champ nom d'utilisateur */}
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Nom d'utilisateur</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder={isLogin ? "Votre nom d'utilisateur" : "Choisissez un nom d'utilisateur"}
                                        required
                                    />
                                </div>

                                {/* Champ mot de passe */}
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        {isLogin && (
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Mot de passe oublié ?
                                            </a>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder={isLogin ? "" : "Mot de passe"}
                                        required
                                    />
                                </div>

                                {/* Boutons d'action */}
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending
                                        ? 'Chargement...'
                                        : (isLogin ? 'Se connecter' : "Commencer l'inscription")
                                    }
                                </Button>
                                <Button variant="outline" className="w-full">
                                    {isLogin ? 'Se connecter avec Google' : "S'inscrire avec Google"}
                                </Button>
                            </div>

                            {/* Lien pour basculer entre connexion et inscription */}
                            <div className="mt-4 text-center text-sm">
                                {isLogin ? (
                                    <>
                                        Vous n&apos;avez pas de compte ?{" "}
                                        <button
                                            type="button"
                                            onClick={switchToSignup}
                                            className="underline underline-offset-4 hover:text-blue-600"
                                        >
                                            S&apos;inscrire
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Vous avez déjà un compte ?{" "}
                                        <button
                                            type="button"
                                            onClick={switchToLogin}
                                            className="underline underline-offset-4 hover:text-blue-600"
                                        >
                                            Se connecter
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
