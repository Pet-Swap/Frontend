import { Button } from '../components/ui/button';
import { useToast } from '../hooks/useToast';

function About() {
  const toast = useToast();

  const showSuccessToast = () => {
    toast.success('Opération réussie !', {
      description: 'Votre action a été effectuée avec succès.'
    });
  };

  const showErrorToast = () => {
    toast.error('Une erreur est survenue', {
      description: 'Veuillez réessayer plus tard.'
    });
  };

  const showInfoToast = () => {
    toast.info('Information importante', {
      description: 'Voici une information utile pour vous.'
    });
  };

  const showWarningToast = () => {
    toast.warning('Attention !', {
      description: 'Cette action nécessite votre attention.'
    });
  };

  const showLoadingToast = () => {
    const loadingToast = toast.loading('Chargement en cours...');
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Chargement terminé !');
    }, 3000);
  };

  const showPromiseToast = () => {
    const myPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ name: 'Pet-Swap' }), 2000);
    });

    toast.promise(myPromise, {
      loading: 'Chargement...',
      success: (data) => `${data.name} chargé avec succès !`,
      error: 'Erreur lors du chargement',
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">À propos de Pet-Swap</h1>
      <p className="text-lg mb-8">
        Pet-Swap est une plateforme qui permet aux propriétaires d'animaux de se connecter
        et d'échanger des services de garde pour leurs animaux de compagnie.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Démonstration des toasts</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={showSuccessToast} variant="default">
            Toast Succès
          </Button>
          <Button onClick={showErrorToast} variant="destructive">
            Toast Erreur
          </Button>
          <Button onClick={showInfoToast} variant="secondary">
            Toast Info
          </Button>
          <Button onClick={showWarningToast} variant="outline">
            Toast Warning
          </Button>
          <Button onClick={showLoadingToast} variant="outline">
            Toast Loading
          </Button>
          <Button onClick={showPromiseToast} variant="outline">
            Toast Promise
          </Button>
        </div>
      </div>
    </div>
  )
}

export default About