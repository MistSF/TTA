const Categorie = require('./categorie.model');
const Specialite = require('./specialite.model');
const Artisan = require('./artisan.model');

// Une Catégorie a plusieurs Spécialités
Categorie.hasMany(Specialite, { foreignKey: 'categorie_id' });
// Une Spécialité appartient à une seule Catégorie
Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id' });

// Une Spécialité a plusieurs Artisans
Specialite.hasMany(Artisan, { foreignKey: 'specialite_id' });
// Un Artisan appartient à une seule Spécialité
Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id' });


// On exporte tous les modèles pour les utiliser facilement
module.exports = {
  Categorie,
  Specialite,
  Artisan
};