const { Categorie } = require('../models'); // On importe le modèle Categorie

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      order: [['name', 'ASC']]
    });
    
    // Envoie une réponse 200 OK avec la liste des catégories au format JSON
    res.status(200).json(categories);

  } catch (error) {
    // En cas d'erreur serveur, envoie une réponse 500 avec un message d'erreur
    res.status(500).json({ 
      message: "Erreur lors de la récupération des catégories.", 
      error: error.message 
    });
  }
};