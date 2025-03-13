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
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const ParticipateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gray-600 hover:text-gray-900">
          Participer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-6">
        <DialogHeader>
          <DialogTitle>Participer à Pet-Swap</DialogTitle>
          <DialogDescription>
            Rejoignez-nous pour échanger, rencontrer et partager votre passion pour les animaux !
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <Input id="fullName" placeholder="Entrez votre nom complet" className="mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <Input id="email" type="email" placeholder="Entrez votre email" className="mt-1" />
            </div>
            <div>
              <label htmlFor="animalPreference" className="block text-sm font-medium text-gray-700">
                Préférence d'animal
              </label>
              <Input id="animalPreference" placeholder="Ex: chat, chien, etc." className="mt-1" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Pourquoi participer ?
              </label>
              <Textarea
                id="message"
                placeholder="Expliquez-nous pourquoi vous souhaitez rejoindre Pet-Swap"
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <Button type="submit">Envoyer</Button>
              <DialogClose asChild>
                <Button variant="outline">Annuler</Button>
              </DialogClose>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipateDialog;
