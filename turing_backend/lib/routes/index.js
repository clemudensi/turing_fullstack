/** All routes */

const Router = require('../../config/router');
const products = require('./products');
const auth = require('./auth');
const department = require('./department/department');
const category = require('./category/category');
const attributes = require('./attributes/attributes');
const orders = require('./orders/orders');
const shipping = require('./shipping/shipping');
const shopping_cart = require('./shopping_cart/shopping_cart');
const tax = require('./tax/tax');
const customer = require('./customers/customers');

Router.use(
  ...products,
  ...auth,
  department,
  category,
  attributes,
  orders,
  shipping,
  shopping_cart,
  tax,
  customer,
  );

module.exports = Router;
