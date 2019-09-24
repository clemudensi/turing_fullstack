/** product category stored procedure*/
const { product_category_procedure } = require('../stored_procedures');

module.exports = (
                  sequelize,
                  inCategoryId,
                  inStartItem,
                  inProductsPerPage,
                  inShortProductDescriptionLength
) => (sequelize.query(product_category_procedure,
    {
      replacements: {
          inCategoryId,
          inStartItem,
          inProductsPerPage,
          inShortProductDescriptionLength
      }
    }
  )
);
