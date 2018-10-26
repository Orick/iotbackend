'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const place = sequelize.define('place', {
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    place.associate =  (models) => {
        place.hasMany(models.level,{
            as: 'placeLevel'
        });
    };
    return place;
};
