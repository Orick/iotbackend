'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const ibeacon = sequelize.define('ibeacon', {
        id:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        posx: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        posy:{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
    // ibeacon.associate =  (models) => {
    //     ibeacon.hasOne(models.position);
    // };
    return ibeacon;
};