'use strict'

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();
const colorMapper = require('./colorMapper') 
const slackClient = require('./slackClient')

const DEFAULT_WHEELID = 'default';
const TABLE_NAME = 'wheel-of-missfortune';

module.exports.colormapping = (event, context, callback) => {
  const colorMappings = event.pathParameters.hexa.split('-');
  const wheelId = event.pathParameters.wheelId || DEFAULT_WHEELID;
  let chosenColors = colorMappings.map(colorMapping => colorMapper.getColor(colorMapping));
  let firstColor = chosenColors[0];
  let colorCode = chosenColors.join('-');
  console.log("colors revealed by the wheel are " + chosenColors)
  const params = {
    Key: {'id': {S: wheelId}},
    TableName: TABLE_NAME
  };
  dynamodb.getItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      var valueChoosen =  data.Item.values.M[colorCode].S;
      console.log("Option revealed by color code: " + valueChoosen)
      slackClient.sendSlackMessage(firstColor, valueChoosen, "You have been selected by the wheel of missfortune", callback);
    }
  });
};
