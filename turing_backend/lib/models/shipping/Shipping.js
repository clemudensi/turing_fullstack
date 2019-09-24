module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING } = DataType;
  return sequelize.define('shipping', {
    shipping_id: {
      type: INTEGER,
      primaryKey: true,
    },
    shipping_type: STRING,
    shipping_cost: INTEGER,
    shipping_region_id: INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  })
};

