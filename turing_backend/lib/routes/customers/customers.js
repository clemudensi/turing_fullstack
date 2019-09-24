/** T-shirt shop product API Customer end-points
 * @params {string} shopping_cart                  - Shopping Cart
 * @params {number} cart_id                        - Cart ID
 * @params {number} item_id                        - Item ID
 * @params {number} inCartId                        - Cart ID
 * @params {number} inProductId                     - Product ID
 * @params {number} inAttributes                    - Attribute ID
 */

const { connectToDatabase, sequelize } = require('../../../config/db');
const Router = require('../../../config/router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {
  addCustomer,
  getCustomer,
  getCustomerList,
  getShippingRegion,
  updateAccount,
  updateAddress,
  updateCreditCard
} = require('../../helpers/db_procedures/customers/customers');
const login = require('../../helpers/login');
const verifyToken = require('../../helpers/verify_token').verify_token;
const secureRoute = require('../../helpers/verify_token').secureRoute;
// const midWare = require('../../helpers/redis_cache');
// const redisMiddleware = require('../../helpers/app_cache').redisMiddleware;
const salt = bcrypt.genSaltSync(8);

// response when a query returns an empty body
const notFound = (res, type, id) => (
  res.send({ status: 404, msg: `${type} with id: ${id} does not exist or was not found`})
);

// Success response
const success = (res, item, code) => (
  res.status(code).send({ success: true, item})
);

/** POST Create a new customer */
Router
  .post('/v1/customer', async (req, res) => {
    const { inName, inEmail, inPassword } = req.body;
    const { Customer } = await connectToDatabase();
    try {
      const customer = await addCustomer(sequelize, inName, inEmail, bcrypt.hashSync(inPassword, salt));
      if (customer) await login(Customer, res, inEmail, inPassword, bcrypt, jwt);
    } catch (err) {
      if (err.errors[0].message === "idx_customer_email must be unique") return res.json({
        status: 401,
        success: false,
        msg: 'User with the email already exist'
      });
      res.send(err)
    }
  });

/** GET Return a customer */
Router
  .get('/v1/customer', verifyToken, async (req, res) => {
    const { inCustomerId } = req.query;
    try {
      const buildRoute = secureRoute(req, res);
      return  buildRoute(async () => {
        let customer = await getCustomer(sequelize, inCustomerId);
        customer = _.omit(customer[0], 'password');
        await success(res, customer, 200);
      })
    } catch (err) {
      res.send(err)
    }
  });

/** GET Return all customers */
Router
  .get('/v1/customers', async (req, res) => {
    try {
      const customers = await getCustomerList(sequelize);
      await success(res, customers, 200);
    } catch (err) {
      res.send(err)
    }
  });

/** POST customer logs in */
Router
  .post('/v1/customer/login', async (req, res) => {
    const { Customer } = await connectToDatabase();
    const { email, password } = req.body;
    try {
      await login(Customer, res, email, password, bcrypt, jwt);
    } catch (err) {
      res.send(err)
    }
  });

/** GET Return shipping region */
Router
  .get('/v1/customer/shippingRegion', async (req, res) => {
    try {
      const customers = await getShippingRegion(sequelize);
      success(res, customers, 200);
    } catch (err) {
      res.send(err)
    }
  });

/** PUT Update customer address */
Router
  .put('/v1/customer/address', verifyToken, async (req, res) => {
    const { inCustomerId,
            inAddress1,
            inAddress2,
            inCity,
            inRegion,
            inPostalCode,
            inCountry,
            inShippingRegionId
          } = req.body;
    try {
      const buildRoute = secureRoute(req, res);
      return  buildRoute(async () => {
        const customer = await updateAddress(
          sequelize,
          inCustomerId,
          inAddress1,
          inAddress2,
          inCity,
          inRegion,
          inPostalCode,
          inCountry,
          inShippingRegionId
        );
        await success(res, customer, 202);
      })
    } catch (err) {
      res.send(err)
    }
  });

/** PUT Update customer address */
Router
  .put('/v1/customer', verifyToken, async (req, res) => {
    const { inCustomerId,
            inName,
            inEmail,
            inPassword,
            inDayPhone,
            inEvePhone,
            inMobPhone
          } = req.body;
    const password = await bcrypt.hashSync(inPassword, salt);
    try {
      const buildRoute = secureRoute(req, res);
      return buildRoute(async () => {
        const customer = await updateAccount(
          sequelize,
          inCustomerId,
          inName,
          inEmail,
          password,
          inDayPhone,
          inEvePhone,
          inMobPhone
        );
        await success(res, customer, 202);
      })
    } catch (err) {
      res.send(err)
    }
  });

/** PUT Update customer address */
Router
  .put('/v1/customer/creditCard', verifyToken, async (req, res) => {
    const { inCustomerId, inCreditCard } = req.body;
    try {
      const buildRoute = secureRoute(req, res);
      return  buildRoute(async () => {
        const customer = await updateCreditCard(sequelize, inCustomerId, inCreditCard);
        await success(res, customer, 202);
      })
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;