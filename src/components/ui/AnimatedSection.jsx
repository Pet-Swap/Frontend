
const AnimatedSection = ({
    children,
    isVisible,
    animationType = 'fadeInUp',
    delay = 0,
    className = '',
    duration = 600
}) => {
    const getAnimationClasses = () => {
        const baseClasses = 'transition-all ease-out';

        switch (animationType) {
            case 'fadeInUp':
                return `${baseClasses} ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`;
            case 'fadeInLeft':
                return `${baseClasses} ${isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-8'
                    }`;
            case 'fadeInRight':
                return `${baseClasses} ${isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                    }`;
            case 'fadeIn':
                return `${baseClasses} ${isVisible
                    ? 'opacity-100'
                    : 'opacity-0'
                    }`;
            case 'scaleIn':
                return `${baseClasses} ${isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                    }`;
            default:
                return `${baseClasses} ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`;
        }
    };

    return (
        <div
            className={`${getAnimationClasses()} ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: `${duration}ms`
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;
