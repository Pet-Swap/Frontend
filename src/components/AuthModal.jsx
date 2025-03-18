import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-4">{isLogin ? "Connexion" : "Inscription"}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          {!isLogin && (
            <div>
              <Label className="mb-2" htmlFor="name">Nom</Label>
              <Input id="name" type="text" placeholder="Votre nom" required />
            </div>
          )}

          <div>
            <Label className="mb-2" htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="exemple@mail.com" required />
          </div>

          <div>
            <Label className="mb-2" htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" placeholder="•••••••" required />
          </div>

          <Button variant="outline" type="submit" className="w-full text-white">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </Button>
        </form>

        <p className="text-center text-sm mt-2">
          {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
          <button
            type="button"
            className="text-purple-700 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
