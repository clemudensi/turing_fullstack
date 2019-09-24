module.exports = (sequelize, DataType) => {
  const { STRING, INTEGER } = DataType;
  return sequelize.define('department', {
    department_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    description: STRING
  })
};