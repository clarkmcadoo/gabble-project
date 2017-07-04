'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    name: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
  },
  );
   
   user.associate = function(models){
    user.hasMany(models.message, {as: "messages", foreignKey: "authorid"});

   }
 
  return user;
};