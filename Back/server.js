require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
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
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données:', error);
  }
}

startServer();