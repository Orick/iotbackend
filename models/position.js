'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const position = sequelize.define('position', {
        distancia: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
    position.associate =  (models) => {
        position.belongsTo(models.ibeacon);
    };
    return position;
};