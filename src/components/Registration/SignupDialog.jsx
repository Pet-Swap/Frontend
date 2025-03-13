import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const SignupDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>S'inscrire</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">S'inscrire</DialogTitle>
          <DialogDescription>
            Veuillez vous inscrire.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" type="text" placeholder="Votre nom" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="Mot de passe" required />
            </div>
            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
            <Button variant="outline" className="w-full">
              S'inscrire avec Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <a href="#" className="underline underline-offset-4">
              Connectez-vous
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
