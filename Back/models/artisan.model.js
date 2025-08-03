const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  name: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.FLOAT },
  location: { type: DataTypes.STRING },
  about: { type: DataTypes.TEXT },
  website: { type: DataTypes.STRING },
  image_url: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false },
  is_artisan_of_the_month: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'artisans',
  timestamps: true
});

module.exports = Artisan;