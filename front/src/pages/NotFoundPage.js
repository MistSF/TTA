import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="text-center my-5">
      <h1>Erreur 404</h1>
      <p className="lead">Désolé, la page que vous cherchez n'existe pas.</p>
      <Link to="/" className="btn btn-primary">
        Retourner à la page d'accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;