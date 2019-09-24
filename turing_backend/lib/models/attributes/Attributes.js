module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING } = DataType;
  return sequelize.define('attribute', {
      attribute_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: STRING
    },
  )
};