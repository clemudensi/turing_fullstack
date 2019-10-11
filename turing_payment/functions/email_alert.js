'use strict';

const SendEmail = require('../helpers/emails');
const emailMessage = require('../helpers/email-confirmation');
/** AWS SES email notification for Order update status */
/**
 * @param {number} code
 * @param {Object} payload
 * @return payload
 * @return code
 * @return {Array} orderItem
 * @param {number} code
 * @param {Object} err
 * @param {String} email
 * @param {String} content
 * @param {String} subject
 */

const myEmail = process.env.EMAIL;

module.exports.orderConfirmation = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const order = JSON.parse(event.body);

  const {
    email,
    orderItem,
    address,
    city,
    state,
    country,
  } = order;

  try {
    const Source = `"Turing T-Shirt Shop" < ${process.env.EMAIL} >`;
    const subject = `Product Order Summary`;
    const emailParams = await SendEmail.email(
      Source,
      email,
      myEmail,
      emailMessage(
        orderItem,
        address,
        city,
        state,
        country,
      ),
      subject,
    );
    return SendEmail.generateResponse(201, emailParams);
  } catch (err) {
    return  SendEmail.generateError(500, err);
  }
};


module.exports.errorReport = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const order = JSON.parse(event.body);

  const {
    error,
  } = order;

  try {
    const Source = `"Turing T-Shirt Shop" < ${process.env.EMAIL} >`;
    const subject = `Error Report`;
    const emailParams = await SendEmail.email(
      Source,
      process.env.ERROR_MAIL,
      myEmail,
      error,
      subject,
    );
    return SendEmail.generateResponse(201, emailParams);
  } catch (err) {
    return  SendEmail.generateError(500, err);
  }
};


module.exports.contactAdmin = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const order = JSON.parse(event.body);

  const {
    firstName,
    lastName,
    email,
    message
  } = order;

  try {
    const Source = `${firstName} ${lastName} < ${process.env.ERROR_MAIL} >`;
    const subject = `Inquiry from Turing`;
    const emailParams = await SendEmail.email(
      Source,
      process.env.EMAIL,
      email,
      message,
      subject,
    );
    return SendEmail.generateResponse(201, emailParams);
  } catch (err) {
    return  SendEmail.generateError(500, err);
  }
};