/** User SignUp
 * @params {string} username                   - user email address
 * @params {string} password                   - user password
 * @params {string} firstName                  - user first name
 * @params {string} lastName                   - user last name
 */

const { cognitoAuthConfig } = require('../../../helpers/cognito_auth');
const Router = require('../../../../config/router');

const attributeList = [];

/* handle cognito user signup */
Router
  .post('/v1/user/signup', async (req, res) => {
    const cognito = req.body;
    const Auth = cognitoAuthConfig(cognito);
    try {
      if (!req.body.email) {
        res.json({ success: false, msg: 'ensure to type your email and password.' });
      } else {
        attributeList.push(new Auth.AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: cognito.email }));
        attributeList.push(new Auth.AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:firstName', Value: cognito.firstName }));
        attributeList.push(new Auth.AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:lastName', Value: cognito.lastName }));
        let cognitoUser;

        // sign up method
        Auth.userPool
          .signUp(
            cognito.email,
            cognito.password,
            attributeList,
            null,
            (err, result) => {
              if (err) {
                res.send(err);
                return;
              }
              cognitoUser = result.user;
              res.send({ username: cognitoUser.getUsername() });
            },
          );
      }
    } catch (err) {
      res.json({ success: false, msg: 'error occurred trying to sign up', err });
    }
  });

module.exports = Router;
