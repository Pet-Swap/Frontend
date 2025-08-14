import { Link } from '@tanstack/react-router';
import {
    Calendar,
    CheckCircle,
    Clock,
    FileText,
    Heart,
    MessageCircle,
    Users
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useBookingsToComplete, useCompletedBookings, useConfirmedBookings, usePendingBookings } from '../../hooks/useBookings';
import { useConversations } from '../../hooks/useMessages';
import { useMyMatches, usePendingMatches } from '../../hooks/useSwipes';
import UserRating from '../Reviews/UserRating';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const Dashboard = () => {
    const { user } = useAuth();
    const { data: allMatches } = useMyMatches();
    const { data: pendingMatches } = usePendingMatches();
    const { data: pendingBookings } = usePendingBookings();
    const { data: confirmedBookings } = useConfirmedBookings();
    const { data: completedBookings } = useCompletedBookings();
    const { data: bookingsToComplete } = useBookingsToComplete();
    const { data: conversations } = useConversations();

    // Identifier les personnes avec qui on peut re-booker
    const rebookablePeople = completedBookings ?
        [...new Map(completedBookings.map(booking => [
            booking.match?.petSitter?.id || booking.match?.listing?.ownerId,
            {
                userId: booking.match?.petSitter?.id || booking.match?.listing?.ownerId,
                username: booking.match?.petSitter?.username || booking.match?.listing?.ownerUsername,
                avatarUrl: booking.match?.petSitter?.avatarUrl || booking.match?.listing?.ownerAvatarUrl,
                lastBooking: booking,
                totalBookings: completedBookings.filter(b =>
                    (b.match?.petSitter?.id === (booking.match?.petSitter?.id || booking.match?.listing?.ownerId)) ||
                    (b.match?.listing?.ownerId === (booking.match?.petSitter?.id || booking.match?.listing?.ownerId))
                ).length
            }
        ])).values()]
        : [];

    const isOwner = user?.role === 'OWNER' || user?.role === 'BOTH';
    const isPetSitter = user?.role === 'PET_SITTER' || user?.role === 'BOTH';

    if (!user) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600">
                            Vous devez être connecté pour voir le tableau de bord.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const stats = [
        {
            title: 'Matches',
            count: allMatches?.length || 0,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            link: '/matches'
        },
        {
            title: 'Messages',
            count: conversations?.length || 0,
            icon: MessageCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            link: '/messages'
        },
        {
            title: 'Réservations',
            count: (pendingBookings?.length || 0) + (confirmedBookings?.length || 0),
            icon: Calendar,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            link: '/bookings'
        }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
                <p className="text-gray-600">Bienvenue {user.username} !</p>
            </div>

            {/* Profil utilisateur */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        {user.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.username}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                                {user.username?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">{user.username}</h2>
                            <p className="text-gray-600 capitalize">{user.role?.toLowerCase()}</p>
                            <UserRating userId={user.id} username={user.username} />
                        </div>
                        <Button asChild variant="outline">
                            <Link to="/profile">Modifier le profil</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <Card key={stat.title} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold">{stat.count}</p>
                                    </div>
                                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                        <IconComponent className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                                <Button asChild variant="ghost" className="w-full mt-3">
                                    <Link to={stat.link}>Voir tout</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Actions pet-sitter */}
                {isPetSitter && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-pink-600" />
                                Pet-Sitter
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button asChild className="w-full">
                                <Link to="/swipe">
                                    <Users className="w-4 h-4 mr-2" />
                                    Découvrir des annonces
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link to="/matches">
                                    <Users className="w-4 h-4 mr-2" />
                                    Mes matches ({allMatches?.length || 0})
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Actions propriétaire */}
                {isOwner && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                Propriétaire
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button asChild className="w-full">
                                <Link to="/pets">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Gérer mes animaux
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link to="/listings">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Mes annonces
                                </Link>
                            </Button>
                            {pendingMatches && pendingMatches.length > 0 && (
                                <Button asChild variant="outline" className="w-full bg-orange-50 border-orange-200">
                                    <Link to="/matches">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Matches en attente ({pendingMatches.length})
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Alertes et notifications */}
            <div className="space-y-4">
                {pendingMatches && pendingMatches.length > 0 && isOwner && (
                    <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-orange-600" />
                                <div className="flex-1">
                                    <p className="font-medium text-orange-800">
                                        Vous avez {pendingMatches.length} match{pendingMatches.length > 1 ? 's' : ''} en attente
                                    </p>
                                    <p className="text-sm text-orange-700">
                                        Des pet-sitters attendent votre réponse
                                    </p>
                                </div>
                                <Button asChild size="sm">
                                    <Link to="/matches">Répondre</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {pendingBookings && pendingBookings.length > 0 && isOwner && (
                    <Card className="border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                <div className="flex-1">
                                    <p className="font-medium text-blue-800">
                                        {pendingBookings.length} réservation{pendingBookings.length > 1 ? 's' : ''} à confirmer
                                    </p>
                                    <p className="text-sm text-blue-700">
                                        Des demandes de garde attendent votre confirmation
                                    </p>
                                </div>
                                <Button asChild size="sm">
                                    <Link to="/bookings">Voir</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Rappel pour gardes terminées à finaliser */}
                {bookingsToComplete && bookingsToComplete.length > 0 && (
                    <Card className="border-orange-200 bg-orange-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-orange-800">
                                        {bookingsToComplete.length} garde{bookingsToComplete.length > 1 ? 's' : ''} terminée{bookingsToComplete.length > 1 ? 's' : ''} à finaliser
                                    </p>
                                    <p className="text-sm text-orange-700">
                                        Finalisez ces gardes pour pouvoir laisser des avis
                                    </p>
                                </div>
                                <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
                                    <Link to="/bookings" search={{ tab: 'confirmed' }}>
                                        Finaliser
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Suggestion de re-booking */}
                {rebookablePeople && rebookablePeople.length > 0 && (
                    <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                    <Heart className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-purple-800">
                                        Recontacter vos partenaires préférés
                                    </p>
                                    <p className="text-sm text-purple-700">
                                        Vous avez {rebookablePeople.length} personne{rebookablePeople.length > 1 ? 's' : ''} avec qui vous avez déjà travaillé
                                    </p>
                                </div>
                                <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                                    <Link to="/bookings" search={{ tab: 'completed' }}>
                                        Voir historique
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {confirmedBookings && confirmedBookings.length > 0 && (
                    <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div className="flex-1">
                                    <p className="font-medium text-green-800">
                                        {confirmedBookings.length} réservation{confirmedBookings.length > 1 ? 's' : ''} confirmée{confirmedBookings.length > 1 ? 's' : ''}
                                    </p>
                                    <p className="text-sm text-green-700">
                                        Vos prochaines gardes vous attendent
                                    </p>
                                </div>
                                <Button asChild size="sm" variant="outline">
                                    <Link to="/bookings">Gérer</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
