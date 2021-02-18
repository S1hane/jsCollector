const path = require('path');
const websocket = require(path.join(__dirname, 'websocket.js'));
const config = require(path.join(__dirname, '..', 'config.js'));

module.exports.returnAllRecords = (terms) => {
  return new Promise((resolve, reject) => {
    db.UserModel.find(terms, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports.connectToBackendWebSocket = () => {
  websocket.client.connect(`ws://${config.backendAddress}:${config.backendPort}/`, 'echo-protocol', 'pi');
};

module.exports.webSocketTestMode = () => {
  return new Promise((resolve, reject) => {
    if (websocket.connection.connected) {
      var number = Math.round(Math.random() * 0xFFFFFF);
      websocket.connection.sendUTF(number.toString());
      resolve('Sent test message.');
    } else {
      reject('Failed to send test message.');
    }
  });
};

module.exports.sendWebSocketMessageToBackend = (content) => {
  return new Promise((resolve, reject) => {
    if (websocket.connection.connected) {
      websocket.connection.sendUTF(`1: ${content}`);
      resolve('Message Sent Successfully.');
    } else {
      reject('Message Failed To Send.');
    }
  });
};
