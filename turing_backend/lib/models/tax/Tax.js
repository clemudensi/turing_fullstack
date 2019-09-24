module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING } = DataType;
  return sequelize.define('tax', {
    tax_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    percentage: INTEGER,
    tax_type: STRING
  });
};