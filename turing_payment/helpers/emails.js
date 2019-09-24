/** AWS SES email notification for Order update status */
/**
 * @param {number} code
 * @param {Object} payload
 * @return payload
 * @return code
 * @param {number} code
 * @param {Object} err
 * @param {String} email
 * @param {String} content
 * @param {String} subject
 */

const aws = require('aws-sdk');

const ses = new aws.SES();
const myDomain = process.env.DOMAIN;

module.exports = {
  generateResponse(code, payload) {
    return {
      statusCode: code,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Cache-Control,X-Requested-With'
      },
      body: JSON.stringify(payload),
    };
  },

  generateError(code, err) {
    return {
      statusCode: err.statusCode || code,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Cache-Control,X-Requested-With'
      },
      body: JSON.stringify({ err, msg: 'Could not deliver Email' }),
    };
  },

  async email(Source, Destination, ReplyEmail, content, subject) {
    const emailParams = {
      Source,
      Destination: { ToAddresses: [Destination] },
      ReplyToAddresses: [ReplyEmail],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `${content}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    };
    return ses.sendEmail(emailParams).promise();
  },
};
