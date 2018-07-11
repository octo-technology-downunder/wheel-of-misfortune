'use strict';

const AWS = require('aws-sdk');
const slackClient = require('./slackClient')

const dynamodb = new AWS.DynamoDB();

const COLORS_HEXA = {'red': '#FF0000', 'purple': '#663399', 'blue': '#0000ff', 'green': '#006400', 
  'yellow': '#ffff00', 'orange': '#ff8c00'};
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
  const colors = Object.keys(COLORS_HEXA);
  let mapping = {};
  if (options.length < 1 || options.length > colors * colors.length) {
    return mapping;
  }
  let spinCount = "1";
  let colorKeys = colors;
  if (options.length > colors.length) {
    spinCount = "2";
    colorKeys = [];
    for(let i = 0 ; i < colors.length ; i++) {
      for(let j = 0 ; j < colors.length ; j++) {
        colorKeys.push(colors[i] + "-" + colors[j]);
      }
    } 
  }
  let slackMessage = "";
  const optionDuplicationFactor = Math.floor(colorKeys.length / options.length);
  for (let duplicationNumber = 0 ; duplicationNumber < optionDuplicationFactor ; duplicationNumber++) {
    for(let i = 0 ; i < options.length ; i++){
      let colorIndex = (duplicationNumber  * options.length) + i;
      slackMessage += 'The ' + colorKeys[colorIndex] + ' combination points to ' + options[i] + '\n';
      mapping[colorKeys[colorIndex]] = {S: options[i]};
    }
  }
  mapping[SPIN_COUNT] = {S: spinCount};
  slackClient.sendSlackMessage(COLORS_HEXA['red'], 'New options have been assigned to the Wheel!', slackMessage, undefined);
  console.log('options mapping: ' + JSON.stringify(mapping));
  return mapping;
}
