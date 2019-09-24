const confirmUser = require('./cognito_auth/cognito_confirm');
const login = require('./cognito_auth/cognito_login');
const resendCode = require('./cognito_auth/cognito_resend_code');
const signUp = require('./cognito_auth/cognito_signup');

module.exports = [confirmUser, login, resendCode, signUp];