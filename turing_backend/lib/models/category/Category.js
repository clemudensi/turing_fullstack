module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING } = DataType;
  return sequelize.define('category', {
    category_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_id: INTEGER,
    name: STRING,
    description: STRING
  });
};