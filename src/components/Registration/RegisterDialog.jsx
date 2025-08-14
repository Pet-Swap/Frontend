import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '../ui/dialog';
import OnboardingFlow from './OnboardingFlow';

const RegisterDialog = ({ triggerButton }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {triggerButton}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <OnboardingFlow 
                    onClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    );
};

export default RegisterDialog;
