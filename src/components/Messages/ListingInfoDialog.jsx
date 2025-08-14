import { Calendar, Clock, Euro, MapPin, PawPrint, Star, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const ListingInfoDialog = ({ listing, petSitter }) => {
    if (!listing) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Aucune information de listing disponible</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="space-y-4">
            {/* Header avec titre et statut */}
            <div className="text-center border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {listing.title || 'Listing sans titre'}
                </h3>
                <Badge
                    className={`px-3 py-1 ${listing.isActive !== false
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {listing.isActive !== false ? '🟢 Actif' : '⚫ Inactif'}
                </Badge>
            </div>

            {/* Images des animaux */}
            {(listing.pets && listing.pets.length > 0) || listing.pet ? (
                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <PawPrint className="w-4 h-4" />
                        {listing.pets
                            ? `${listing.pets.length === 1 ? 'Animal' : 'Animaux'} du listing`
                            : 'Animal du listing'}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                        {/* Si c'est un seul pet */}
                        {listing.pet && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                {listing.pet.photoUrl ? (
                                    <img
                                        src={listing.pet.photoUrl}
                                        alt={listing.pet.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                                        <PawPrint className="w-6 h-6 text-gray-500" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="font-medium text-gray-900">{listing.pet.name}</div>
                                    <div className="text-sm text-gray-600">
                                        {listing.pet.species} {listing.pet.breed && `• ${listing.pet.breed}`}
                                    </div>
                                    {listing.pet.age && (
                                        <div className="text-xs text-gray-500">{listing.pet.age} ans</div>
                                    )}
                                    {listing.pet.description && (
                                        <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                                            {listing.pet.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {/* Si c'est un array de pets */}
                        {listing.pets &&
                            listing.pets.map((pet, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    {pet.photoUrl ? (
                                        <img
                                            src={pet.photoUrl}
                                            alt={pet.name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                                            <PawPrint className="w-6 h-6 text-gray-500" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{pet.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {pet.species} {pet.breed && `• ${pet.breed}`}
                                        </div>
                                        {pet.age && (
                                            <div className="text-xs text-gray-500">{pet.age} ans</div>
                                        )}
                                        {pet.description && (
                                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                {pet.description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : null}

            {/* Images du listing principal */}
            {listing.photos && listing.photos.length > 0 && (
                <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Photos du lieu</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {listing.photos.slice(0, 4).map((photo, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={photo.url || photo}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                                {index === 3 && listing.photos.length > 4 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            +{listing.photos.length - 4} photos
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Informations du pet-sitter */}
            {petSitter && (
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Pet-sitter</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {petSitter.avatarUrl ? (
                            <img
                                src={petSitter.avatarUrl}
                                alt={petSitter.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                                {petSitter.username?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <div>
                            <div className="font-medium">{petSitter.username}</div>
                            {petSitter.rating && (
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span>{petSitter.rating.toFixed(1)}</span>
                                    {petSitter.reviewCount && (
                                        <span>({petSitter.reviewCount} avis)</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Description */}
            {listing.description && (
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Description</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{listing.description}</p>
                </div>
            )}

            {/* Informations pratiques */}
            <div className="grid grid-cols-1 gap-3">
                {/* Localisation */}
                {listing.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                            <div className="font-medium text-sm">Localisation</div>
                            <div className="text-gray-600 text-xs">{listing.location}</div>
                        </div>
                    </div>
                )}

                {/* Prix */}
                {listing.pricePerDay && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Euro className="w-5 h-5 text-green-600" />
                        <div>
                            <div className="font-medium text-sm">Tarif</div>
                            <div className="text-green-700 font-bold">{listing.pricePerDay}€/jour</div>
                        </div>
                    </div>
                )}

                {/* Disponibilité */}
                {listing.availability && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                            <div className="font-medium text-sm">Disponibilité</div>
                            <div className="text-blue-700 text-xs">{listing.availability}</div>
                        </div>
                    </div>
                )}

                {/* Date de création */}
                {listing.createdAt && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <div>
                            <div className="font-medium text-sm">Créé le</div>
                            <div className="text-gray-600 text-xs">{formatDate(listing.createdAt)}</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Types d'animaux acceptés */}
            {listing.acceptedPetTypes && listing.acceptedPetTypes.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <PawPrint className="w-4 h-4" />
                        Animaux acceptés
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {listing.acceptedPetTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {type}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Services proposés */}
            {listing.services && listing.services.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Services proposés</h4>
                    <div className="flex flex-wrap gap-2">
                        {listing.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-primary/10">
                                {service}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Équipements */}
            {listing.amenities && listing.amenities.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Équipements</h4>
                    <div className="flex flex-wrap gap-2">
                        {listing.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-green/10">
                                ✓ {amenity}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t">
                <Button className="w-full" disabled>
                    Voir le profil complet
                </Button>
            </div>
        </div>
    );
};

export default ListingInfoDialog;