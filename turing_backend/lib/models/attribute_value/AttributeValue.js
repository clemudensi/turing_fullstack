module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING } = DataType;
  return sequelize.define('attribute_value', {
    attribute_value_id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    attribute_id: {
      type: INTEGER,
      allowNull: false,
    },
    value: {
      type: STRING,
      allowNull: false,
    }
  });
};