# **Turing T-shirt Auth Service Using AWS Cognito**  
`This app is a node js & Express app, that uses AWS Lambda function to create 
an API service which uses API-Gateway for REST operations. It is packaged 
using webpack and deployed using Serverless.`

To Run app locally
cd into project directory(turing_auth)
* install dependencies using any of the commands 
yarn install or npm install
* yarn offline/npm run offline

Core Stack:
* Node JS
* webpack
* [Serverless](https://serverless.com)
* [ AWS Lambda functions](https://aws.amazon.com/lambda/)
* [API Gateway](https://aws.amazon.com/api-gateway/)

This application is an Authentication system based on AWS cognito.
User details and managed on Cognito
This system allows a user to the following: 

* Create an account using their email
^ Login using account details
* Update account details including password
* Password reset

# Endpoints
`This API service has end-points that allow user to perform the following actions:`

For more details see [docs](https://app.swaggerhub.com/apis/udensiclem5/turing-app/1.0.0)

#Debugging
The following libraries are used for debugging and testing in dev mode
* Nodemon
* Serverless-offline
