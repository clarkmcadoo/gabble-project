'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    content: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
  }
  }, {
    
  });

  like.associate = function(models){
  like.belongsTo(models.user, {as: "liker", foreignKey: "likerid" }),
  // like.belongsTo(models.message, {as: "message", foreignKey: "messageid"})
  like.belongsTo(models.message, {as: "liked", foreignKey: "messageid"})
};

  return like;
};