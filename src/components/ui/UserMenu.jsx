import { Link } from '@tanstack/react-router';
import { BarChart3, Calendar, FileText, Heart, LogOut, MessageCircle, Settings, Star, User, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLogout } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const UserMenu = () => {
    const { user } = useAuth();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    // Vérifier si l'utilisateur peut gérer des pets
    const canManagePets = user?.role === 'OWNER' || user?.role === 'BOTH';
    const canManageListings = user?.role === 'OWNER' || user?.role === 'BOTH';
    const canViewMatches = user?.role === 'PET_SITTER' || user?.role === 'BOTH' || user?.role === 'OWNER';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                    {user?.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={user.username}
                            className=" rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center rounded-full bg-blue-600 text-white">
                            <User className="h-5 w-5" />
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.username}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user?.role?.toLowerCase()}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Tableau de bord</span>
                    </Link>
                </DropdownMenuItem>
                {canManagePets && (
                    <DropdownMenuItem asChild>
                        <Link to="/pets" className="w-full flex items-center">
                            <Heart className="mr-2 h-4 w-4" />
                            <span>Mes Animaux</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                {canManageListings && (
                    <DropdownMenuItem asChild>
                        <Link to="/listings" className="w-full flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Mes Annonces</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                {canViewMatches && (
                    <DropdownMenuItem asChild>
                        <Link to="/matches" className="w-full flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            <span>Mes Matches</span>
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                    <Link to="/messages" className="w-full flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link to="/bookings" className="w-full flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Réservations</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link to="/reviews" className="w-full flex items-center">
                        <Star className="mr-2 h-4 w-4" />
                        <span>Avis</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres du profil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={handleLogout}
                    disabled={logoutMutation.isPending}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{logoutMutation.isPending ? 'Déconnexion...' : 'Se déconnecter'}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
