module.exports = (sequelize, DataType) => {
  const { STRING, INTEGER, DECIMAL } = DataType;
  return sequelize.define('product', {
    product_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    description: STRING,
    price: DECIMAL,
    discounted_price: DECIMAL,
    image: STRING,
    image_2: STRING,
    thumbnail: STRING,
    likes: {
      type: INTEGER,
      defaultValue: 0,
    },
    display: INTEGER
  })
};