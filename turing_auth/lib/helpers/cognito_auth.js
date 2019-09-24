/** Confirm User on cognito
* @params {string} username                   - user email address
* @params {string} confirm_code               - AWS signUp confirmation code
*/

const express = require('express');

const cognitoAction = express.Router();
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');

module.exports.cognitoAuthConfig = async (req) => {
  /* AWS pool data */
  const poolData = {
    UserPoolId: process.env.UserPoolId,
    ClientId: process.env.ClientId,
  };
  const userPool = await new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const userData = {
    Username: req.username || req.email,
    Pool: userPool,
  };

  /* Cognito main function for accessing authentication methods */
  const cognitoUser = await new AmazonCognitoIdentity.CognitoUser(userData);

  /* Auth data - username and password */
  const authenticationData = {
    Username: req.username,
    Password: req.password,
  };
  const authenticationDetails = await new AmazonCognitoIdentity
    .AuthenticationDetails(authenticationData);

  return {
    userPool,
    cognitoUser,
    AmazonCognitoIdentity,
    authenticationDetails,
  };
};


module.exports.cognitoAction = cognitoAction;
