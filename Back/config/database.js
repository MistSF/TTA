require('dotenv').config(); // Pour charger les variables d'environnement du fichier .env
const { Sequelize } = require('sequelize');

// On crée une instance de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,    // Nom de la base de données
  process.env.DB_USER,    // Utilisateur de la base de données
  process.env.DB_PASS,    // Mot de passe
  {
    host: process.env.DB_HOST, // Hôte de la base de données
    dialect: 'mysql'           // On spécifie qu'on utilise MySQL
  }
);

// On exporte l'instance pour pouvoir l'utiliser ailleurs dans le projet
module.exports = sequelize;