import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useLogout } from '../hooks/useAuth';
import { useAuth } from '../contexts/AuthContext';
import ProfileSettings from '../components/Profile/ProfileSettings';
import { useState } from 'react';

function Profile() {
  const logoutMutation = useLogout();
  const { user, isLoading } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <p>Chargement du profil...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <p>Vous devez être connecté pour voir cette page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Si on est en mode modification, afficher le composant ProfileSettings
  if (showSettings) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto mb-4">
          <Button 
            variant="outline" 
            onClick={() => setShowSettings(false)}
            className="mb-4"
          >
            ← Retour au profil
          </Button>
        </div>
        <ProfileSettings />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Mon Profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
                {user.username?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-blue-600 capitalize">{user.role?.toLowerCase()}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bio</h3>
            <p className="text-gray-600">{user.bio || "Aucune bio disponible"}</p>
          </div>

          <div className="pt-4 border-t space-y-3">
            <Button
              onClick={() => setShowSettings(true)}
              className="w-full"
            >
              Modifier le profil
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="w-full"
            >
              {logoutMutation.isPending ? 'Déconnexion...' : 'Se déconnecter'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile