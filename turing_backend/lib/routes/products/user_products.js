/** T-shirt shop product API
 * @params {string} name                  - Product name
 * @params {string} description           - Product description
 * @params {number} price                 - Product price
 * @params {number} discounted_price      - Product discount price
 * @params {string} image                 - Product Front image
 * @params {string} image_2               - Product back image
 * @params {string} thumbnail             - Product thumbnail
 * @params {number} display               - Product display
 * @params {number} product_id            - product ID
 * @params {number} limit                 - Number of row to return
 * @params {array} order                  - row order options
 * @params {object} where                 - query option
 * @params {Model} Product                - Product Model
 * @params {Model} ProductCategory        - Product Model
 * @params {Model} ProductAttribute       - Product Model
 */

const Sequelize = require('sequelize');
const { connectToDatabase, sequelize} = require('../../../config/db');
const productAssociation = require('../../helpers/db_procedures/products/product_association');
const product_category_procedure = require('../../helpers/db_procedures/products/product_category');
const product_department_procedure = require('../../helpers/db_procedures/products/product_department');
const product_location_procedure = require('../../helpers/db_procedures/products/product_location');
const product_review_procedure = require('../../helpers/db_procedures/products/product_reviews');
const deleteAssociation = require('../../helpers/deleteAssociation');
const Router = require('../../../config/router');
// const passport = require('passport');
const verifyToken = require('../../helpers/verify_token').verify_token;
const secureRoute = require('../../helpers/verify_token').secureRoute;
const {
  category_procedure,
  attribute_value_procedure,
} = require('../../helpers/db_procedures/stored_procedures');
const Op = Sequelize.Op;

/** Create new product */
Router
  .post('/v1/product', verifyToken, (req, res) => {
    const product = req.body;
    const { categories, attributes } = req.body;
    try {
      const buildRoute = secureRoute(req, res);
      return  buildRoute(async () => {
        const { Product } = await connectToDatabase();

        /*Create a product*/
        const { product_id } = await Product.create(
          product,
        );

        /* assign product category and attribute value to product */
        await productAssociation(
          sequelize,
          categories,
          attributes,
          product_id,
          category_procedure,
          attribute_value_procedure
        );

        /*GET product with associations*/
        const productItem = await Product.findOne({
          where: { product_id },
          include: [
            { all: true}
          ]
        });
        res.status(201)
          .send({
            success: true,
            msg: 'Successfully created a product',
            productItem
          })
      })
    } catch (err) {
      res.send(err)
    }
  });

/**
 * GET all products with limit of 20 items returned per page
 * @params {page}                   - query string
 * @params {category}               - query string
 * */

Router
  .get('/v1/products', async (req, res) => {
    const { page, category } = req.query;
    try {
      const { Product, Category, AttributeValue } = await connectToDatabase();
      const products = await Product.findAll(
        { limit: 20, offset: 20*(page - 1),
          include: [
            { model: Category,
              attributes: {
                exclude: ['product_category'],
              },
              where: { name: {  [Op.regexp]: category } },
            },
            { model: AttributeValue, attributes: {
                exclude: ['product_attribute'],
              },}
          ]
        },
      );
      const total = await Product.count({
        include: [
          { model: Category,
            where: { name: {  [Op.regexp]: category } },
          },
        ]
      });
      if (products.length === 0){
        res.status(200).send({ success: true, msg: `No product found for page ${page}`})
      } else {
        res.status(200).send({ products, total })
      }
    } catch (err) {
      res.send(err)
    }
});

/** GET all products */
Router
  .get('/v1/products/all', async (req, res) => {
    try {
      const { Product, Category, AttributeValue } = await connectToDatabase();
      const products = await Product.findAll(
        {
          include: [
            { model: Category,
              attributes: ['name', 'description'],
              through: {
                attributes: []
              }
            },
            { model: AttributeValue,
              attributes: ['value'],
              through: {
                attributes: []
              }
            }
          ],
        },
        );
      res.status(200).send(products)
    } catch (err) {
      res.send(err)
    }
});

/** GET search for products */
Router
  .get('/v1/products/search', async (req, res) => {
    const { searchQuery } = req.query;
    try {
      const { Product, Category } = await connectToDatabase();
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: '%' + searchQuery + '%' } },
            { description: { [Op.like]: '%' + searchQuery + '%' } }
          ]
        },
        include: [
          {
            model: Category,
            attributes: ['name', 'department_id'],
            through: {
              attributes: []
            }
          }
        ]
        });
      res.status(200).send(products)
    } catch (err) {
      res.send(err)
    }
  });

/** GET last product item in a row*/
Router
  .get('/v1/product/last', async (req, res) => {
    try {
      const { Product, Category, AttributeValue } = await connectToDatabase();
      const products = await Product.findAll(
        { limit: 1, order: [
            ['product_id', 'DESC']],
          include: [
            { model: Category},
            { model: AttributeValue }
          ]
        });
      res.status(200).send(products)
    } catch (err) {
      res.send(err)
    }
  });

/** GET first 20 hottest product*/
Router
  .get('/v1/products/hottest', async (req, res) => {
    try {
      const { Product, Category, AttributeValue } = await connectToDatabase();
      const products = await Product.findAll(
        { limit: 20, order: [
            ['likes', 'DESC']],
          include: [
            { model: Category},
            { model: AttributeValue }
          ]
        });
      res.status(200).send(products)
    } catch (err) {
      res.send(err)
    }
  });

/* GET a product using product id*/
Router
  .get('/v1/product/:product_id', async (req, res) => {
    const { product_id } = req.params;
    try {
      const { Product, Category, AttributeValue } = await connectToDatabase();
      const product = await Product.findOne({
        where: {product_id},
        include: [
          {
            model: Category,
            through: {
              attributes: []
            }
          },
          {
            model: AttributeValue,
            through: {
              attributes: []
            }
          }
        ]
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

/* GET a product details using product id*/
Router
  .get('/v1/product/:product_id/details', async (req, res) => {
    const { product_id } = req.params;
    try {
      const { Product } = await connectToDatabase();
      const product = await Product.findOne({
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

/* GET a products using category_id*/
Router
  .get('/v1/products/inCategory/:category_id', async (req, res) => {
    const { category_id } = req.params;
    const {
      inStartItem,
      inProductsPerPage,
      inShortProductDescriptionLength
    } = req.query;
    try {
      const products = await product_category_procedure(
        sequelize,
        category_id,
        inStartItem,
        inProductsPerPage,
        inShortProductDescriptionLength
        );
      if (!products) {
        res.send({ status: 404, msg: `Product with id: ${category_id} does not exist`});
      } else {
        res.status(200).send(products)
      }
    } catch (err) {
      res.send(err)
    }
  });

/* GET a products using department_id*/
Router
  .get('/v1/products/inDepartment/:department_id', async (req, res) => {
    const { department_id } = req.params;
    const {
      inStartItem,
      inProductsPerPage,
      inShortProductDescriptionLength
    } = req.query;
    try {
      const products = await product_department_procedure(
        sequelize,
        department_id,
        inStartItem,
        inProductsPerPage,
        inShortProductDescriptionLength
      );
      if (!products) {
        res.send({ status: 404, msg: `Product with id: ${department_id} does not exist`});
      } else {
        res.status(200).send(products)
      }
    } catch (err) {
      res.send(err)
    }
  });

/* GET location of a product */
Router
  .get('/v1/product/:product_id/locations', async (req, res) => {
    const { product_id } = req.params;
    try {
      const location = await product_location_procedure(
        sequelize,
        product_id
      );
      if (!location) {
        res.send({ status: 404, msg: `Product with id: ${product_id} does not exist`});
      } else {
        res.status(200).send(location)
      }
    } catch (err) {
      res.send(err)
    }
  });

/* GET reviews of a product */
Router
  .get('/v1/product/:product_id/reviews', async (req, res) => {
    const { product_id } = req.params;
    try {
      const products = await product_review_procedure(
        sequelize,
        product_id
      );
      if (!products) {
        res.send({ status: 404, msg: `Product with id: ${product_id} does not exist`});
      } else {
        res.status(200).send(products)
      }
    } catch (err) {
      res.send(err)
    }
  });

/* POST reviews of a product */
Router
  .post('/v1/product/:product_id/reviews', verifyToken, async (req, res) => {
    const product_review = req.body;
    try {
      const buildRoute = secureRoute(req, res);
      return  buildRoute(async () => {
        const { Review } = await connectToDatabase();
        const productReview = await Review.create(
          product_review,
        );
        res.status(201).send(productReview)
      })
    } catch (err) {
      res.send(err)
    }
  });

/* UPDATE exist product using product ID */
Router
  .put('/v1/product/:product_id', async (req, res) => {
    const { product_id } = req.params;
    const product = req.body;
    const { categories, attributes } = product;
    try {
      const { Product } = await connectToDatabase();
      const productItem = await Product.update(
        product,
        { where: {product_id}}
        );

      /* assign product category and attribute value to  product */
      attributes ? await productAssociation(
        sequelize,
        categories,
        attributes,
        product_id,
        category_procedure,
        attribute_value_procedure
      ) : null;
      if (!product) {
        res.send({ status: 403, msg: `There was an error updating Product with id: ${product_id}`});
      } else {
        res.status(202).send({ success: true, msg: 'Successfully updated product',  productItem})
      }
    } catch (err) {
      res.send(err)
    }
  });

/* DELETE product and all associations using product ID */
Router
  .delete('/v1/product/:product_id', async (req, res) => {
    const { product_id } = req.params;
    try {
      const { Product, ProductCategory, ProductAttribute } = await connectToDatabase();

      /* find product form Product model*/
      const productItem = await Product.findOne(
        { where: {product_id}}
      );
      if (!productItem) {
        res.send({ status: 404, msg: `Product with id: ${product_id} does not exist`});
      } else {
        /* remove product form DB */
        await productItem.destroy();

        await deleteAssociation(ProductCategory, product_id);
        await deleteAssociation(ProductAttribute, product_id);

        res.sendStatus(204)
      }
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;
