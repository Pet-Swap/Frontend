import { Heart, Search, MessageCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const HowItWorks = () => {
    const [visibleSteps, setVisibleSteps] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleSteps(prev => {
                if (prev.length < 4) {
                    return [...prev, prev.length];
                }
                return prev;
            });
        }, 500);

        return () => clearInterval(timer);
    }, []);

    const steps = [
        {
            icon: <Search className="w-12 h-12" />,
            title: "1. Inscrivez-vous",
            description: "Créez votre profil en quelques clics et décrivez vos besoins"
        },
        {
            icon: <Heart className="w-12 h-12" />,
            title: "2. Swipez",
            description: "Découvrez des pet-sitters près de chez vous et likez ceux qui vous plaisent"
        },
        {
            icon: <MessageCircle className="w-12 h-12" />,
            title: "3. Chattez",
            description: "Discutez avec vos matchs pour organiser la garde de votre animal"
        },
        {
            icon: <CheckCircle className="w-12 h-12" />,
            title: "4. Réservez",
            description: "Confirmez votre réservation et profitez d'un service de qualité"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-background to-muted">
            <div className="max-w-6xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Comment ça marche ?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Trouvez le pet-sitter parfait en 4 étapes simples
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`text-center transform transition-all duration-700 ${
                                visibleSteps.includes(index)
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-10 opacity-0'
                            }`}
                        >
                            <div className="relative">
                                <div className="w-24 h-24 mx-auto mb-6 bg-card rounded-full shadow-lg flex items-center justify-center text-primary transform hover:scale-110 transition-transform duration-300 border border-border">
                                    {step.icon}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-accent/50"></div>
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                                {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
