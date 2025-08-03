const { Artisan, Specialite, Categorie } = require('../models'); // On importe les modèles
const { Op } = require('sequelize'); // On importe les Opérateurs pour la recherche

// Récupérer tous les artisans (avec filtres optionnels)
exports.getAllArtisans = async (req, res) => {
  try {
    const { category, search } = req.query;
    let whereClause = {};

    // Si une recherche est demandée
    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` }; // Recherche partielle sur le nom
    }

    // Si une catégorie est demandée
    const includeOptions = [{
      model: Specialite,
      include: category ? [{
        model: Categorie,
        where: { name: category },
        required: true
      }] : [{ model: Categorie, required: true }],
      required: true
    }];

    const artisans = await Artisan.findAll({ where: whereClause, include: includeOptions });
    res.status(200).json(artisans);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des artisans", error: error.message });
  }
};

// Récupérer un artisan par son ID
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [{ model: Specialite, include: [Categorie] }]
    });
    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }
    res.status(200).json(artisan);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Récupérer les artisans du mois
exports.getMonthlyArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { is_artisan_of_the_month: true },
      limit: 3,
      include: [{ model: Specialite }]
    });
    res.status(200).json(artisans);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


// Gérer le formulaire de contact (simulation)
exports.handleContactForm = async (req, res) => {
  const { name, email, object, message } = req.body;
  const artisanId = req.params.id;
  
  // 1. Valider les données
  if (!name || !email || !object || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  // 2. Récupérer l'email de l'artisan
  const artisan = await Artisan.findByPk(artisanId);
  if (!artisan) {
    return res.status(404).json({ message: "Artisan non trouvé." });
  }
  
  // 3. Envoyer l'email
  console.log(`--- NOUVEAU MESSAGE POUR ${artisan.name} (${artisan.email}) ---`);
  console.log(`De: ${name} <${email}>`);
  console.log(`Objet: ${object}`);
  console.log(`Message: ${message}`);
  console.log('----------------------------------------------------');

  res.status(200).json({ message: "Votre message a bien été envoyé à l'artisan." });
};