'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define("message", {
    content:{

    type: DataTypes.TEXT,
    allowNull: false
  }
  }, 
  
  {}
  );

message.associate = function(models){
  message.belongsTo(models.user, {as: "author", foreignKey: "authorid" }),
  message.hasMany(models.like, { as: "likes", foreignKey: "likeid" });

};
  return message;
};
