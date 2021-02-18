const path = require('path');
const errorHandler = require(path.join(__dirname, 'errorHandler.js'));
const model = require(path.join(__dirname, 'models.js'));
const view = require(path.join(__dirname, 'views.js'));
const db = require(path.join(__dirname, 'database.js'));

const LIST_OF_VALID_WEBSOCKET_USER_NAMES = {
  pi: true,
  'http://localhost:3000': true,
  'http://localhost:8081': true
};
module.exports.handleAPIrequest = (req, res, next) => {
  let terms = {};
  if (req.params.id) {
    terms = {itemID: parseInt(req.params.id)};
  }
  model.returnAllRecords(terms)
    .then( result => view.sendReplyToRequestor(req, res, next, result))
    .catch( e => view.sendErrorToRequestor( req, res, next, e ) );
};

module.exports.handleUserCreation = (req, res, next) => {
  let terms = {};
  if (req.body.userName) {
    terms = {userName: `${req.body.userName}`};
  }
  model.createUser(terms)
    .then( result => view.sendReplyToRequestor(req, res, next, result))
    .catch( e => view.sendErrorToRequestor( req, res, next, e ) );
};

module.exports.handleIncomingWebSocketMessage = (message) => {
  return new Promise((resolve, reject) => {
    // console.log('WebSocket received message: \'' + (message.utf8Data.slice(3)) + '\'');
    let output = message.utf8Data.slice(3);
    output = JSON.parse(output);
    // model.sendWebSocketBroadcastMessage(JSON.stringify(output));
    model.sendMessageTovCore(JSON.stringify(output.VCORE));
    model.sendMessageTovDram(JSON.stringify(output.VDRAM));
    model.sendMessageToqCode(JSON.stringify(output.QCODE));
    model.sendMessageToClock(JSON.stringify(output.CLOCK));
    model.sendMessageToRatio(JSON.stringify(output.RATIO));
    model.sendMessageToBclk(JSON.stringify(output.BCLK));
    model.sendMessageToTemp(JSON.stringify(output.TEMP));
    model.sendMessageToFan(JSON.stringify(output.FAN));
    resolve(true);
  });
};

module.exports.isThisUserAllowedToCommunicateWithUs = (origin) => {
  if (LIST_OF_VALID_WEBSOCKET_USER_NAMES[origin]) {
    // console.log('Controller authenticated WebSocket user:', origin);
    return true;
  } else {
    return false;
  }
};
