/** Confirm User on cognito
* @params {string} username                   - user email address
* @params {string} confirm_code               - AWS signUp confirmation code
*/

const express = require('express');

const cognitoAction = express.Router();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

module.exports.cognitoAuthConfig = (req) => {

  /* AWS pool data */
  const poolData = {
    UserPoolId: process.env.UserPoolId,
    ClientId: process.env.ClientId,
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const userData = {
    Username: req.email,
    Pool: userPool,
  };

  /* Cognito main function for accessing authentication methods */
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  /* Auth data - username and password */
  const authenticationData = {
    Username: req.username,
    Password: req.password,
  };
  const authenticationDetails = new AmazonCognitoIdentity
    .AuthenticationDetails(authenticationData);

  return {
    userPool,
    cognitoUser,
    authenticationDetails
  }
};

module.exports.AmazonCognitoIdentity = AmazonCognitoIdentity;
module.exports.cognitoAction = cognitoAction;