/** Resend confirmation code to User
 * @params {string} username                   - user email address
 */


const { cognitoAuthConfig } = require('../../../helpers/cognito_auth');
const Router = require('../../../../config/router');

Router
  .post('/v1/cognito/resend-code', async (req, res) => {
    const { cognitoUser } = cognitoAuthConfig(req.body);

    //resend confirmation code method
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send(result);
    });
  });

module.exports = Router;
