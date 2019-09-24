const Sequelize = require('sequelize');

module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING, DATE } = DataType;
  return sequelize.define('orders', {
    order_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_amount: INTEGER,
    created_on: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    shipped_on: DATE,
    status: INTEGER,
    comments: STRING,
    customer_id: INTEGER,
    auth_code: STRING,
    reference: STRING,
    shipping_id: INTEGER,
    tax_id: INTEGER
  });
};