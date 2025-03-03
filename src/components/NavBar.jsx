import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircleMore, Search, Bell, LogIn, Heart, SquarePlus } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex items-center justify-center p-4 bg-white shadow-md">
      <div className="flex items-center justify-center gap-2 max-w-4xl w-full">
        <img
          src="/logo.svg" // Remplace par le logo que tu souhaites
          alt="Logo"
          className="h-8"
        />
        
        <a href="#" className="flex items-center">
        <Button variant="outline" className="p-2 flex items-center">
            <SquarePlus className="w-4 h-4" />
            Déposer une annonce
        </Button>
        </a>

        {/* Barre de recherche avec bouton à droite */}
        <div className="relative w-80">
          <Input
            type="text"
            placeholder="Rechercher..."
            className="w-full p-2 text-sm border border-gray-300 rounded-md pr-10"
          />
          <Button
            variant="outline"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 w-8 h-8"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" className="p-2 flex flex-col items-center space-y-0.25">
          <Bell className="w-4 h-4" />
          <span className="text-xs">Notifications</span>
        </Button>

        {/* Favoris */}
        <a href="#" className="flex flex-col items-center space-y-0.25">
          <Button variant="ghost" className="p-2 flex flex-col items-center">
            <Heart className="w-4 h-4" />
            <span className="text-xs">Favoris</span>
          </Button>
        </a>

        {/* Messages */}
        <a href="#" className="flex flex-col items-center space-y-0.25">
          <Button variant="ghost" className="p-2 flex flex-col items-center">
            <MessageCircleMore className="w-4 h-4" />
            <span className="text-xs">Messages</span>
          </Button>
        </a>

        {/* Ajouter une annonce */}
        <a href="#" className="flex flex-col items-center space-y-0.25">
          <Button variant="ghost" className="p-2 flex flex-col items-center">
            <LogIn className="w-4 h-4" />
            <span className="text-xs">Se connecter</span>
          </Button>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
