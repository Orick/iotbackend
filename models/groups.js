'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const groups = sequelize.define('groups', {
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    groups.associate =  (models) => {
        // groups.hasMany(models.place,{
        //     as: 'groupPlace'
        // });
        groups.belongsTo(models.place);
        
        groups.belongsToMany(models.user, {
            through: 'associateUserGroup',
            as : 'userGroup',
            unique: true
        });
    };

    


    return groups;
};
