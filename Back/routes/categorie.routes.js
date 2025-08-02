// /routes/categorie.routes.js
const express = require('express');
const router = express.Router();
// Vous devrez créer le contrôleur correspondant
const categorieController = require('../controllers/categorie.controller'); 

// Route pour obtenir toutes les catégories (pour le menu)
// Ex: GET /api/categories
router.get('/', categorieController.getAllCategories);

module.exports = router;