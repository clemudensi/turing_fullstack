/** Resend confirmation code to User
 * @params {string} username                   - user email address
 */


const { cognitoAuthConfig } = require('../../../helpers/cognito_auth');
const Router = require('../../../../config/router');
global.fetch = require('node-fetch');

Router
  .post('/v1/cognito/resend-code', async (req, res) => {
    // resend confirmation code method
    cognitoAuthConfig(req.body)
      .cognitoUser
      .resendConfirmationCode(
        (err, result) => {
          if (err) {
            res.send(err);
            return;
          }
          res.send(result);
        },
      );
  });

module.exports = Router;
