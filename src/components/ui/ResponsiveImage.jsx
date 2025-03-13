import React from 'react';
import dog from '../../assets/dog.jpg'; // ajustez le chemin en fonction de l'emplacement réel

const ResponsiveImage = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden">
      <img
        src={dog}
        alt="Dog"
        className="w-full h-auto transition-opacity duration-200 ease-in block"
      />
      {/* Overlay avec dégradé radial pour une transition blanche sur les bords */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_60%,white_100%)]"></div>
    </div>
  );
};

export default ResponsiveImage;
