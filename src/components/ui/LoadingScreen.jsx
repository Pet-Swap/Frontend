import { useEffect, useState } from 'react';
import DogLoadingIcon from '../ui/DogLoadingIcon';

const LoadingScreen = ({ onComplete, duration = 3000 }) => {
    const [progress, setProgress] = useState(0);
    const [currentPhase, setCurrentPhase] = useState('loading'); // loading, completing, done

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const increment = 100 / (duration / 50); // 50ms intervals
                const newProgress = Math.min(prev + increment, 100);

                if (newProgress >= 100) {
                    setCurrentPhase('completing');
                    clearInterval(interval);

                    // Attendre un peu avant de terminer
                    setTimeout(() => {
                        setCurrentPhase('done');
                        setTimeout(onComplete, 500);
                    }, 500);
                }

                return newProgress;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [duration, onComplete]);

    const getLoadingText = () => {
        if (progress < 25) return "Initialisation de PetSwap...";
        if (progress < 50) return "Chargement des profils...";
        if (progress < 75) return "Préparation de votre expérience...";
        if (progress < 100) return "Presque prêt...";
        return "Bienvenue sur PetSwap !";
    };

    return (
        <div className={`fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center z-50 transition-opacity duration-500 ${currentPhase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
            {/* Particules d'animation en arrière-plan */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="text-center relative z-10">
                {/* Icône de chien avec progression */}
                <div className="mb-8 flex justify-center">
                    <DogLoadingIcon
                        progress={progress}
                        size={120}
                        className="drop-shadow-lg"
                    />
                </div>

                {/* Texte de progression */}
                <h2 className="text-2xl font-bold text-foreground mb-4 transition-all duration-300">
                    {getLoadingText()}
                </h2>

                {/* Barre de progression */}
                <div className="w-80 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto mb-4">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Pourcentage */}
                <p className="text-muted-foreground text-lg font-medium">
                    {Math.round(progress)}%
                </p>

                {/* Messages d'encouragement */}
                <div className="mt-6 h-6">
                    {progress > 80 && (
                        <p className="text-primary font-medium animate-fade-in">
                            🐾 Votre aventure PetSwap commence bientôt !
                        </p>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
