import { Send } from 'lucide-react';
import { useState } from 'react';
import { useSendMessage } from '../../hooks/useMessages';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const SendMessageForm = ({ matchId, disabled = false }) => {
    const [content, setContent] = useState('');
    const sendMessageMutation = useSendMessage();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        sendMessageMutation.mutate({
            matchId,
            content: content.trim()
        }, {
            onSuccess: () => {
                setContent('');
            }
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="flex-1 min-h-[40px] max-h-24 resize-none"
                    disabled={disabled || sendMessageMutation.isPending}
                    rows={1}
                />
                <Button
                    type="submit"
                    size="sm"
                    disabled={!content.trim() || disabled || sendMessageMutation.isPending}
                    className="px-3"
                >
                    <Send className="w-4 h-4" />
                </Button>
            </div>
            {disabled && (
                <p className="text-xs text-gray-500 mt-2">
                    La conversation est disponible uniquement pour les matches confirmés
                </p>
            )}
        </form>
    );
};

export default SendMessageForm;
