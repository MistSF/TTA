const { Categorie } = require('../models'); // On importe le modèle Categorie

/**
 * Récupère toutes les catégories de la base de données.
 * @param {object} req - L'objet de la requête Express.
 * @param {object} res - L'objet de la réponse Express.
 */
exports.getAllCategories = async (req, res) => {
  try {
    // Utilise la méthode findAll de Sequelize pour obtenir toutes les entrées de la table des catégories
    const categories = await Categorie.findAll({
      order: [['name', 'ASC']] // Trie les catégories par ordre alphabétique
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