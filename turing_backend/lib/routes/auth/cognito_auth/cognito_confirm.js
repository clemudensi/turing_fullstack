/** Confirm User on cognito
* @params {string} username                   - user email address
* @params {string} confirm_code               - AWS signUp confirmation code
*/

const { cognitoAuthConfig } = require('../../../helpers/cognito_auth');
const Router = require('../../../../config/router');

Router
  .post('/v1/user/confirm', async (req, res) => {
    const { cognitoUser } = cognitoAuthConfig(req.body);

    //Cognito confirm code method which triggers a confirmation code to complete the signUp process
    const {confirmCode} = req.body;
    await cognitoUser.confirmRegistration(confirmCode, true, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      res.send(result);
    });
  });

module.exports = Router;
