const { product_location_procedure } = require('../stored_procedures');

module.exports = (sequelize, inProductId) => (sequelize.query(product_location_procedure,
    {
      replacements: {
        inProductId
      }
    }
  )
);