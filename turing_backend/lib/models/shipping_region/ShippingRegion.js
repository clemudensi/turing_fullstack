module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING } = DataType;
  return sequelize.define('shipping_region', {
    shipping_region_id: {
      type: INTEGER,
      primaryKey: true,
    },
    shipping_region: STRING
  }, {
    timestamps: false,
    freezeTableName: true
  })
};