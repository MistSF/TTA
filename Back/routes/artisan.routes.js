const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisan.controller');

// Route pour obtenir tous les artisans (gère la recherche / le filtrage)
// Ex: GET /api/artisans?search=plombier ou GET /api/artisans?category=Bâtiment
router.get('/', artisanController.getAllArtisans);

// Route pour les artisans du mois
// Ex: GET /api/artisans/monthly
router.get('/monthly', artisanController.getMonthlyArtisans);

// Route pour obtenir un artisan spécifique par son ID
// Ex: GET /api/artisans/12
router.get('/:id', artisanController.getArtisanById);

// Route pour le formulaire de contact
// Ex: POST /api/artisans/12/contact
router.post('/:id/contact', artisanController.handleContactForm);


module.exports = router;