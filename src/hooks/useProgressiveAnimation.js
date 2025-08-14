import { useEffect, useRef, useState } from 'react';

export const useIntersectionAnimation = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                    setHasAnimated(true);
                }
            },
            { threshold }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, hasAnimated]);

    return [elementRef, isVisible];
};

export const useStaggeredAnimation = (itemCount, delay = 200, startDelay = 0) => {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [isTriggered, setIsTriggered] = useState(false);

    const triggerAnimation = () => {
        if (isTriggered) return;
        setIsTriggered(true);

        // Démarrer après le délai initial
        setTimeout(() => {
            for (let i = 0; i < itemCount; i++) {
                setTimeout(() => {
                    setVisibleItems(prev => new Set([...prev, i]));
                }, i * delay);
            }
        }, startDelay);
    };

    const isItemVisible = (index) => visibleItems.has(index);

    return [triggerAnimation, isItemVisible, isTriggered];
};

export const useProgressiveLoading = (sections, baseDelay = 500) => {
    const [loadedSections, setLoadedSections] = useState(new Set());
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    const startLoading = () => {
        sections.forEach((section, index) => {
            setTimeout(() => {
                setLoadedSections(prev => new Set([...prev, section]));

                // Si c'est la dernière section
                if (index === sections.length - 1) {
                    setTimeout(() => setIsLoadingComplete(true), 300);
                }
            }, baseDelay + (index * 300));
        });
    };

    const isSectionLoaded = (sectionName) => loadedSections.has(sectionName);

    return [startLoading, isSectionLoaded, isLoadingComplete];
};
