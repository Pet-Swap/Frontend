import React, { useMemo } from 'react';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import useDelayedReveal from '../utils/useDelay';

const Hero = () => {
  const delays = useMemo(() => [300, 900, 1200, 1500], []);
  const [showImage, showTitle, showSubtitle, showParagraph] = useDelayedReveal(delays);

  return (
    <section className="p-8 bg-background relative overflow-hidden">
      {/* Bordures fading sur les côtés */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary/20 via-primary/10 to-transparent pointer-events-none"></div>
      
      {/* Bordures fading en haut et en bas */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative flex flex-col md:flex-row items-center justify-center">
        <div
          className="relative md:w-1/2 h-64 md:h-auto transition-opacity duration-500 ease-in-out"
          style={{ opacity: showImage ? 1 : 0 }}
        >
          <ResponsiveImage />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
          <h1
            className="text-4xl font-bold text-foreground transition-opacity duration-500 ease-in-out"
            style={{ opacity: showTitle ? 1 : 0 }}
          >
            Garde d’animaux simplifiée
          </h1>
          <h2
            className="text-2xl font-semibold text-muted-foreground mt-4 transition-opacity duration-500 ease-in-out"
            style={{ opacity: showSubtitle ? 1 : 0 }}
          >
            Trouvez le pet-sitter idéal
          </h2>
          <p
            className="text-lg text-muted-foreground/80 mt-2 transition-opacity duration-500 ease-in-out"
            style={{ opacity: showParagraph ? 1 : 0 }}
          >
            Votre partenaire de confiance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
