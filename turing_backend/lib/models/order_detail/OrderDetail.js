module.exports = (sequelize, DataType) => {
  const { INTEGER, DECIMAL, STRING } = DataType;
  return sequelize.define('order_detail', {
    item_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: INTEGER,
    product_id: INTEGER,
    attributes: STRING,
    product_name: STRING,
    quantity: INTEGER,
    unit_cost: DECIMAL
  })
};