const path = require('path');
const model = require(path.join(__dirname, 'models.js'));
const view = require(path.join(__dirname, 'views.js'));
const i2c = require(path.join(__dirname, 'i2c.js'));
const errorHandler = require(path.join(__dirname, 'errorHandler.js'));
const SEND_WEBSOCKET_TEST_MESSAGES = false;
console.log('SEND_WEBSOCKET_TEST_MESSAGES is', SEND_WEBSOCKET_TEST_MESSAGES);

if (SEND_WEBSOCKET_TEST_MESSAGES) {
  setInterval(() => {
    model.webSocketTestMode().catch(error => console.log(error));
  }, 10000);
}

module.exports.handleUserCreationRequest = (req, res, next) => {
  let terms = {};
  if (req.params.id) {
    terms = {userName: req.params.id};
  }
  console.log('terms:', terms);
};

module.exports.handleIncomingWebSocketMessage = (message) => {
  console.log('WebSocket received message: \'' + JSON.stringify(message) + '\'');
};

module.exports.getSensorDataAndSendMessagesToBackend = () => {
  i2c.returnAllSensorValues()
    .then((result) => {
      model.sendWebSocketMessageToBackend(JSON.stringify(result));
    })
    .catch(errorHandler.log);
};
