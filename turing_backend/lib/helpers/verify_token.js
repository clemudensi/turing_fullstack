const jwt = require('jsonwebtoken');

const verify_token  = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];
    next();
  } else {
    res.sendStatus(403)
  }
};

const secure = (req, res, next) => (
  jwt.verify(req.token, process.env.privateKey, (err, data) => {
    if (err) {
      res.status(401)
        .json({
          msg: 'You are unauthorized to perform this operation'
        })
    } else {
      return next();
    }
  })
);

const secureRoute = (req, res) => (callback) => secure(req, res, callback);

module.exports = {
  verify_token,
  secureRoute
};
