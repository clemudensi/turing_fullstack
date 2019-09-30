module.exports = (sequelize, DataType) => {
  const { INTEGER, STRING, TEXT } = DataType;
  return sequelize.define('customer', {
      customer_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      password: STRING,
      name: STRING,
      email: STRING,
      credit_card: TEXT,
      address_1: STRING,
      address_2: STRING,
      region: STRING,
      city: STRING,
      postal_code: STRING,
      country: STRING,
      shipping_region_id: INTEGER,
      day_phone: STRING,
      eve_phone: STRING,
      mob_phone: STRING,
      user_type: STRING,
      access_level: INTEGER
    },
  )
};