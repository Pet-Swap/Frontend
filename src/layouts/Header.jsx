import React from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import AboutDialog from '../components/Accueil/AboutDialog';
import ParticipateDialog from '../components/Accueil/ParticipateDialog';
import LoginDialog from '../components/Registration/LoginDialog';
import SignupDialog from '../components/Registration/SignupDialog';

const Header = () => {
  return (
    <header className="py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Groupe de gauche : Icône + Liens */}
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold">Pet-Swap</div>
          <nav className="hidden md:flex space-x-6">
            <AboutDialog />
            <ParticipateDialog />
          </nav>
        </div>

        {/* Groupe de droite : Boutons et champ de recherche */}
        <div className="flex items-center space-x-4">
          <Input placeholder="Rechercher..." />
          <LoginDialog />
          <SignupDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
