const { connectToDatabase} = require('../../../config/db');
const Router = require('../../../config/router');

/** Create new product request */
Router
  .post('/v1/admin/product/add', async (req, res) => {
    const product = req.body;
    try {
      const { ProductRequest } = await connectToDatabase();

      /*Create products with associations*/
      const product_item = await ProductRequest.create(
        product,
      );

      res.status(201).send(product_item)
    } catch (err) {
      res.send(err)
    }
  });


/** handle get all products request with limit of 20 items returned per page */
Router
  .get('/v1/admin/products', async (req, res) => {
    const { page } = req.query;
    try {
      const { ProductRequest } = await connectToDatabase();
      const getRequests = await ProductRequest.findAll(
        { limit: 20, offset: 20*(page - 1),
        },
      );
      const totalRequest = await ProductRequest.count();
      res.status(200).send(getRequests, totalRequest)
    } catch (err) {
      res.send(err)
    }
  });


/* handle get a product request*/
Router
  .get('/v1/admin/product/:product_id', async (req, res) => {
    const { product_id } = req.params;
    try {
      const { ProductRequest } = await connectToDatabase();
      const product = await ProductRequest.findOne({
        where: {product_id},
      });
      if (!product) {
        res.send({ status: 404, msg: `Product with id: ${product_id} does not exist`});
      } else {
        res.status(200).send(product)
      }
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;