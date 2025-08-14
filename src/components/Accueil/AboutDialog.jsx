import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const AboutDialog = ({ triggerButton }) => {
  const defaultTrigger = (
    <Button variant="link" className="text-gray-600 hover:text-gray-900">
      À propos
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle>À propos de Pet-Swap</DialogTitle>
          <DialogDescription>
            Bienvenue sur Pet-Swap, la plateforme innovante qui facilite les échanges et rencontres entre passionnés d'animaux.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p>
            <strong>Notre Mission :</strong> Offrir un espace convivial et sécurisé où les amoureux des animaux peuvent se connecter,
            échanger des conseils et partager leurs expériences.
          </p>
          <p>
            <strong>Nos Services :</strong> Grâce à un système de matching intelligent, des forums thématiques et des événements
            locaux, Pet-Swap réunit une communauté dynamique et engagée.
          </p>
          <p>
            <strong>Notre Équipe :</strong> Composée de passionnés et d'experts, notre équipe travaille sans relâche pour améliorer
            l'expérience utilisateur et garantir la sécurité de tous nos membres.
          </p>
          <p>
            Pour en savoir plus, consultez notre site web ou contactez notre support. Nous sommes toujours à l'écoute de vos suggestions
            pour faire évoluer la plateforme.
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
