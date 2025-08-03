import React from 'react';

// Le composant accepte une seule prop : la note de l'artisan
function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Ajoute les étoiles pleines
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={`full_${i}`} className="bi bi-star-fill"></i>);
  }

  // Ajoute la demi-étoile si nécessaire
  if (hasHalfStar) {
    stars.push(<i key="half" className="bi bi-star-half"></i>);
  }

  // Ajoute les étoiles vides pour compléter jusqu'à 5
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty_${i}`} className="bi bi-star"></i>);
  }

  return (
    <div className="star-rating" style={{ color: '#F19E56' }}>
      {stars}
      <span className="ms-2 text-muted" style={{color: '#6c757d'}}>{rating} / 5</span>
    </div>
  );
}

export default StarRating;