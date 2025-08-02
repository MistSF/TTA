const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Specialite = sequelize.define('Specialite', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'specialites',
  timestamps: false
});

module.exports = Specialite;