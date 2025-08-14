import { Calendar, HelpCircle, MessageSquare, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const BookingFlowHelp = () => {
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
                        <Calendar className="w-5 h-5" />
                        Comment faire une demande de garde
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                👋 Flux corrigé !
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    1
                                </div>
                                <div>
                                    <p className="font-medium text-blue-900">Propriétaire crée son listing</p>
                                    <p className="text-sm text-blue-700">
                                        Vous publiez une annonce pour votre animal avec toutes les informations
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    2
                                </div>
                                <div>
                                    <p className="font-medium text-green-900">Pet-sitters s'intéressent</p>
                                    <p className="text-sm text-green-700">
                                        Les pet-sitters likent votre annonce s'ils sont intéressés
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    3
                                </div>
                                <div>
                                    <p className="font-medium text-purple-900">Vous choisissez et matchez</p>
                                    <p className="text-sm text-purple-700">
                                        Vous regardez les profils et choisissez votre pet-sitter
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    4
                                </div>
                                <div>
                                    <p className="font-medium text-orange-900">Vous faites une demande</p>
                                    <p className="text-sm text-orange-700">
                                        Vous envoyez une demande avec dates, prix et instructions pour votre animal
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3 p-3 bg-teal-50 rounded">
                                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                                    5
                                </div>
                                <div>
                                    <p className="font-medium text-teal-900">Pet-sitter accepte ou refuse</p>
                                    <p className="text-sm text-teal-700">
                                        Le pet-sitter confirme s'il peut s'occuper de votre animal
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Qui fait quoi ?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded">
                                <p className="font-medium text-blue-900 mb-1">👨‍👩‍👧‍👦 Propriétaires :</p>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Créent les listings</li>
                                    <li>• Font les demandes de garde</li>
                                    <li>• Donnent les instructions pour leur animal</li>
                                    <li>• Peuvent annuler leurs demandes</li>
                                </ul>
                            </div>
                            
                            <div className="bg-green-50 p-3 rounded">
                                <p className="font-medium text-green-900 mb-1">🐕‍🦺 Pet-sitters :</p>
                                <ul className="text-sm text-green-800 space-y-1">
                                    <li>• Likent les annonces qui les intéressent</li>
                                    <li>• Acceptent ou refusent les demandes</li>
                                    <li>• Suivent les instructions du propriétaire</li>
                                    <li>• Peuvent discuter via les messages</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                        <div className="flex items-start gap-2">
                            <MessageSquare className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-amber-900 mb-1">💡 Conseil :</p>
                                <p className="text-sm text-amber-800">
                                    Communiquez bien ! Utilisez les messages pour clarifier les détails 
                                    avant et pendant la garde. Plus d'infos = meilleure expérience !
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingFlowHelp;
