const express = require('express');
const router = express.Router();
const artisanController = require('../controllers/artisan.controller');

// Route pour obtenir tous les artisans
router.get('/', artisanController.getAllArtisans);

// Route pour les artisans du mois
router.get('/monthly', artisanController.getMonthlyArtisans);

// Route pour obtenir un artisan spécifique par son ID
router.get('/:id', artisanController.getArtisanById);

// Route pour le formulaire de contact
router.post('/:id/contact', artisanController.handleContactForm);


module.exports = router;