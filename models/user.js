'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    user.associate =  (models) => {
        // user.hasMany(models.groups,{
        //     as: 'userGroups'
        // });
        user.hasMany(models.position,{
            as: 'userPosition'
        });

        user.belongsToMany(models.groups, {
            through: 'associateUserGroup',
            as : 'userGroup',
            unique: true
        });
    };
    return user;
};
