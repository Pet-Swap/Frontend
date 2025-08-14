import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Marie L.",
            role: "Propriétaire de chat",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "PetSwap m'a permis de trouver Sarah, une pet-sitter fantastique ! Mon chat Whiskers l'adore et je pars en vacances l'esprit tranquille. 🐱"
        },
        {
            name: "Thomas B.",
            role: "Pet-sitter",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Grâce à PetSwap, j'ai pu transformer ma passion pour les animaux en activité rémunérée. Les propriétaires sont géniaux et leurs pets aussi ! 🐕"
        },
        {
            name: "Julie M.",
            role: "Propriétaire de chien",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Mon golden retriever Max est très sociable et PetSwap nous a aidés à trouver des compagnons de jeu parfaits dans le quartier ! 🎾"
        },
        {
            name: "Alex D.",
            role: "Pet-sitter",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "L'interface est super intuitive, comme Tinder mais pour les pets ! J'ai rapidement trouvé des clients sympas près de chez moi. 💜"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [testimonials.length]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${
                    i < rating ? 'text-accent fill-current' : 'text-muted-foreground/40'
                }`}
            />
        ));
    };

    return (
        <section className="py-20 bg-background">
            <div className="max-w-6xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Ils nous font confiance
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Découvrez les témoignages de notre communauté PetSwap
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-card to-muted rounded-2xl p-8 md:p-12 shadow-xl border border-border">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0">
                                <img
                                    src={testimonials[currentTestimonial].avatar}
                                    alt={testimonials[currentTestimonial].name}
                                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                                />
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <Quote className="w-8 h-8 text-primary mb-4 mx-auto md:mx-0" />
                                <p className="text-lg text-foreground mb-6 leading-relaxed">
                                    {testimonials[currentTestimonial].text}
                                </p>
                                
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    {renderStars(testimonials[currentTestimonial].rating)}
                                </div>
                                
                                <h4 className="font-semibold text-foreground text-lg">
                                    {testimonials[currentTestimonial].name}
                                </h4>
                                <p className="text-primary font-medium">
                                    {testimonials[currentTestimonial].role}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Indicateurs */}
                    <div className="flex justify-center mt-8 gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentTestimonial
                                        ? 'bg-primary scale-125'
                                        : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
