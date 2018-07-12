'use strict'

const Slack = require('slack-node');
const webhookUri = process.env.SLACK_ENDPOINT;
const slack = new Slack();

module.exports.sendSlackMessage = (sideColor, title, message, callback) => {
  console.log('slack uri is ' + webhookUri);
  slack.setWebhook(webhookUri);
  slack.webhook({
    channel: '0_general',
    username: 'Wheel of missfortune',
    icon_emoji: ':see_no_evil:',
    attachments: [{
      color: sideColor,
      title: title,
      text: message
    }]
  }, function (err) {
    if (err) {
      console.log(err);
      if (callback) {
        callback(err);
      }
    } else {
      const response = {
        statusCode: 200,
        body: 'Message sent successfully with this color ' + sideColor + ' !!',
      };
      if (callback) {
        callback(null, response);
      }
    }
  });
}
