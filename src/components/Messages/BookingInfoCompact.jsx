import { Calendar, Clock, MapPin, PawPrint, AlertCircle, CheckCircle, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const BookingInfoCompact = ({ booking, currentUserId, otherUser, onConfirm, onCancel }) => {
    if (!booking) return null;

    const isOwner = booking.ownerId === currentUserId;
    const isPetSitter = booking.petSitterId === currentUserId;
    
    const getStatusInfo = (status) => {
        switch (status) {
            case 'PENDING':
                return {
                    color: 'bg-orange-100 text-orange-800 border-orange-200',
                    icon: <AlertCircle className="w-4 h-4" />,
                    text: isOwner ? 'En attente de votre confirmation' : 'En attente de confirmation du propriétaire'
                };
            case 'CONFIRMED':
                return {
                    color: 'bg-green-100 text-green-800 border-green-200',
                    icon: <CheckCircle className="w-4 h-4" />,
                    text: 'Confirmée'
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800 border-gray-200',
                    icon: <AlertCircle className="w-4 h-4" />,
                    text: status
                };
        }
    };

    const statusInfo = getStatusInfo(booking.status);
    
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isUpcoming = new Date(booking.startDate) > new Date();
    const isOngoing = new Date(booking.startDate) <= new Date() && new Date(booking.endDate) >= new Date();

    return (
        <div className="space-y-4">
            {/* Statut */}
            <div className="flex items-center justify-center">
                <Badge className={`px-3 py-2 ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span className="ml-2 font-medium">{statusInfo.text}</span>
                </Badge>
            </div>

            {/* Informations principales */}
            <div className="space-y-3 text-sm">
                {/* Dates */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                        <div className="font-medium">
                            {formatDateTime(booking.startDate)} → {formatDateTime(booking.endDate)}
                        </div>
                        <div className="text-gray-600 text-xs">
                            {isOngoing && '🟢 En cours maintenant'}
                            {!isOngoing && isUpcoming && 'À venir'}
                            {!isUpcoming && !isOngoing && 'Terminée'}
                        </div>
                    </div>
                </div>

                {/* Animaux */}
                {booking.pets && booking.pets.length > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <PawPrint className="w-5 h-5 text-primary" />
                        <div>
                            <div className="font-medium">
                                {booking.pets.length} animal{booking.pets.length > 1 ? 'x' : ''}
                            </div>
                            <div className="text-gray-600 text-xs">
                                {booking.pets.map(pet => pet.name).join(', ')}
                            </div>
                        </div>
                    </div>
                )}

                {/* Lieu */}
                {booking.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                            <div className="font-medium">Lieu</div>
                            <div className="text-gray-600 text-xs">{booking.location}</div>
                        </div>
                    </div>
                )}

                {/* Prix */}
                {booking.totalPrice && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-gray-600">Total</span>
                        <span className="font-bold text-lg text-green-600">{booking.totalPrice}€</span>
                    </div>
                )}

                {/* Notes */}
                {booking.notes && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-sm mb-1">Notes</div>
                        <div className="text-gray-700 text-xs">{booking.notes}</div>
                    </div>
                )}
            </div>

            {/* Actions */}
            {booking.status === 'PENDING' && isOwner && (
                <div className="space-y-2 pt-4 border-t">
                    <p className="text-sm text-orange-600 text-center mb-3">
                        Cette réservation attend votre confirmation
                    </p>
                    <div className="flex gap-2">
                        <Button 
                            className="flex-1"
                            onClick={() => onConfirm && onConfirm(booking.id)}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Confirmer
                        </Button>
                        <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => onCancel && onCancel(booking.id)}
                        >
                            Refuser
                        </Button>
                    </div>
                </div>
            )}

            {booking.status === 'PENDING' && isPetSitter && (
                <div className="space-y-2 pt-4 border-t">
                    <p className="text-sm text-blue-600 text-center mb-3">
                        En attente de la confirmation du propriétaire
                    </p>
                    <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => onCancel && onCancel(booking.id)}
                    >
                        Annuler ma demande
                    </Button>
                </div>
            )}
        </div>
    );
};

export default BookingInfoCompact;
