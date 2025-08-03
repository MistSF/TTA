import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ArtisanCard from '../components/ArtisanCard';

function HomePage() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    api.get('/artisans/monthly')
      .then(response => {
        setArtisans(response.data);
      })
      .catch(error => console.error("Erreur API", error));
  }, []);

  return (
    <div>
      {/* Section "Comment ça marche ?" à coder en statique */}
      <section className="my-5">
        <h2>Comment trouver mon artisan ?</h2>
        {/* ... votre JSX ici ... */}
      </section>

      {/* Section "Artisans du mois" */}
      <section className="my-5">
        <h2>Les artisans du mois</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {artisans.map(artisan => (
            <div className="col" key={artisan.id}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;