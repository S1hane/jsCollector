

const path = require('path');
const WebSocketClient = require('websocket').client;
const model = require(path.join(__dirname, 'models.js'));
const controller = require(path.join(__dirname, 'controllers.js'));

client = new WebSocketClient();
client.on('connectFailed', (error) => {
  console.log('Connect Error: ' + error.toString());
  setTimeout(model.connectToBackendWebSocket, 3000);
});

client.on('connect', (connection) => {
  console.log('WebSocket connection successful');
  connection.on('error', (error) => {
    console.log('WebSocket connection error: ' + error.toString() + ', will attempt to reconnect.');
    setTimeout(model.connectToBackendWebSocket, 3000);
  });
  connection.on('close', () => {
    console.log('WebSocket connection lost, will attempt to reconnect.');
    setTimeout(model.connectToBackendWebSocket, 3000);
  });
  connection.on('message', (message) => {
    controller.handleIncomingWebSocketMessage(message);
  });
  module.exports.connection = connection;
});
module.exports.client = client;

