import React, { useMemo } from 'react';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import useDelayedReveal from '../utils/useDelay';

const Hero = () => {
  const delays = useMemo(() => [300, 900, 1200, 1500], []);
  const [showImage, showTitle, showSubtitle, showParagraph] = useDelayedReveal(delays);

  return (
    <section className="p-8">
      <div className="max-w-4xl mx-auto relative flex flex-col md:flex-row items-center justify-center">
        <div
          className="relative md:w-1/2 h-64 md:h-auto transition-opacity duration-500 ease-in-out"
          style={{ opacity: showImage ? 1 : 0 }}
        >
          <ResponsiveImage />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
          <h1
            className="text-4xl font-bold text-gray-800 transition-opacity duration-500 ease-in-out"
            style={{ opacity: showTitle ? 1 : 0 }}
          >
            Garde d’animaux simplifiée
          </h1>
          <h2
            className="text-2xl font-semibold text-gray-600 mt-4 transition-opacity duration-500 ease-in-out"
            style={{ opacity: showSubtitle ? 1 : 0 }}
          >
            Trouvez le pet-sitter idéal
          </h2>
          <p
            className="text-lg text-gray-500 mt-2 transition-opacity duration-500 ease-in-out"
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
