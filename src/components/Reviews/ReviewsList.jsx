import { Eye, MessageSquare, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMyReviews, useUserReviews } from '../../hooks/useReviews';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ReviewCard from './ReviewCard';
import ReviewSystemHelp from './ReviewSystemHelp';
import UserRating from './UserRating';

const ReviewsList = ({ userId }) => {
    const { user } = useAuth();
    const targetUserId = userId || user?.id;

    const { data: userReviews, isLoading: userLoading } = useUserReviews(targetUserId);
    const { data: myReviews, isLoading: myLoading } = useMyReviews();

    const isOwnProfile = !userId || userId === user?.id;

    if (!user) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-gray-600">
                            Vous devez être connecté pour voir les avis.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {isOwnProfile ? 'Mes Avis' : `Avis de ${user?.username}`}
                    </h1>
                    {isOwnProfile && (
                        <UserRating userId={targetUserId} username={user?.username} />
                    )}
                </div>
                <ReviewSystemHelp />
            </div>

            <Tabs defaultValue="received" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="received" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Avis reçus ({userReviews?.length || 0})
                    </TabsTrigger>
                    {isOwnProfile && (
                        <TabsTrigger value="given" className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Avis donnés ({myReviews?.length || 0})
                        </TabsTrigger>
                    )}
                </TabsList>

                <TabsContent value="received" className="mt-6">
                    {userLoading ? (
                        <Card>
                            <CardContent className="p-6">
                                <p>Chargement des avis reçus...</p>
                            </CardContent>
                        </Card>
                    ) : !userReviews || userReviews.length === 0 ? (
                        <Card>
                            <CardContent className="p-6 text-center">
                                <Star className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 mb-2">Aucun avis reçu</p>
                                <p className="text-sm text-gray-500">
                                    {isOwnProfile
                                        ? 'Vos premiers avis apparaîtront ici après vos premières gardes'
                                        : 'Cet utilisateur n\'a pas encore reçu d\'avis'
                                    }
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {/* Résumé statistique */}
                            <Card>
                                <CardContent className="p-4">
                                    <UserRating userId={targetUserId} username={isOwnProfile ? user?.username : undefined} />
                                    <div className="mt-3 grid grid-cols-5 gap-2 text-sm">
                                        {[5, 4, 3, 2, 1].map(rating => {
                                            const count = userReviews.filter(r => r.rating === rating).length;
                                            const percentage = userReviews.length > 0 ? (count / userReviews.length) * 100 : 0;
                                            return (
                                                <div key={rating} className="flex items-center gap-1">
                                                    <span>{rating}★</span>
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-yellow-400 h-2 rounded-full"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-600">{count}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Nouvelle information sur le système bidirectionnel */}
                                    <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                                        💡 Nouveau : Chaque réservation peut avoir 2 avis (propriétaire + pet-sitter)
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Liste des avis */}
                            {userReviews.map((review) => (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    showBookingInfo={true}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                {isOwnProfile && (
                    <TabsContent value="given" className="mt-6">
                        {myLoading ? (
                            <Card>
                                <CardContent className="p-6">
                                    <p>Chargement des avis donnés...</p>
                                </CardContent>
                            </Card>
                        ) : !myReviews || myReviews.length === 0 ? (
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <p className="text-gray-600 mb-2">Aucun avis donné</p>
                                    <p className="text-sm text-gray-500">
                                        Vos avis donnés après vos expériences apparaîtront ici
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {myReviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        showBookingInfo={true}
                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                )}
            </Tabs>
        </div>
    );
};

export default ReviewsList;
