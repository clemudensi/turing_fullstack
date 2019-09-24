module.exports = (sequelize, DataType) => {
  const { STRING, INTEGER, DATE, BOOLEAN } = DataType;
  return sequelize.define('shopping_cart', {
    item_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cart_id: STRING,
    product_id: INTEGER,
    attributes: STRING,
    quantity: INTEGER,
    buy_now: BOOLEAN,
    added_on: {
      type: DATE,
      defaultValue: new Date()
    }
  })
};