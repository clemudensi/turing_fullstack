module.exports = (sequelize, DataType) => {
  const { INTEGER } = DataType;
  return sequelize.define('product_review', {
    product_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });
};