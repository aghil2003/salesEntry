'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vr_no: {
        type: Sequelize.INTEGER
      },
      sr_no: {
        type: Sequelize.INTEGER
      },
      item_code: {
        type: Sequelize.STRING
      },
      item_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      qty: {
        type: Sequelize.DECIMAL
      },
      rate: {
        type: Sequelize.DECIMAL
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_tables');
  }
};