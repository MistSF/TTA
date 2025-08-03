import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function ArtisanCard({ artisan }) {
  // Le prop "artisan" contient un objet avec les infos : { id, name, note, Specialite: { name }, location }

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{artisan.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{artisan.Specialite.name}</h6>
        <p className="card-text">{artisan.location}</p>
        <StarRating rating={artisan.note} />
        <Link to={`/artisan/${artisan.id}`} className="btn btn-primary">Voir le profil</Link>
      </div>
    </div>
  );
}

export default ArtisanCard;