const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define('Categorie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: false
});

module.exports = Categorie;