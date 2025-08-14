import { QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { toast } from 'sonner';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            throwOnError: true,
            retry: (failureCount, error) => {
                // Ne pas retry sur les erreurs 4xx
                if (error instanceof HTTPError && error.response.status >= 400 && error.response.status < 500) {
                    return false;
                }
                return failureCount < 3;
            },
            onError: async (error) => {
                if (error instanceof HTTPError) {
                    try {
                        const problem = await error.response.json();
                        toast.error(problem?.detail || problem?.title || "Erreur serveur");
                    } catch {
                        toast.error("Erreur serveur (réponse non lisible)");
                    }
                } else if (error instanceof Error) {
                    toast.error(error.message || "Erreur inattendue");
                } else {
                    toast.error("Erreur inconnue");
                }
            }
        },
        mutations: {
            onError: async (error) => {
                if (error instanceof HTTPError) {
                    try {
                        const problem = await error.response.json();
                        toast.error(problem?.detail || problem?.title || "Erreur serveur");
                    } catch {
                        toast.error("Erreur serveur (réponse non lisible)");
                    }
                } else if (error instanceof Error) {
                    toast.error(error.message || "Erreur inattendue");
                } else {
                    toast.error("Erreur inconnue");
                }
            }
        }
    }
});

export default queryClient;
