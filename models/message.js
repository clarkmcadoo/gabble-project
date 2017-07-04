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
  messages.belongsTo(models.user, {as: "author", foreignKey: "authorid" });
}
  return message;
};