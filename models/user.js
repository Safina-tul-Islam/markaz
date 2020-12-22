'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,      
      unique: true,
      lowercase: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    }, 
    password:DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};