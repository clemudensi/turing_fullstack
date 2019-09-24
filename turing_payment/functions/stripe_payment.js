'use strict';

const stripe = require("stripe")(process.env.stripe_key);

module.exports.stripePay = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let { amount, token } = JSON.parse(event.body);

  stripe.charges.create({
    amount,
    currency: 'usd',
    description: 'Turing Payment',
    source: token,
  })
    .then((charge) => {
      const response = {
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          status: `succeeded`,
          charge,
        }),
      };
      callback(null, response);
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: err.message,
        }),
      };
      callback(null, response);
    })
};
