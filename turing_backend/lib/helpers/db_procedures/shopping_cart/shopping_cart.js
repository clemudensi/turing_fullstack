/** Shopping cart procedures */
const {
  shopping_cart_add_procedure,
  shopping_cart_list_procedure,
  shopping_cart_empty_procedure,
  shopping_cart_move_procedure,
  shopping_cart_total_procedure,
  shopping_cart_get_procedure,
  shopping_cart_remove_procedure,
  shopping_cart_save_procedure,
  shopping_cart_update_procedure
} = require('../stored_procedures');

module.exports.addToCart = (sequelize, inCartId, inProductId, inAttributes) => (
  sequelize.query(shopping_cart_add_procedure,
    {
      replacements: {
        inCartId,
        inProductId,
        inAttributes
      }
    }
  )
);

module.exports.cartList = (sequelize, inCartId) => (
  sequelize.query(shopping_cart_list_procedure,
    {
      replacements: {
        inCartId
      }
    }
  )
);

module.exports.emptyCart = (sequelize, inCartId) => (
  sequelize.query(shopping_cart_empty_procedure,
    {
      replacements: {
        inCartId
      }
    }
  )
);

module.exports.moveToCart = (sequelize, inItemId) => (
  sequelize.query(shopping_cart_move_procedure,
    {
      replacements: {
        inItemId
      }
    }
  )
);

module.exports.cartTotal = (sequelize, inCartId) => (
  sequelize.query(shopping_cart_total_procedure,
    {
      replacements: {
        inCartId
      }
    }
  )
);

module.exports.saveToCart = (sequelize, inItemId) => (
  sequelize.query(shopping_cart_save_procedure,
    {
      replacements: {
        inItemId
      }
    }
  )
);

module.exports.getFromCart = (sequelize, inCartId) => (
  sequelize.query(shopping_cart_get_procedure,
    {
      replacements: {
        inCartId
      }
    }
  )
);

module.exports.updateCart = (sequelize, inItemId, inQuantity) => (
  sequelize.query(shopping_cart_update_procedure,
    {
      replacements: {
        inItemId,
        inQuantity
      }
    }
  )
);

module.exports.removeFromCart = (sequelize, inItemId) => (
  sequelize.query(shopping_cart_remove_procedure,
    {
      replacements: {
        inItemId
      }
    }
  )
);