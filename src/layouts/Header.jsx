import { Link } from '@tanstack/react-router';
import AboutDialog from '../components/Accueil/AboutDialog';
import ParticipateDialog from '../components/Accueil/ParticipateDialog';
import LoginDialog from '../components/Registration/LoginDialog';
import RegisterDialog from '../components/Registration/RegisterDialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import UserMenu from '../components/ui/UserMenu';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className="py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Groupe de gauche : Icône + Liens */}
        <div className="flex items-center space-x-8">
          <Link to="/"><div className="text-2xl font-bold">Pet-Swap</div></Link>
          <nav className="hidden md:flex space-x-6">
            <AboutDialog />
            <ParticipateDialog />

          </nav>
        </div>

        {/* Groupe de droite : Boutons et champ de recherche */}
        <div className="flex items-center space-x-4">
          <Input placeholder="Rechercher..." />
          {!isLoading && (
            isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <LoginDialog
                  triggerButton={<Button variant="outline">Se connecter</Button>}
                />
                <RegisterDialog
                  triggerButton={<Button>S'inscrire</Button>}
                />
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
