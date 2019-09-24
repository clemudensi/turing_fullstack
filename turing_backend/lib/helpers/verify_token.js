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

const secure = (req, res, action) => (
  jwt.verify(req.token, process.env.privateKey, (err, data) => {
    if (err) {
      res.status(401)
        .json({
          msg: 'You are unauthorized to perform this operation'
        })
    } else {
      return action();
    }
  })
);

const secureRoute = (req, res) => (action) => secure(req, res, action);

module.exports = {
  verify_token,
  secureRoute
};
