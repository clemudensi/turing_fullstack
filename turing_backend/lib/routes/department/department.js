const { connectToDatabase} = require('../../../config/db');
const Router = require('../../../config/router');


/** handle get all department  */
Router
  .get('/v1/departments', async (req, res) => {
    try {
      const { Department } = await connectToDatabase();
      const getRequests = await Department.findAll();
      res.status(200).send(getRequests)
    } catch (err) {
      res.send(err)
    }
  });


/* handle get a product request*/
Router
  .get('/v1/departments/:department_id', async (req, res) => {
    const { department_id } = req.params;
    try {
      const { Department } = await connectToDatabase();
      const department = await Department.findOne({
        where: {department_id},
      });
      if (!department) {
        res.send({ status: 404, msg: `Department with id: ${department_id} does not exist`});
      } else {
        res.status(200).send(department)
      }
    } catch (err) {
      res.send(err)
    }
  });

module.exports = Router;