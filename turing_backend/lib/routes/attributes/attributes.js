 /** T-shirt shop product API
 * @params {string} attributes                  - Product attribute
 * @params {number} attribute_id                - Attribute ID
 * @params {number} product_id                  - Product ID
*/

const { connectToDatabase, sequelize} = require('../../../config/db');
const Router = require('../../../config/router');
const product_attribute_procedure = require('../../helpers/db_procedures/products/product_attributes');

// response when a query returns an empty body
const notFound = (res, type, id) => (
  res.send({ status: 404, msg: `${type} with id: ${id} does not exist`})
);

/** GET all attributes */
Router
  .get('/v1/attributes', async (req, res) => {
    try {
      const { Attribute } = await connectToDatabase();
      const attributes = await Attribute.findAll();
      res.status(200).send(attributes)
    } catch (err) {
      res.status(500).send(err)
    }
  });


/* GET attribute using attribute id*/
Router
  .get('/v1/attributes/:attribute_id', async (req, res) => {
    const { attribute_id } = req.params;
    try {
      const { Attribute } = await connectToDatabase();
      const attribute = await Attribute.findOne({
        where: {attribute_id}
      });
      if (!attribute) return await notFound(res, 'attribute', attribute_id)
      res.status(200).send(attribute)
    } catch (err) {
      res.send(err)
    }
  });


/* get a product using product id*/
Router
  .get('/v1/attributes/values/:attribute_id', async (req, res) => {
    const { attribute_id } = req.params;
    try {
      const { AttributeValue } = await connectToDatabase();
      const attribute_values = await AttributeValue.findAll({
        where: {attribute_id},
        attributes: {
          exclude: ['attribute_id']
        }
      });
      res.status(200).send(attribute_values)
    } catch (err) {
      res.send(err)
    }
  });

/* GEt all Attributes with Product ID */
Router
  .get('/v1/attributes/inProduct/:product_id', async (req, res) => {
    const { product_id } = req.params;
    try {
      await connectToDatabase();
      const attribute_values = await product_attribute_procedure(sequelize, product_id);
      if (!attribute_values) return await notFound(res, 'attribute', product_id)
      res.status(200).send(attribute_values)
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;