'use strict';

const optionsSetter = require('./optionsSetter') 
const wheelSpinner = require('./wheelSpinner') 

const SET_COMMAND = "set";
const SPIN_COMMAND = "spin";
const COMMA_SEPARATOR = '%2C';

module.exports.handleInput = (event, context, callback) => {
  const command = extractCommand(event.body);
  if (command.startsWith(SET_COMMAND)) {
    console.log('Set spin options command');
    const options =  command.substring(SET_COMMAND.length + 1, command.length).split(COMMA_SEPARATOR);
    optionsSetter.handleSetOptions(options, callback);
  } else if (command.startsWith(SPIN_COMMAND)) {
    console.log('Spin command');
    wheelSpinner.handleSpinWheel(callback);
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
