import React from 'react';
import Header from '../layouts/Header';
import Hero from '../layouts/Hero';
import Footer from '../layouts/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        
      </main>
      <Footer />
    </div>
  );
};

export default Home;
