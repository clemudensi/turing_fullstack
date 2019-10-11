const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const multipart = require('aws-lambda-multipart-parser');
global.fetch = require('node-fetch');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': "*",
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Cache-Control,X-Requested-With'
};

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.aws_accessKeyId,
  secretAccessKey: process.env.aws_secretAccessKey,
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

const uploadParams = { Bucket: process.env.S3_BUCKET, Key: '', Body: '' };

/**
 * Define POST route
 * @params {Object} files - Files to uploaded to S3 Bucket
 */

module.exports.uploadImage = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const result = multipart.parse(event, true);
  try {
    uploadParams.Body = result.files["content"];
    const timestamp = Date.now().toString();
    uploadParams.Key = `product_images/${timestamp}-${result.files['filename']}`;
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(err)
        })
      } if (data) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ url: data.Location, status: 'Success' }),
          headers
        })
      }
    });
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(err)
    }
  }
};

module.exports.deleteImage = (event, context, callback) => {
  const { fileName } = JSON.parse(event.body);
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(err)
        })
      } if (data) {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ data, status: 'Success' })
        })
      }
    });
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers
    }
  }
};