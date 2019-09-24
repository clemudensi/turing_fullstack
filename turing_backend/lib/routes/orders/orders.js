const { connectToDatabase} = require('../../../config/db');
const Router = require('../../../config/router');
const verifyToken = require('../../helpers/verify_token').verify_token;
const secureRoute = require('../../helpers/verify_token').secureRoute;

/** GET all orders*/
Router
  .get('/v1/orders/inCustomer/:inCustomer', verifyToken, async (req, res) => {
    const { inCustomer } = req.params;
    try {
      const buildRoute = secureRoute(req, res);
      return buildRoute(async () => {
        const { Order } = await connectToDatabase();
        const orders = await Order.findAll({
          where: {customer_id: inCustomer},
        });
        if (!orders) {
          res.send({ status: 404, msg: `No order found`});
        } else {
          res.status(200).send(orders)
        }
      })
    } catch (err) {
      res.send(err)
    }
  });

/* get category by id*/
Router
  .get('/v1/orders/:order_id', verifyToken, async (req, res) => {
    const { order_id } = req.params;
    try {
      const buildRoute = secureRoute(req, res);
      return buildRoute(async () => {
        const { Order } = await connectToDatabase();
        const order = await Order.findOne({
          where: {order_id},
        });
        if (!order) {
          res.send({ status: 404, msg: `Order with id: ${order_id} does not exist`});
        } else {
          res.status(200).send(order)
        }
      })
    } catch (err) {
      res.send(err)
    }
  });

/** POST create an order*/
Router
  .post('/v1/orders', verifyToken, async (req, res) => {
    const { Order } = await connectToDatabase();
    const {orders, shipping_id, tax_id} = req.body;
    try {
      const buildRoute = secureRoute(req, res);
      await buildRoute(async() => {
        const createOrder = await Promise.all(orders.map( order => (
          Order.create({
            total_amount: order.salePrice * order.quantity,
            status: 1,
            customer_id: order.customer_id,
            reference: order.reference,
            shipping_id,
            tax_id
          })
        )));
        res.status(201).send({ success: true, createOrder })
      });
    } catch (err) {
      res.send(err)
    }
  });

/* DELETE multiple orders */
Router
  .delete('/v1/orders', verifyToken, async (req, res) => {
    let { order_id } = req.query;
    order_id = JSON.parse(order_id);
    
    try{
      const { Order } = await connectToDatabase();
      const buildRoute = secureRoute(req, res);
      return await buildRoute(async () => {
        const deleteOrders = await Order.destroy({ where: { order_id }});
        res.send({deleteOrders})
      })
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;