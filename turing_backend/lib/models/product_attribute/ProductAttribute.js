module.exports = (sequelize, DataType) => {
  const { INTEGER } = DataType;
  return sequelize.define('product_attribute', {
    product_id: {
      type: INTEGER,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    attribute_value_id: {
      type: INTEGER,
      primaryKey: true,
      references: {
        model: 'attribute',
        key: 'attribute_value_id'
      }
    },
  })
};