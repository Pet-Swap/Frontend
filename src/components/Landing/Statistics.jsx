import { Calendar, Heart, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStaggeredAnimation } from '../../hooks/useProgressiveAnimation';
import { useStatistics } from '../../hooks/useStatistics';
import AnimatedSection from '../ui/AnimatedSection';

const Statistics = () => {
    const { data: realStats, isLoading, error } = useStatistics();
    const [counters, setCounters] = useState({
        users: 0,
        matches: 0,
        bookings: 0,
        rating: 0
    });
    const [isVisible, setIsVisible] = useState(false);
    const [triggerStagger, isItemVisible] = useStaggeredAnimation(4, 150, 500);

    // Debug logs
    console.log('📊 Statistics Debug:', { realStats, isLoading, error });

    // Utiliser les vraies données si disponibles, sinon des valeurs par défaut
    const finalValues = {
        users: realStats?.totalUsers || 150,
        matches: realStats?.totalMatches || 420,
        bookings: realStats?.totalBookings || 89,
        rating: realStats?.averageRating || 4.7
    };

    useEffect(() => {
        // Détecter quand le composant devient visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                    triggerStagger();
                }
            },
            { threshold: 0.2 }
        );

        const element = document.getElementById('statistics-section');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [isVisible, triggerStagger]);

    useEffect(() => {
        // Ne démarrer l'animation que si on a les données et que la section est visible
        if ((!realStats && !error) || !isVisible) return;

        const duration = 2000; // 2 secondes
        const steps = 60;
        const interval = duration / steps;

        const timer = setInterval(() => {
            setCounters(prev => {
                const newCounters = { ...prev };
                let allComplete = true;

                Object.keys(finalValues).forEach(key => {
                    if (prev[key] < finalValues[key]) {
                        allComplete = false;
                        const increment = finalValues[key] / steps;
                        newCounters[key] = Math.min(
                            prev[key] + increment,
                            finalValues[key]
                        );
                    }
                });

                if (allComplete) {
                    clearInterval(timer);
                    return finalValues;
                }

                return newCounters;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [realStats, error, finalValues.users, finalValues.matches, finalValues.bookings, finalValues.rating, isVisible]);

    const stats = [
        {
            icon: <Users className="w-12 h-12" />,
            value: isLoading ? "..." : Math.floor(counters.users),
            suffix: "+",
            label: "Utilisateurs actifs",
            color: "from-green-600 to-green-700"
        },
        {
            icon: <Heart className="w-12 h-12" />,
            value: isLoading ? "..." : Math.floor(counters.matches),
            suffix: "+",
            label: "Matchs réalisés",
            color: "from-green-500 to-green-600"
        },
        {
            icon: <Calendar className="w-12 h-12" />,
            value: isLoading ? "..." : Math.floor(counters.bookings),
            suffix: "+",
            label: "Réservations",
            color: "from-green-400 to-green-500"
        },
        {
            icon: <Star className="w-12 h-12" />,
            value: isLoading ? "..." : counters.rating.toFixed(1),
            suffix: "/5",
            label: "Note moyenne",
            color: "from-emerald-500 to-emerald-600"
        }
    ];

    return (
        <section id="statistics-section" className="py-20 bg-gradient-to-br from-background to-muted text-foreground relative overflow-hidden">            {/* Background decoration - Updated for nature theme */}

            <div className="max-w-6xl mx-auto px-8 relative">
                <AnimatedSection
                    isVisible={isVisible}
                    animationType="fadeInUp"
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 text-foreground">
                        PetSwap en chiffres
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Une communauté qui grandit chaque jour grâce à votre confiance
                    </p>
                    {realStats && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 text-green-700 px-3 py-1 rounded-full text-sm">
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                            Données en temps réel
                        </div>
                    )}
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <AnimatedSection
                            key={index}
                            isVisible={isItemVisible(index)}
                            animationType="scaleIn"
                            className="text-center transform hover:scale-105 transition-transform duration-300"
                        >
                            <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
                                {stat.icon}
                            </div>
                            <div className="text-4xl font-bold mb-2 text-foreground">
                                {stat.value}
                                <span className="text-2xl">{stat.suffix}</span>
                            </div>
                            <p className="text-muted-foreground font-medium">
                                {stat.label}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Achievement badges */}
                <AnimatedSection
                    isVisible={isVisible}
                    animationType="fadeInUp"
                    delay={1000}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-8 bg-card/50 backdrop-blur-sm rounded-full px-8 py-4 border border-border">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-foreground">Service 24/7</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                            <span className="text-sm text-foreground">Vérifications sécurisées</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-foreground">Assurance incluse</span>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Statistics;
