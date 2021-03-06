/** User authentication generating JWT
 * @params {string} username                   - user email address
 * @params {string} password                   - user password
 * @return {string} idToken                    - JSON web token with Bearer prefix
 */

const { cognitoAuthConfig } = require('../../../helpers/cognito_auth');
const Router = require('../../../../config/router');
global.fetch = require('node-fetch');

Router
  .post('/v1/user/login', async (req, res) => {
    // cognito function to access methods
    const Auth = await cognitoAuthConfig(req.body);

    await Auth.cognitoUser.authenticateUser(Auth.authenticationDetails, {
      onSuccess(result) {
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when
         passing through an Authorization Header to an API Gateway Authorizer */
        const idToken = result.idToken.jwtToken;
        console.log(idToken, 'Token')

        // Set header token with USER-KEY
        res.setHeader('USER-KEY', (idToken));

        /* return the information including token as JSON */
        res.send({
          success: true, idToken: `Bearer ${idToken}`,
        });
      },
      onFailure(err) {
        res.send(err);
      },

    });
  });

module.exports = Router;
