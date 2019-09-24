const { connectToDatabase} = require('../../../config/db');
const Router = require('../../../config/router');


/** handle get all tax  */
Router
  .get('/v1/tax', async (req, res) => {
    try {
      const { Tax } = await connectToDatabase();
      const taxes = await Tax.findAll();
      res.status(200).send(taxes)
    } catch (err) {
      res.send(err)
    }
  });

/* GET tax by ID*/
Router
  .get('/v1/tax/:tax_id', async (req, res) => {
    const { tax_id } = req.params;
    try {
      const { Tax } = await connectToDatabase();
      const tax = await Tax.findOne({
        where: {tax_id},
      });
      if (!tax) {
        res.send({ status: 404, msg: `Tax with id: ${tax_id} does not exist`});
      } else {
        res.status(200).send(tax)
      }
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;