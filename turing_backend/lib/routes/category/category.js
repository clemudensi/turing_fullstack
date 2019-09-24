const { connectToDatabase} = require('../../../config/db');
const Router = require('../../../config/router');


/** get categories*/
Router
  .get('/v1/categories', async (req, res) => {
    try {
      const { Category } = await connectToDatabase();
      const category = await Category.findAll();
      if (!category) {
        res.send({ status: 404, msg: `No category found`});
      } else {
        res.status(200).send(category)
      }
    } catch (err) {
      res.send(err)
    }
  });

/* get category by id*/
Router
  .get('/v1/categories/:category_id', async (req, res) => {
    const { category_id } = req.params;
    try {
      const { Category } = await connectToDatabase();
      const category = await Category.findOne({
        where: {category_id},
      });
      if (!category) {
        res.send({ status: 404, msg: `Category with id: ${category_id} does not exist`});
      } else {
        res.status(200).send(category)
      }
    } catch (err) {
      res.send(err)
    }
  });

/** GET all department  */
Router
  .get('/v1/categories/inProduct/:product_id', async (req, res) => {
    const { product_id } = req.params;
    try {
      const { ProductCategory, Category } = await connectToDatabase();
      const categoryID = await ProductCategory.findOne({
        limit: 1,
        where: {product_id},
      })
      //   .then(async (data) => {
      //   await Category.findOne({
      //     limit: 1,
      //     where: {category_id: data.category_id}
      //   });
      // });
      // console.log(categoryID, 'Category ID')
      const category = await Category.findAll({
        limit: 1,
        where: {category_id: categoryID.category_id},
        attributes: {
          exclude: ['description'],
        }
      });
      res.status(200).send(category)
    } catch (err) {
      res.send(err)
    }
  });


/* GET Categories of a Department */
Router
  .get('/v1/categories/inDepartment/:department_id', async (req, res) => {
    const { department_id } = req.params;
    try {
      const { Category } = await connectToDatabase();
      const category = await Category.findAll({
        where: {department_id},
      });
      if (!category) {
        res.send({ status: 404, msg: `Category with id: ${department_id} does not exist`});
      } else {
        res.status(200).send(category)
      }
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;