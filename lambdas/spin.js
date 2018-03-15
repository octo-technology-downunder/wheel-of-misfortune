'use strict';

const https = require('https');
const url = require('url');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();

const COLORS = ["red", "purple", "blue", "green", "yellow", "orange"];
const SET_COMMAND = "set";
const SPIN_COMMAND = "spin";
const WHEEL_URL = process.env.RASPBERRY_ENDPOINT;
const COMMA_SEPARATOR = '%2C';
const DEFAULT_WHEELID = 'default';
const TABLE_NAME = 'wheel-of-missfortune';
const SPIN_COUNT = 'spinCount';

module.exports.spinwheel = (event, context, callback) => {
  const command = extractCommand(event.body);
  if (command.startsWith(SET_COMMAND)) {
    console.log('Set spin options command');
    handleSetOptions(command, callback);
  } else if (command.startsWith(SPIN_COMMAND)) {
    console.log('Spin command');
    handleSpinWheel(callback);
  } else {
    console.log('Unknown command ' + command);
    let response = {
      statusCode: 200,
      body: JSON.stringify({
        text: 'Not a proper wheel-of-missfortune command. Use spin or set option1,option2.'
      })
    };
    callback(null, response);
  }
};

function extractCommand(body) {
  let start = body.indexOf("command=%2Fwheel&text=")+"command=%2Fwheel&text=".length;
  let end = body.indexOf("&response_url");
  return body.substring(start, end);
}

function handleSetOptions(command, callback) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      'id' : {S: DEFAULT_WHEELID},
      'values' : {M: mapOptions(command)}
    }
  };
  storeMapping(params, callback);
}

function mapOptions(command) {
  const options =  command.substring(SET_COMMAND.length + 1, command.length).split(COMMA_SEPARATOR);
  let mapping = {};
  if (options.length < 1 || options.length > COLORS.length * COLORS.length) {
    return mapping;
  }
  let spinCount = "1";
  let colorKeys = COLORS;
  if (options.length > COLORS.length) {
    spinCount = "2";
    colorKeys = [];
    for(let i = 0 ; i < COLORS.length ; i++) {
      for(let j = 0 ; j < COLORS.length ; j++) {
        colorKeys.push(COLORS[i] + "-" + COLORS[j]);
      }
    } 
  }
  const optionDuplicationFactor = Math.floor(colorKeys.length / options.length);
  for (let duplicationNumber = 0 ; duplicationNumber < optionDuplicationFactor ; duplicationNumber++) {
    for(let i = 0 ; i < options.length ; i++){
      let colorIndex = (duplicationNumber  * options.length) + i;
      mapping[colorKeys[colorIndex]] = {S: options[i]};
    }
  }
  mapping[SPIN_COUNT] = {S: spinCount};
  console.log('options mapping: ' + JSON.stringify(mapping));
  return mapping;
}

function storeMapping(value, callback) {
  dynamodb.putItem(value, function(err, data) {
    if (err) {
      let response = {
        statusCode: 200,
        body: JSON.stringify({
          text: 'There was an issue when storing options into database :cry:'
        })
      };
      callback(null, response);
    } else {
      let response = {
        statusCode: 200,
        body: JSON.stringify({
          text: 'The options are set!'
        })
      };
      callback(null, response);
    }
  });
}

function handleSpinWheel(callback) {
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
