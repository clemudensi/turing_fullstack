/** All routes */
const Router = require('../../config/router');
const auth = require('./auth');

Router.use('/',
  ...auth);

module.exports = Router;
