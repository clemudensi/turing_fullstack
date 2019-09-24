/** T-shirt shop product API Shopping Cart end-points
 * @params {string} shopping_cart                  - Shopping Cart
 * @params {number} cart_id                        - Cart ID
 * @params {number} item_id                        - Item ID
 * @params {number} inCartId                        - Cart ID
 * @params {number} inProductId                     - Product ID
 * @params {number} inAttributes                    - Attribute ID
 */

const { sequelize} = require('../../../config/db');
const randomstring = require("randomstring");
const Router = require('../../../config/router');
const {
  addToCart,
  cartList,
  emptyCart,
  moveToCart,
  cartTotal,
  saveToCart,
  getFromCart,
  updateCart,
  removeFromCart
} = require('../../helpers/db_procedures/shopping_cart/shopping_cart');

// response when a query returns an empty body
const notFound = (res, type, id) => (
  res.send({ status: 404, msg: `${type} with id: ${id} does not exist or was not found`})
);

// Success response
const success = (res, item, code) => (
  res.status(code).send({ success: true, item })
);

/** GET Generate the unique Cart ID*/
Router
  .get('/v1/shoppingcart/generateUniqueId', async (req, res) => {
    try {
      const uniqueId = await randomstring.generate(12);
      res.status(200).send({ cart_id: uniqueId});
    } catch (err) {
      res.send(err)
    }
  });

/**
 * POST add products to shopping cart using cart ID
 */
Router
  .post('/v1/shoppingcart/add', async (req, res) => {
    const {inCartId, inProductId, inAttributes} = req.body;
    try {
      const shoppingCart = await addToCart(sequelize, inCartId, inProductId, inAttributes);
      await success(res, shoppingCart, 201)
    } catch (err) {
      res.status(500).send(err)
    }
  });

/** GET list of products in shopping cart */
Router
  .get('/v1/shoppingcart/:cart_id', async (req, res) => {
    const {cart_id} = req.params;
    try {
      const shoppingCart = await cartList(sequelize, cart_id);
      if(!cart_id) return notFound(res, 'Cart', cart_id);
      await success(res, shoppingCart, 202);
    } catch (err) {
      res.status(500).send(err)
    }
  });

/* PUT update the product quantity in shopping cart*/
Router
  .put('/v1/shoppingcart/update/:item_id', async (req, res) => {
    const { item_id } = req.params;
    const { inQuantity } = req.body;
    try {
      const shoppingCart = await updateCart(sequelize, item_id, inQuantity);
      // if(!shoppingCart) return notFound(res, 'Item', item_id);
      await success(res, shoppingCart, 202);
    } catch (err) {
      res.send(err)
    }
  });

/** DELETE Empty cart*/
Router
  .delete('/v1/shoppingcart/empty/:cart_id', async (req, res) => {
    const { cart_id } = req.params;
    try {
      const shoppingCart = await emptyCart(sequelize, cart_id);
      if(!shoppingCart) return notFound(res, 'Cart', cart_id);
      await success(res, shoppingCart, 204);
    } catch (err) {
      res.send(err)
    }
  });

/** GET Move a product to cart */
Router
  .get('/v1/shoppingcart/moveToCart/:item_id', async (req, res) => {
    const { item_id } = req.params;
    try {
      const shoppingCart = await moveToCart(sequelize, item_id);
      // if(!shoppingCart) return notFound(res, 'Cart', item_id);
      await success(res, shoppingCart, 200);
    } catch (err) {
      res.send(err)
    }
  });

/* GET return total amount from cart*/
Router
  .get('/v1/shoppingcart/totalAmount/:cart_id', async (req, res) => {
    const { cart_id } = req.params;
    try {
      const totalAmount = await cartTotal(sequelize, cart_id);
      await success(res, totalAmount, 200);
    } catch (err) {
      res.send(err)
    }
  });

/** GET Save a product for latter*/
Router
  .get('/v1/shoppingcart/saveForLater/:item_id', async (req, res) => {
    const { item_id } = req.params;
    try {
      const shoppingCart = await saveToCart(sequelize, item_id);
      await success(res, shoppingCart, 200);
    } catch (err) {
      res.send(err)
    }
  });

/* GET Product saved for later */
Router
  .get('/v1/shoppingcart/getSavedItem/:cart_id', async (req, res) => {
    const { cart_id } = req.params;
    try {
      const getSavedItem = await getFromCart(sequelize, cart_id);
      if(!getSavedItem) return notFound(res, 'Cart', cart_id);
      await success(res, getSavedItem, 200);
    } catch (err) {
      res.send(err)
    }
  });

/** DELETE Remove a product from cart */
Router
  .delete('/v1/shoppingcart/removeProduct/:item_id', async (req, res) => {
    const { item_id } = req.params;
    try {
      const shoppingCart = await removeFromCart(sequelize, item_id);
      if(!shoppingCart) return notFound(res, 'Cart', item_id);
      await success(res, shoppingCart, 204);
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;