/** product attribute stored procedure*/
const { product_review_procedure } = require('../stored_procedures');

module.exports = (sequelize, product_id) => (
  sequelize.query(product_review_procedure,
    {
      replacements: {
        inProductId: product_id,
      }
    }
  )
);
