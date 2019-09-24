/** product category stored procedure*/
const { product_department_procedure } = require('../stored_procedures');

module.exports = (
  sequelize,
  inDepartmentId,
  inStartItem,
  inProductsPerPage,
  inShortProductDescriptionLength
) => (sequelize.query(product_department_procedure,
    {
      replacements: {
        inDepartmentId,
        inStartItem,
        inProductsPerPage,
        inShortProductDescriptionLength
      }
    }
  )
);
