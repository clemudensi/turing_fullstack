# **Turing T-shirt Payment and Notification API Service**  
`This app is a node js app, that uses AWS Lambda function to create 
an API service which uses API-Gateway for REST operations. It is packaged 
using webpack and deployed using Serverless.`

To Run app locally
cd into project directory(turing_payment)
* install dependencies using any of the commands 
yarn install or npm install
* yarn offline/npm run offline

Core Stack:
* Node JS
* webpack
* [Serverless](https://serverless.com)
* [ AWS Lambda functions](https://aws.amazon.com/lambda/)
* [API Gateway](https://aws.amazon.com/api-gateway/)

This application Uses AWS Simple Email Service(SES) to send Email notifications.
 Also has allows for payment of an order using stripe payment service
 
# API
https://o72wbo30a5.execute-api.us-east-1.amazonaws.com/dev/api

# Endpoints
`This API service has end-points that allow user to perform the following actions:`

* /v1/stripe/charge - payment using stripe
* /v1/contact/email - Sends confirmation email when an order is created
* /v1/error/email - sends an error report to admin, if an error 
is encountered during checkout
 
For more details see [docs](https://app.swaggerhub.com/apis/udensiclem5/turing-app/1.0.0)

# Testing
The following libraries are used for testing:
* serverless-mocha-plugin
* supertest

#Debugging
The following libraries are used for debugging and testing in dev mode
* Nodemon
* Serverless-offline
