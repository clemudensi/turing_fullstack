const { connectToDatabase} = require('../../../config/db');
const Router = require('../../../config/router');


/** GET all Shipping regions  */
Router
  .get('/v1/shipping/regions', async (req, res) => {
    try {
      const { ShippingRegion } = await connectToDatabase();
      const shippingRegions = await ShippingRegion.findAll();
      res.status(200).send(shippingRegions)
    } catch (err) {
      res.send(err)
    }
  });

/* GET all shipping with shipping_region_id ID*/
Router
  .get('/v1/shipping/regions/:shipping_regions_id', async (req, res) => {
    const { shipping_regions_id } = req.params;
    try {
      const { Shipping } = await connectToDatabase();
      const shippingRegion = await Shipping.findAll({
        where: {shipping_regions_id},
      });
      if (!shippingRegion) {
        res.send({ status: 404, msg: `Shipping with id: ${shipping_regions_id} does not exist`});
      } else {
        res.status(200).send(shippingRegion)
      }
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;