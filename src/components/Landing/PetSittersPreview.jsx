import { Heart, MapPin, MessageCircle, Star } from 'lucide-react';
import ParticipateDialog from '../Accueil/ParticipateDialog';
import { Button } from '../ui/button';

const PetSittersPreview = () => {
    const petSitters = [
        {
            id: 1,
            name: "Sarah M.",
            age: 28,
            location: "Paris 15ème",
            rating: 4.9,
            reviewCount: 127,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
            specialties: ["Chiens", "Chats"],
            bio: "Passionnée d'animaux depuis toujours, j'adore m'occuper de vos compagnons comme s'ils étaient les miens ! 🐕🐱",
            price: "25€/jour",
            isOnline: true
        },
        {
            id: 2,
            name: "Marc L.",
            age: 35,
            location: "Lyon 2ème",
            rating: 4.8,
            reviewCount: 89,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            specialties: ["Chiens", "NAC"],
            bio: "Vétérinaire de formation, je propose un service premium pour vos animaux. Expérience et amour garantis !",
            price: "35€/jour",
            isOnline: false
        },
        {
            id: 3,
            name: "Emma K.",
            age: 24,
            location: "Marseille 8ème",
            rating: 5.0,
            reviewCount: 45,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
            specialties: ["Chats", "Oiseaux"],
            bio: "Étudiante vétérinaire, disponible pour choyer vos petits protégés avec tout l'amour qu'ils méritent ! 💕",
            price: "20€/jour",
            isOnline: true
        }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-accent fill-current' : 'text-muted-foreground/40'
                    }`}
            />
        ));
    };

    return (
        <section className="py-20 bg-gradient-to-br from-background to-muted">
            <div className="max-w-6xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Découvrez nos pet-sitters
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Des profils vérifiés, passionnés et près de chez vous
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {petSitters.map((sitter, index) => (
                        <div
                            key={sitter.id}
                            className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-border"
                        >
                            {/* Header avec avatar */}
                            <div className="relative">
                                <div className="h-48 bg-gradient-to-br from-primary to-chart-1"></div>
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                    <div className="relative">
                                        <img
                                            src={sitter.avatar}
                                            alt={sitter.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-card shadow-lg"
                                        />
                                        {sitter.isOnline && (
                                            <div className="absolute bottom-2 right-2 w-4 h-4 bg-chart-1 rounded-full border-2 border-card"></div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contenu */}
                            <div className="pt-16 pb-6 px-6 text-center">
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                    {sitter.name}
                                </h3>

                                <div className="flex items-center justify-center gap-1 mb-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{sitter.location}</span>
                                </div>

                                <div className="flex items-center justify-center gap-1 mb-4">
                                    {renderStars(sitter.rating)}
                                    <span className="text-sm text-muted-foreground ml-1">
                                        {sitter.rating} ({sitter.reviewCount} avis)
                                    </span>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    {sitter.specialties.map((specialty, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {sitter.bio}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">
                                        {sitter.price}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="p-2"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="p-2 bg-accent hover:bg-accent/80"
                                        >
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <ParticipateDialog
                        triggerButton={
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-primary-foreground px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Voir tous les pet-sitters
                                <Heart className="w-5 h-5 ml-2" />
                            </Button>
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default PetSittersPreview;
