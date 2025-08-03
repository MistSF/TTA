import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import StarRating from '../components/StarRating';
import ContactForm from '../components/ContactForm';

function ArtisanDetailPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get(`/artisans/${id}`)
      .then(response => {
        setArtisan(response.data);
      })
      .catch(err => {
        setError("Artisan non trouvé.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Affiche un message pendant le chargement
  if (loading) {
    return <div className="text-center"><p>Chargement de la fiche artisan...</p></div>;
  }

  // Affiche un message d'erreur si l'artisan n'est pas trouvé
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Si l'artisan n'existe pas mais qu'il n'y a pas d'erreur (cas improbable)
  if (!artisan) {
    return <p>Aucune information à afficher pour cet artisan.</p>;
  }

  return (
    <div className="artisan-detail-page">
      <div className="row">
        {/* Colonne de gauche : Image et Infos principales */}
        <div className="col-md-5 mb-4">
          <img 
            src={artisan.image_url || 'https://placehold.co/600x400/EAEAEA/3A3A3A?text=Photo+de+l\'artisan'} 
            className="img-fluid rounded shadow-sm" 
            alt={`Photo de ${artisan.name}`} 
          />
        </div>

        {/* Colonne de droite : Détails textuels */}
        <div className="col-md-7">
          <h1>{artisan.name}</h1>
          <div className="mb-3">
            <StarRating rating={artisan.note} />
          </div>
          <p><strong>Spécialité :</strong> {artisan.Specialite?.name || 'Non précisée'}</p>
          <p><strong>Localisation :</strong> {artisan.location}</p>
          
          {/* Affiche le lien du site web seulement s'il existe */}
          {artisan.website && (
            <p>
              <strong>Site web :</strong>{' '}
              <a href={artisan.website} target="_blank" rel="noopener noreferrer">
                {artisan.website}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Section "À propos" et Formulaire de contact */}
      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">À propos de {artisan.name}</h3>
              <p className="card-text">{artisan.about || "Cet artisan n'a pas encore fourni de description."}</p>
            </div>
          </div>
          
          <ContactForm artisanId={artisan.id} />
        </div>
      </div>
    </div>
  );
}

export default ArtisanDetailPage;
