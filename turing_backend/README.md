# **Turing T-shirt Shop API Service**  
`This app is a node js & Express app, that uses AWS Lambda function to create 
an API service which uses API-Gateway for REST operations. It is packaged 
using webpack and deployed using Serverless.`

To Run app locally
cd into project directory(turing_backend)
* install dependencies using any of the commands 
yarn install or npm install
* yarn offline/npm run offline

Core Stack:
* Node JS and Express
* webpack
* [Serverless](https://serverless.com)
* [ AWS Lambda functions](https://aws.amazon.com/lambda/)
* [API Gateway](https://aws.amazon.com/api-gateway/)

This application allows access to a remote MySQL database hosted on AWS using APIs,
 and [sequelize](https://sequelize.readthedocs.io/en/v3/) for querying the database.
 
# Features
`This API service has end-points that allow user to perform the following actions:`

Create a product with several attributes such as colors, sizes, category and departments.
* A user can create an account
* Login with created account
* Add card details 
* Update address
* A user can create an order
For more details see [docs](https://app.swaggerhub.com/apis/udensiclem5/turing-app/1.0.0)

# Testing
The following libraries are used for testing:
* serverless-mocha-plugin
* supertest

#Debugging
The following libraries are used for debugging and testing in dev mode
* Nodemon
* Serverless-offline
