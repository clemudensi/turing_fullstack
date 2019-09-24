/** product attribute stored procedure*/
const { product_attributes_procedure } = require('../stored_procedures');

module.exports = (sequelize, product_id) => (
  sequelize.query(product_attributes_procedure,
    {
      replacements: {
        inProductId: product_id,
      }
    }
  )
);
