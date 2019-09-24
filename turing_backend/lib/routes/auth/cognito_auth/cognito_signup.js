/** User SignUp
 * @params {string} username                   - user email address
 * @params {string} password                   - user password
 * @params {string} firstName                  - user first name
 * @params {string} lastName                   - user last name
 */

const { cognitoAuthConfig, AmazonCognitoIdentity } = require('../../../helpers/cognito_auth');
const Router = require('../../../../config/router');

const attributeList = [];

/* handle cognito user signup*/
Router
  .post('/v1/user/signup', async (req, res) => {
    const {
      email,
      password,
      firstName,
      lastName
    } = req.body;
    const { userPool } = cognitoAuthConfig(req.body);
    try {
      if (!email) {
        res.json({ success: false, msg: 'ensure to type your email and password.' });
      } else {
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'email', Value: email }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:firstName', Value: firstName }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: 'custom:lastName', Value: lastName }));
        let cognitoUser;

        //sign up method
        await userPool.signUp(email, password, attributeList, null, (err, result) => {
          if (err) {
            res.send(err);
            return;
          }
          cognitoUser = result.user;
          res.send({ username: cognitoUser.getUsername() });
        });
      }
    } catch (err) {
      res.json({ success: false, msg: 'error occurred trying to sign up', err });
    }
  });

module.exports = Router;
