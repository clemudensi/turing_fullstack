module.exports = (sequelize, DataType) => {
  const { STRING, INTEGER, DECIMAL } = DataType;
  return sequelize.define('product_request', {
    product_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    description: STRING,
    price: DECIMAL,
    discounted_price: DECIMAL,
    color: STRING,
    size: STRING,
    quantity: STRING
  })
};