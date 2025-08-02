require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares ---
// Pour autoriser les requêtes cross-origin (depuis votre frontend React)
app.use(cors()); 
// Pour parser le JSON dans le corps des requêtes POST/PUT
app.use(express.json()); 

// --- Routes ---
const artisanRoutes = require('./routes/artisan.routes');
const categorieRoutes = require('./routes/categorie.routes');

app.use('/api/artisans', artisanRoutes);
app.use('/api/categories', categorieRoutes);

// --- Démarrage du serveur ---
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');
    // sequelize.sync({ alter: true }); // Attention: 'alter: true' peut modifier vos tables. Utilisez avec précaution en production.
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
  }
}

startServer();