const express = require('express');
const router = express.Router();
// Vous devrez créer le contrôleur correspondant
const categorieController = require('../controllers/categorie.controller'); 

// Route pour obtenir toutes les catégories
router.get('/', categorieController.getAllCategories);

module.exports = router;