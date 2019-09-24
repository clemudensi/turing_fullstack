const _ = require('lodash');

module.exports = async (Customer, res, email, password, bcrypt, jwt) => (
  await Customer.findOne({
    where: { email }
  })
    .then( async ( user) => {
      if (!user) {
        res.json({
          status: 401,
          success: false,
          msg: 'Authentication failed. User not found.'
        });
      }
      if (user) {
        await bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch && !err) {
            user = _.omit(user.toJSON(), 'password');

            // if user is found and password is right create a token
            const token = jwt.sign(user, process.env.privateKey, {
              expiresIn: '1440m',
            });
            res.setHeader('USER-KEY', ('Bearer ' + token));
            // return the information including token as JSON

            res.status(201).json({
              success: true,
              customer: {
                schema: user,
                accessToken: `Bearer ${token}`,
                expires_in: '24h'
              }
            });
          } else {
            res.json({
              status: 401,
              success: false,
              msg: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    })
);