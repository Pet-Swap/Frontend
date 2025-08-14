import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import CTASection from '../components/Landing/CTASection';
import HowItWorks from '../components/Landing/HowItWorks';
import PetSittersPreview from '../components/Landing/PetSittersPreview';
import Statistics from '../components/Landing/Statistics';
import Testimonials from '../components/Landing/Testimonials';
import AnimatedSection from '../components/ui/AnimatedSection';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useProgressiveLoading } from '../hooks/useProgressiveAnimation';
import Hero from '../layouts/Hero';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const sections = ['hero', 'howItWorks', 'petSitters', 'statistics', 'testimonials', 'cta'];
  const [startLoading, isSectionLoaded, isLoadingComplete] = useProgressiveLoading(sections, 500);

  useEffect(() => {
    // Démarrer l'animation progressive des sections
    startLoading();
  }, [startLoading]);

  if (isAuthenticated) {
    return (
      <AnimatedSection
        isVisible={isSectionLoaded('hero')}
        animationType="fadeIn"
        className="p-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection
            isVisible={isSectionLoaded('hero')}
            animationType="fadeInUp"
            delay={200}
          >
            <h1 className="text-4xl font-bold mb-4">
              Bienvenue, {user?.username} ! 🐾
            </h1>
          </AnimatedSection>
          <AnimatedSection
            isVisible={isSectionLoaded('hero')}
            animationType="fadeInUp"
            delay={400}
          >
            <p className="text-xl text-gray-600 mb-8">
              Prêt à trouver des compagnons pour vos animaux ?
            </p>
          </AnimatedSection>
          <AnimatedSection
            isVisible={isSectionLoaded('hero')}
            animationType="scaleIn"
            delay={600}
          >
            <div className="flex gap-4 justify-center">
              <Link to="/swipe">
                <Button size="lg">
                  Commencer à swiper
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="lg">
                  Mon profil
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <div>
      <AnimatedSection
        isVisible={isSectionLoaded('hero')}
        animationType="fadeInUp"
      >
        <Hero />
      </AnimatedSection>

      <AnimatedSection
        isVisible={isSectionLoaded('howItWorks')}
        animationType="fadeInUp"
        delay={100}
      >
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection
        isVisible={isSectionLoaded('petSitters')}
        animationType="fadeInLeft"
        delay={200}
      >
        <PetSittersPreview />
      </AnimatedSection>

      <AnimatedSection
        isVisible={isSectionLoaded('statistics')}
        animationType="scaleIn"
        delay={300}
      >
        <Statistics />
      </AnimatedSection>

      <AnimatedSection
        isVisible={isSectionLoaded('testimonials')}
        animationType="fadeInRight"
        delay={400}
      >
        <Testimonials />
      </AnimatedSection>

      <AnimatedSection
        isVisible={isSectionLoaded('cta')}
        animationType="fadeInUp"
        delay={500}
      >
        <CTASection />
      </AnimatedSection>
    </div>
  );
};

export default Home;
