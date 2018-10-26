'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const level = sequelize.define('level', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mapa: {
            type: DataTypes.BLOB,
            allowNull: false
        }
    });
    level.associate =  (models) => {
        level.hasMany(models.ibeacon,{
            as: 'levelIbeacon'
        });
    };
    return level;
};