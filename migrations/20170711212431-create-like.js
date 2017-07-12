'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.BOOLEAN
      },
      likerid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",  //actually referring to table
          key: "id"
        }
      },
      messageid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "message",  //actually referring to table
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('likes');
  }
};