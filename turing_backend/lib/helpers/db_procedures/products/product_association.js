module.exports = async (
  sequelize,
  categories,
  attributes,
  product_id,
  category_procedure,
  attribute_value_procedure
) => {
  /*update product to category*/
  for(let i =0; i < categories.length; i++){
    await sequelize.query(category_procedure,
      {
        replacements: {
          inProductId: product_id,
          inCategoryId: categories[i],
        }
      }
    );
  }

  /*update attribute value to product*/
  for(let i =0; i < attributes.length; i++){
    await sequelize.query(attribute_value_procedure,
      {
        replacements: {
          inProductId: product_id,
          inAttributeValueId: attributes[i],
        }
      }
    );
  }
};