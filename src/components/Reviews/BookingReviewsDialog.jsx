import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import BookingReviewsDisplay from './BookingReviewsDisplay';

const BookingReviewsDialog = ({ booking, isOpen, onClose, onCreateReview }) => {
    if (!booking) return null;

    const listing = booking?.match?.listing;
    const pet = listing?.pet;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Avis de la réservation
                    </DialogTitle>
                    <p className="text-sm text-gray-600">
                        Garde de {pet?.name} • {listing?.title}
                    </p>
                </DialogHeader>
                
                <div className="mt-4">
                    <BookingReviewsDisplay 
                        booking={booking} 
                        onCreateReview={onCreateReview}
                        compact={false}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingReviewsDialog;
