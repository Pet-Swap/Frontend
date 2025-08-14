import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

const BookingIndicator = ({ booking }) => {
    if (!booking) return null;

    const isToday = new Date(booking.startDate).toDateString() === new Date().toDateString() ||
                    new Date(booking.endDate).toDateString() === new Date().toDateString();
    const isOngoing = new Date(booking.startDate) <= new Date() && new Date(booking.endDate) >= new Date();
    const isUpcoming = new Date(booking.startDate) > new Date();

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getIndicatorInfo = () => {
        if (booking.status === 'PENDING') {
            return {
                color: 'bg-orange-100 text-orange-800 border-orange-200',
                icon: <AlertCircle className="w-3 h-3" />,
                text: 'En attente'
            };
        }
        
        if (isOngoing) {
            return {
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: <Clock className="w-3 h-3" />,
                text: 'En cours'
            };
        }
        
        if (isToday && isUpcoming) {
            return {
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: <Calendar className="w-3 h-3" />,
                text: `Aujourd'hui ${formatTime(booking.startDate)}`
            };
        }
        
        if (isUpcoming) {
            const days = Math.ceil((new Date(booking.startDate) - new Date()) / (1000 * 60 * 60 * 24));
            return {
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: <Calendar className="w-3 h-3" />,
                text: days === 1 ? 'Demain' : `Dans ${days}j`
            };
        }
        
        return null;
    };

    const indicatorInfo = getIndicatorInfo();
    if (!indicatorInfo) return null;

    return (
        <Badge className={`text-xs px-2 py-1 ${indicatorInfo.color} hover:opacity-80 transition-opacity cursor-pointer`}>
            {indicatorInfo.icon}
            <span className="ml-1">{indicatorInfo.text}</span>
        </Badge>
    );
};

export default BookingIndicator;
