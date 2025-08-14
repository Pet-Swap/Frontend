import { useAuth } from '../../contexts/AuthContext';

const MessageBubble = ({ message }) => {
    const { user } = useAuth();
    const isOwnMessage = message.senderId === user?.id;

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                {/* Avatar pour les messages des autres */}
                {!isOwnMessage && (
                    <div className="flex items-center mb-1">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-xs">
                            {message.senderUsername?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="text-xs text-gray-600">{message.senderUsername}</span>
                    </div>
                )}

                {/* Bulle de message */}
                <div className={`px-4 py-2 rounded-lg ${isOwnMessage
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                    <p className="text-sm">{message.content}</p>
                </div>

                {/* Timestamp */}
                <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'
                    }`}>
                    {formatTime(message.sentAt)}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
