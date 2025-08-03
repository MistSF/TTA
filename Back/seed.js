require('dotenv').config();
const xlsx = require('xlsx');
const { Categorie, Specialite, Artisan } = require('./models'); 

const importData = async () => {
  try {
    const workbook = xlsx.readFile('./data/data.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    console.log(`Début de l'importation de ${data.length} artisans...`);

    for (const row of data) {
      // --- 1. Récupération des données de la ligne ---
      const artisanName = row['Nom'];
      const specialiteName = row['Spécialité'];
      const categorieName = row['Catégorie'];
      const noteValue = row['Note'];
      const locationValue = row['Ville'];
      const aboutValue = row['A propos'];
      const emailValue = row['Email'];
      const websiteValue = row['Site Web'];
      const isTopArtisan = row['Top'];

      // --- 2. Création ou recherche des entrées liées (Catégorie, Spécialité) ---
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
  }
};

importData();