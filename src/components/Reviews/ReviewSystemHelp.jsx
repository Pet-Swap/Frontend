import { HelpCircle, Star, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

const ReviewSystemHelp = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Comment ça marche ?
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Nouveau système d'avis
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-600" />
                                Avis bidirectionnels
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    ✅
                                </div>
                                <div>
                                    <p className="font-medium text-sm">2 avis par réservation</p>
                                    <p className="text-xs text-gray-600">
                                        Chaque participant peut laisser un avis après la garde
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    👥
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Propriétaire → Pet-sitter</p>
                                    <p className="text-xs text-gray-600">
                                        Le propriétaire évalue la qualité de la garde
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    🐕
                                </div>
                                <div>
                                    <p className="font-medium text-sm">Pet-sitter → Propriétaire</p>
                                    <p className="text-xs text-gray-600">
                                        Le pet-sitter évalue l'animal et la communication
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                Avantages du nouveau système
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-600">✓</span>
                                <span>Plus d'équité : tout le monde peut donner son avis</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-600">✓</span>
                                <span>Meilleure confiance entre utilisateurs</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-600">✓</span>
                                <span>Informations plus complètes sur chaque réservation</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-600">✓</span>
                                <span>Validation automatique : un seul avis par personne</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Important :</strong> Les avis ne sont visibles qu'après finalisation 
                            de la réservation. Chaque personne peut laisser un avis unique par réservation.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewSystemHelp;
