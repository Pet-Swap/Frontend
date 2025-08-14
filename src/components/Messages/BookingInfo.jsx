import { Calendar, Clock, MapPin, PawPrint, AlertCircle, CheckCircle, User } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const BookingInfo = ({ booking, currentUserId, otherUser, onConfirm, onCancel }) => {
    if (!booking) return null;

    const isOwner = booking.ownerId === currentUserId;
    const isPetSitter = booking.petSitterId === currentUserId;
    
    const getStatusInfo = (status) => {
        switch (status) {
            case 'PENDING':
                return {
                    color: 'bg-orange-100 text-orange-800 border-orange-200',
                    icon: <AlertCircle className="w-3 h-3" />,
                    text: isOwner ? 'En attente de votre confirmation' : 'En attente de confirmation du propriétaire'
                };
            case 'CONFIRMED':
                return {
                    color: 'bg-green-100 text-green-800 border-green-200',
                    icon: <CheckCircle className="w-3 h-3" />,
                    text: 'Confirmée'
                };
            case 'COMPLETED':
                return {
                    color: 'bg-blue-100 text-blue-800 border-blue-200',
                    icon: <CheckCircle className="w-3 h-3" />,
                    text: 'Terminée'
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800 border-gray-200',
                    icon: <AlertCircle className="w-3 h-3" />,
                    text: status
                };
        }
    };

    const statusInfo = getStatusInfo(booking.status);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isUpcoming = new Date(booking.startDate) > new Date();
    const isOngoing = new Date(booking.startDate) <= new Date() && new Date(booking.endDate) >= new Date();
    const isToday = new Date(booking.startDate).toDateString() === new Date().toDateString() ||
                    new Date(booking.endDate).toDateString() === new Date().toDateString();
    const isThisWeek = (() => {
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        const bookingStart = new Date(booking.startDate);
        return bookingStart >= weekStart && bookingStart <= weekEnd;
    })();

    return (
        <Card className={`mb-4 border-l-4 ${
            isOngoing ? 'border-l-green-500 bg-green-50' : 
            isToday ? 'border-l-orange-500 bg-orange-50' :
            isThisWeek ? 'border-l-blue-500 bg-blue-50' :
            'border-l-primary'
        }`}>
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <PawPrint className={`w-4 h-4 ${
                            isOngoing ? 'text-green-600' :
                            isToday ? 'text-orange-600' :
                            isThisWeek ? 'text-blue-600' :
                            'text-primary'
                        }`} />
                        <h4 className="font-semibold text-sm">
                            {isOngoing && '🟢 Garde en cours maintenant'}
                            {!isOngoing && isToday && '📅 Garde aujourd\'hui'}
                            {!isOngoing && !isToday && isUpcoming && isThisWeek && '📆 Garde cette semaine'}
                            {!isOngoing && !isToday && isUpcoming && !isThisWeek && 'Garde à venir'}
                            {!isUpcoming && !isOngoing && 'Garde passée'}
                        </h4>
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${statusInfo.color}`}>
                        {statusInfo.icon}
                        <span className="ml-1">{statusInfo.text}</span>
                    </Badge>
                </div>

                <div className="space-y-2 text-sm">
                    {/* Dates et horaires */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                            Du {formatDate(booking.startDate)} au {formatDate(booking.endDate)}
                        </span>
                    </div>

                    {/* Horaires détaillés */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                            {formatTime(booking.startDate)} - {formatTime(booking.endDate)}
                        </span>
                    </div>

                    {/* Lieu */}
                    {booking.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.location}</span>
                        </div>
                    )}

                    {/* Animaux concernés */}
                    {booking.pets && booking.pets.length > 0 && (
                        <div className="flex items-start gap-2 text-gray-600">
                            <PawPrint className="w-4 h-4 mt-0.5" />
                            <div>
                                <span className="font-medium">
                                    {booking.pets.length} animal{booking.pets.length > 1 ? 'x' : ''}:
                                </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {booking.pets.map((pet, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {pet.name} ({pet.species})
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Prix */}
                    {booking.totalPrice && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <span className="font-semibold text-primary">
                                {booking.totalPrice}€
                            </span>
                            <span>au total</span>
                        </div>
                    )}

                    {/* Participant */}
                    <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>
                            {isOwner ? 'Pet-sitter' : 'Propriétaire'}: {otherUser?.username}
                        </span>
                    </div>

                    {/* Notes spéciales */}
                    {booking.notes && (
                        <div className="bg-gray-50 p-2 rounded text-gray-700 text-xs">
                            <strong>Notes:</strong> {booking.notes}
                        </div>
                    )}

                    {/* Actions selon le statut */}
                    {booking.status === 'PENDING' && isOwner && (
                        <div className="pt-2 border-t">
                            <p className="text-xs text-orange-600 mb-2">
                                Cette réservation attend votre confirmation
                            </p>
                            <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    className="text-xs"
                                    onClick={() => onConfirm && onConfirm(booking.id)}
                                >
                                    Confirmer
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-xs"
                                    onClick={() => onCancel && onCancel(booking.id)}
                                >
                                    Refuser
                                </Button>
                            </div>
                        </div>
                    )}

                    {booking.status === 'PENDING' && isPetSitter && (
                        <div className="pt-2 border-t">
                            <p className="text-xs text-blue-600 mb-2">
                                En attente de la confirmation du propriétaire
                            </p>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-xs"
                                onClick={() => onCancel && onCancel(booking.id)}
                            >
                                Annuler ma demande
                            </Button>
                        </div>
                    )}

                    {isOngoing && booking.status === 'CONFIRMED' && (
                        <div className="pt-2 border-t">
                            <Badge className="bg-green-100 text-green-800 text-xs">
                                🟢 Garde actuellement en cours
                            </Badge>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingInfo;
