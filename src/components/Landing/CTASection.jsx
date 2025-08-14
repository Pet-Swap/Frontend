import { ArrowRight, Sparkles } from 'lucide-react';
import AboutDialog from '../Accueil/AboutDialog';
import RegisterDialog from '../Registration/RegisterDialog';
import { Button } from '../ui/button';

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary-foreground/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-chart-1/20 rounded-full blur-xl"></div>

            <div className="max-w-4xl mx-auto px-8 text-center relative">
                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">Rejoignez la révolution des pets !</span>
                    </div>

                    <h2 className="text-5xl font-bold mb-6 leading-tight">
                        Prêt à trouver le
                        <span className="bg-gradient-to-r from-accent to-chart-1 bg-clip-text text-transparent"> match parfait </span>
                        pour votre animal ?
                    </h2>

                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers de propriétaires et pet-sitters qui ont déjà trouvé leur bonheur sur PetSwap.
                        C'est gratuit, c'est simple, c'est magique ! ✨
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <RegisterDialog
                        triggerButton={
                            <Button
                                size="lg"
                                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                Créer mon compte gratuitement
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        }
                    />

                    <AboutDialog
                        triggerButton={
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-4 rounded-full transition-all duration-300"
                            >
                                En savoir plus
                            </Button>
                        }
                    />
                </div>

                <div className="flex items-center justify-center gap-8 text-sm text-primary-foreground/70">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                        <span>Inscription gratuite</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                        <span>Aucun engagement</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                        <span>Support 24/7</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
