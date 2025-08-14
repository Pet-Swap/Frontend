import { useState } from 'react';
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
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const LoginDialog = ({ triggerButton }) => {
    const [isOpen, setIsOpen] = useState(false);
    const loginMutation = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        loginMutation.mutate({
            username: data.username,
            password: data.password
        }, {
            onSuccess: () => {
                setIsOpen(false);
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {triggerButton}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Se connecter</DialogTitle>
                    <DialogDescription>
                        Veuillez vous connecter à votre compte.
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
                                placeholder="Votre nom d'utilisateur"
                                required
                            />
                        </div>

                        {/* Champ mot de passe */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Mot de passe</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Mot de passe oublié ?
                                </a>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>

                        {/* Boutons d'action */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? 'Chargement...' : 'Se connecter'}
                        </Button>
                        
                        <Button variant="outline" className="w-full">
                            Se connecter avec Google
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
