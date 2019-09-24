const procedures = {
  category_procedure: 'CALL catalog_assign_product_to_category(:inProductId, :inCategoryId)',
  attribute_value_procedure: 'CALL catalog_assign_attribute_value_to_product(:inProductId, :inAttributeValueId)',
  product_attributes_procedure: 'CALL catalog_get_product_attributes(:inProductId)',
  product_category_procedure:
    'CALL catalog_get_products_in_category(:inCategoryId, :inStartItem, :inProductsPerPage, :inShortProductDescriptionLength)',
  product_department_procedure: 'CALL catalog_get_products_on_department(:inDepartmentId, :inStartItem, :inProductsPerPage, :inShortProductDescriptionLength)',
  product_location_procedure: 'CALL catalog_get_product_locations(:inProductId)',
  product_review_procedure: 'CALL catalog_get_product_reviews(:inProductId)',

  /** Shopping Cart Procedure*/
  shopping_cart_add_procedure: 'CALL shopping_cart_add_product(:inCartId, :inProductId, :inAttributes)',
  shopping_cart_list_procedure: 'CALL shopping_cart_get_products(:inCartId)',
  shopping_cart_empty_procedure: 'CALL shopping_cart_empty(:inCartId)',
  shopping_cart_move_procedure: 'CALL shopping_cart_move_product_to_cart(:inItemId)',
  shopping_cart_total_procedure: 'CALL shopping_cart_get_total_amount(:inCartId)',
  shopping_cart_save_procedure: 'CALL shopping_cart_save_product_for_later(:inItemId)',
  shopping_cart_get_procedure: 'CALL shopping_cart_get_saved_products(:inCartId)',
  shopping_cart_update_procedure: 'CALL shopping_cart_update(:inItemId, :inQuantity)',
  shopping_cart_remove_procedure: 'CALL shopping_cart_remove_product(:inItemId)',

  /** Customer Procedures*/
  customer_add_procedure: 'CALL customer_add(:inName, :inEmail, :inPassword)',
  customer_get_procedure: 'CALL customer_get_customer(:inCustomerId)',
  customer_get_list_procedure: 'CALL customer_get_customers_list',
  customer_get_shipping_regions_procedure: 'CALL customer_get_shipping_regions',
  customer_update_account_procedure: 'CALL customer_update_account(:inCustomerId, :inName, :inEmail, :inPassword, :inDayPhone, :inEvePhone, :inMobPhone)',
  customer_update_address_procedure: 'CALL customer_update_address(:inCustomerId, :inAddress1, :inAddress2, :inCity, :inRegion, :inPostalCode, :inCountry, :inShippingRegionId)',
  customer_update_credit_card_procedure: 'CALL customer_update_credit_card(:inCustomerId, :inCreditCard)',
};

module.exports = procedures;