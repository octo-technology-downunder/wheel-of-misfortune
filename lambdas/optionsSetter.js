'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();

const COLORS = ["red", "purple", "blue", "green", "yellow", "orange"];
const DEFAULT_WHEELID = 'default';
const TABLE_NAME = 'wheel-of-missfortune';
const SPIN_COUNT = 'spinCount';

module.exports.handleSetOptions = (options, callback) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      'id' : {S: DEFAULT_WHEELID},
      'values' : {M: mapOptions(options)}
    }
  };
  storeMapping(params, callback);
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


function mapOptions(options) {
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