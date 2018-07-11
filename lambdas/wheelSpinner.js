'use strict';

const https = require('https');
const url = require('url');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();

const WHEEL_URL = process.env.RASPBERRY_ENDPOINT;
const DEFAULT_WHEELID = 'default';
const TABLE_NAME = 'wheel-of-missfortune';
const SPIN_COUNT = 'spinCount';
const COMMA_SEPARATOR = '%2C';

module.exports.handleSpinWheel = (callback) => {
  const params = {
    Key: {'id': {S: DEFAULT_WHEELID}},
    TableName: TABLE_NAME
  };
  dynamodb.getItem(params, function (err, data) {
    if (err) {
      console.log(err);
      let response = {
        statusCode: 200,
        body: JSON.stringify({
          text: 'There was an issue when getting spin count from database :cry:'
        })
      };
      callback(null, response);
    } else {
      const spinCount = data.Item.values.M[SPIN_COUNT].S;
      requestSpinWheel(spinCount, callback)
    }
  });
}

function requestSpinWheel(spinCount, callback) {
  let options = url.parse(WHEEL_URL + spinCount);
  options.method = 'GET';
  let responseBody = '';
  let spinwheelRequest = https.request(options, function(httpResponse) {
    httpResponse.on('data', function(chunk) {
      responseBody += chunk;
    });
    httpResponse.on('end', function(chunk) {
      console.log('Spinning wheel command succeeded');
      let response = {
        statusCode: 200,
        body: JSON.stringify({
          text: responseBody
        })
      };
      callback(null, response);
    });
  });
  spinwheelRequest.on('error', (e) => {
    console.error(e);
    let response = {
      statusCode: 200,
      body: JSON.stringify({
        text: 'The wheel is unreachable right now :cry:'
      })
    };
    callback(null, response);
  });
  spinwheelRequest.end();
}
