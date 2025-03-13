import React from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Se connecter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Se connecter</DialogTitle>
          <DialogDescription>
            Veuillez vous connecter à votre compte.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@example.com"
                required
              />
            </div>
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
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
            <Button variant="outline" className="w-full">
              Se connecter avec Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous n&apos;avez pas de compte ?{" "}
            <a href="#" className="underline underline-offset-4">
              S&apos;inscrire
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
