module.exports = (sequelize, DataType) => {
  const { INTEGER, DATE, TEXT } = DataType;
  return sequelize.define('review', {
    review_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: INTEGER,
    product_id: INTEGER,
    review: TEXT,
    rating: INTEGER,
    created_on: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date()
    },

  })
};