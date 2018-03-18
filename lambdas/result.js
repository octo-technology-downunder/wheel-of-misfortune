'use strict'

const AWS = require('aws-sdk');
const Slack = require('slack-node');

const dynamodb = new AWS.DynamoDB();
const slack = new Slack();

const webhookUri = process.env.SLACK_ENDPOINT;

const COLORS = {
    red: '#EE2A26',
    yellow: '#F8F64C',
    blue: '#1946F2',
    green: '#28B22C',
    purple: '#934AF0',
    orange: '#F57931'
};
const nearestColor = require('nearest-color').from(COLORS);

const DEFAULT_WHEELID = 'default';
const TABLE_NAME = 'wheel-of-missfortune';

function sendSlackMessage (color, title, message, callback) {
  slack.setWebhook(webhookUri);
  slack.webhook({
    channel: 'x_wheel_of_misfortune',
    username: 'Wheel of missfortune',
    icon_emoji: ':english:',
    attachments: [{
      color: color.value,
      title: title,
      text: message
    }]
  }, function (err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      const response = {
        statusCode: 200,
        body: 'Message sent successfully with this color ' + color.name + ' !!',
      };
      callback(null, response);
    }
  });
}

module.exports.colormapping = (event, context, callback) => {
  const hexadecimalColors = event.pathParameters.hexa.split('-');
  const wheelId = event.pathParameters.wheelId || DEFAULT_WHEELID;
  let colorSelection = hexadecimalColors.map(hexa => nearestColor('#'+hexa));
  let firstColor = colorSelection[0];
  colorSelection = colorSelection.map(color => color.name).join('-');
  const params = {
    Key: {'id': {S: wheelId}},
    TableName: TABLE_NAME
  };
  dynamodb.getItem(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    } else {
      var valueChoosen =  data.Item.values.M[colorSelection].S;
      sendSlackMessage(firstColor, valueChoosen, "You have been selected by the wheel of missfortune", callback);
    }
  });
};
