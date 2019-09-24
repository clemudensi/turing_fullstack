module.exports = (sequelize, DataType) => {
  const { INTEGER } = DataType;
  return sequelize.define('product_details', {
    product_id: {
      type: INTEGER,
      primaryKey: true,
    },
    category_id: {
      type: INTEGER,
      primaryKey: true,
    },
    attribute_id: {
      type: INTEGER,
      primaryKey: true,
    }
  });
}