require('dotenv').config();
const xlsx = require('xlsx');
const sequelize = require('./config/database');
const { Categorie, Specialite, Artisan } = require('./models'); // Ajustez le chemin si nécessaire

const importData = async () => {
  try {
    // 👇 ÉTAPE 1 : Synchroniser les modèles avec la base de données
    // force: false signifie que les tables ne seront pas supprimées si elles existent déjà.
    console.log('Synchronisation des modèles avec la base de données...');
    await sequelize.sync({ force: false });
    console.log('✅ Synchronisation terminée.');

    // Le reste de votre script est identique
    const workbook = xlsx.readFile('./data/data.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    console.log(`Début de l'importation de ${data.length} artisans...`);

    for (const row of data) {
      const artisanName = row['Nom'];
      const specialiteName = row['Spécialité'];
      const categorieName = row['Catégorie'];
      const noteValue = row['Note'];
      const locationValue = row['Ville'];
      const aboutValue = row['A propos'];
      const emailValue = row['Email'];
      const websiteValue = row['Site Web'];
      const isTopArtisan = row['Top'];

      const [category] = await Categorie.findOrCreate({
        where: { name: categorieName },
      });

      const [specialty] = await Specialite.findOrCreate({
        where: { name: specialiteName },
        defaults: { categorie_id: category.id },
      });

      const [artisan, created] = await Artisan.findOrCreate({
        where: { email: emailValue },
        defaults: {
          name: artisanName,
          note: noteValue,
          location: locationValue,
          about: aboutValue,
          website: websiteValue,
          is_artisan_of_the_month: ['true', '1', 'oui'].includes(String(isTopArtisan).toLowerCase()),
          specialite_id: specialty.id,
        },
      });
      
      if (created) {
        console.log(`✅ Artisan "${artisan.name}" importé avec succès.`);
      } else {
        console.log(`- Artisan "${artisan.name}" (email: ${artisan.email}) existe déjà. ignoré.`);
      }
    }

    console.log('🎉 Importation terminée !');
  } catch (error) {
    console.error('❌ Une erreur est survenue lors de l\'importation :', error);
  } finally {
    // C'est une bonne pratique de fermer la connexion après un script
    await sequelize.close();
  }
};

importData();
