import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-800">
              Le Bon Coin
            </a>
          </div>

          {/* Liens de navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="/offres" className="text-gray-700 hover:text-blue-600">
              Offres
            </a>
            <a href="/demandes" className="text-gray-700 hover:text-blue-600">
              Demandes
            </a>
            <a href="/services" className="text-gray-700 hover:text-blue-600">
              Services
            </a>
            <a href="/emplois" className="text-gray-700 hover:text-blue-600">
              Emplois
            </a>
          </div>

          {/* Bouton "Déposer une annonce" */}
          <div className="flex items-center">
            <a
              href="/deposer-une-annonce"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Déposer une annonce
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;