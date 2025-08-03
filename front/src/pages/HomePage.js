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

  // Données pour la section "Comment ça marche"
  const steps = [
    {
      number: 1,
      title: "Choisir la catégorie",
      description: "Choisir la catégorie d’artisanat dans le menu."
    },
    {
      number: 2,
      title: "Choisir un artisan",
      description: "Parcourez la liste et choisissez un artisan qui vous convient."
    },
    {
      number: 3,
      title: "Contacter l'artisan",
      description: "Le contacter via le formulaire de contact sur sa fiche."
    },
    {
      number: 4,
      title: "Recevoir une réponse",
      description: "Une réponse vous sera apportée sous 48h."
    }
  ];

  return (
    <div>
      {/*SECTION "COMMENT TROUVER MON ARTISAN ?"*/}
      <section className="my-5 py-5 text-center bg-light rounded">
        <div className="container">
          <h2 className="mb-5">Comment trouver mon artisan ?</h2>
          <div className="row">
            {steps.map(step => (
              <div className="col-md-3 mb-4" key={step.number}>
                <div className="d-flex flex-column align-items-center">
                  <div 
                    className="d-flex justify-content-center align-items-center mb-3" 
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#0d6efd', // Couleur primaire de Bootstrap
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {step.number}
                  </div>
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION "ARTISANS DU MOIS" */}
      <section className="my-5">
        <h2 className="text-center mb-4">Les artisans du mois</h2>
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
