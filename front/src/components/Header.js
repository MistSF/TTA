import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Votre service d'appel API (axios)
import logo from '../assets/logo.png'; // Assurez-vous que le logo est dans /src/assets/

function Header() {
  // --- STATE MANAGEMENT ---
  // 1. Pour stocker les catégories venues de l'API
  const [categories, setCategories] = useState([]);
  // 2. Pour contrôler le champ de recherche
  const [searchTerm, setSearchTerm] = useState("");
  // 3. Pour gérer l'ouverture/fermeture du menu sur mobile
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Hook de React Router pour la redirection programmatique
  const navigate = useNavigate();

  // --- DATA FETCHING ---
  // Se déclenche une seule fois au chargement du composant pour récupérer les catégories
  useEffect(() => {
    api.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des catégories:", error);
      });
  }, []); // Le tableau de dépendances vide signifie "exécuter une seule fois"

  // --- HANDLERS (gestionnaires d'événements) ---
  // Gère la soumission du formulaire de recherche
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Empêche la page de se recharger
    if (searchTerm.trim()) {
      // Redirige vers une page de résultats de recherche
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm(""); // Optionnel : vide le champ après la recherche
    }
  };

  // Gère le clic sur le bouton du menu mobile
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // --- RENDER ---
  return (
    <header className="shadow-sm mb-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Requirement 2: Logo avec un lien qui ramène vers la page d’accueil */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo Trouve ton artisan" style={{ height: '50px' }} />
          </Link>

          {/* Bouton pour le menu hamburger sur mobile */}
          <button className="navbar-toggler" type="button" onClick={handleNavCollapse}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Conteneur qui s'affiche ou se cache sur mobile */}
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
            {/* Requirement 3: Menu avec des liens alimentés depuis la base de données */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {categories.map(categorie => (
                <li className="nav-item" key={categorie.id}>
                  <Link className="nav-link" to={`/categorie/${categorie.name.toLowerCase()}`}>
                    {categorie.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Requirement 4: Barre de recherche */}
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Rechercher un artisan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">Rechercher</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;