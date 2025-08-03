import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ArtisanCard from '../components/ArtisanCard';

function ArtisanListPage() {
  // 1. Récupérer le paramètre dynamique de l'URL
  const { categoryName } = useParams();

  // 2. Mettre en place les états pour les artisans, le chargement et les erreurs
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Utiliser useEffect pour lancer l'appel API quand la catégorie change
  useEffect(() => {
    // On réinitialise l'état à chaque changement de catégorie
    setLoading(true);
    setError(null);

    // L'appel à l'API avec le filtre de catégorie
    api.get(`/artisans?category=${categoryName}`)
      .then(response => {
        setArtisans(response.data);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des artisans :", err);
        setError("Impossible de charger les artisans pour cette catégorie.");
      })
      .finally(() => {
        setLoading(false);
      });

  }, [categoryName]); // Le hook se relance si `categoryName` change

  // 4. Gérer l'affichage des états de chargement et d'erreur
  if (loading) {
    return <div className="text-center"><p>Chargement des artisans...</p></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  
  // Fonction pour mettre la première lettre en majuscule
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // 5. Afficher la liste des artisans
  return (
    <div>
      <h1 className="mb-4">Artisans de la catégorie : {capitalizeFirstLetter(categoryName)}</h1>
      
      {artisans.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {artisans.map(artisan => (
            <div className="col" key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun artisan trouvé dans cette catégorie pour le moment.</p>
      )}
    </div>
  );
}

export default ArtisanListPage;