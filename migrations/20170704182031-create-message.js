'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    console.log("sent from the message migration")
    return queryInterface.createTable('messages', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      authorid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",  //actually referring to table
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
    return queryInterface.dropTable('messages');
  }
};