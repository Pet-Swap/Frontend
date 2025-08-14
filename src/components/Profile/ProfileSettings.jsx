import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateProfile } from '../../hooks/useProfile';
import { toast } from 'sonner';

const ProfileSettings = () => {
    const { user, updateUser } = useAuth();
    const updateProfileMutation = useUpdateProfile();
    
    const [formData, setFormData] = useState({
        username: user?.username || '',
        avatarUrl: user?.avatarUrl || '',
        bio: user?.bio || '',
        role: user?.role || 'OWNER'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('🐛 Debug user:', user);
        console.log('🐛 Debug user.id:', user?.id);
        
        if (!user?.id) {
            toast.error('Impossible de mettre à jour le profil : ID utilisateur manquant');
            return;
        }
        
        // Filtrer les champs vides pour n'envoyer que les modifications
        const updateData = {};
        if (formData.username !== user?.username) updateData.username = formData.username;
        if (formData.avatarUrl !== user?.avatarUrl) updateData.avatarUrl = formData.avatarUrl;
        if (formData.bio !== user?.bio) updateData.bio = formData.bio;
        if (formData.role !== user?.role) updateData.role = formData.role;

        if (Object.keys(updateData).length === 0) {
            toast.info('Aucune modification détectée');
            return;
        }

        updateProfileMutation.mutate(
            { id: user.id, profileData: updateData },
            {
                onSuccess: (updatedProfile) => {
                    toast.success('Profil mis à jour avec succès !');
                    // Mettre à jour le contexte utilisateur
                    updateUser(updatedProfile);
                },
                onError: (error) => {
                    console.error('Erreur lors de la mise à jour:', error);
                    toast.error('Erreur lors de la mise à jour du profil');
                }
            }
        );
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Paramètres du profil</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Votre nom d'utilisateur"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="avatarUrl">URL de l'avatar</Label>
                        <Input
                            id="avatarUrl"
                            name="avatarUrl"
                            type="url"
                            value={formData.avatarUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com/avatar.jpg"
                        />
                        {formData.avatarUrl && (
                            <div className="mt-2">
                                <img
                                    src={formData.avatarUrl}
                                    alt="Aperçu de l'avatar"
                                    className="w-16 h-16 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Biographie</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Parlez-nous de vous et de vos animaux..."
                            rows={4}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Rôle</Label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="OWNER">Propriétaire</option>
                            <option value="PET_SITTER">Gardien d'animaux</option>
                            <option value="BOTH">Les deux</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <Button 
                            type="submit" 
                            disabled={updateProfileMutation.isPending}
                            className="flex-1"
                        >
                            {updateProfileMutation.isPending ? 'Mise à jour...' : 'Sauvegarder'}
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setFormData({
                                username: user?.username || '',
                                avatarUrl: user?.avatarUrl || '',
                                bio: user?.bio || '',
                                role: user?.role || 'OWNER'
                            })}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileSettings;
