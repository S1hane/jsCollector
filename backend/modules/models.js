const path = require('path');
const db = require(path.join(__dirname, 'database.js'));
const websocket = require(path.join(__dirname, 'websocket.js'));

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
module.exports.createUser = (terms) => {
  return new Promise((resolve, reject) => {
    db.UserModel.create(terms, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(`Created: ${data}`);
      }
    });
  });
};
module.exports.startWebSocketServer = (port) => {
  return new Promise((resolve, reject) => {
    websocket.httpServer.listen(port, () => {
      resolve(`Websocket server listening on port ${port}`);
    });
  });
};

module.exports.sendWebSocketBroadcastMessage = (message) => {
  return new Promise((resolve, reject) => {
    websocket.connection.sendUTF(message);
    resolve(true);
  });
};
module.exports.sendMessageTovCore = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.vCore.sendUTF !== undefined) {
      websocket.vCore.sendUTF(message);
    }
    resolve(true);
  });
};
module.exports.sendMessageTovDram = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.vDram.sendUTF !== undefined) {
      websocket.vDram.sendUTF(message);
    }
    resolve(true);
  });
};
module.exports.sendMessageToqCode = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.qCode.sendUTF !== undefined) {
      websocket.qCode.sendUTF(message);
    }
    resolve(true);
  });
};
module.exports.sendMessageToClock = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.clock.sendUTF !== undefined) {
      websocket.clock.sendUTF(message);
    }
    resolve(true);
  });
};
module.exports.sendMessageToRatio = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.ratio.sendUTF !== undefined) {
      websocket.ratio.sendUTF(message);
    }
    resolve(true);
  });
}; module.exports.sendMessageToBclk = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.bclk.sendUTF !== undefined) {
      websocket.bclk.sendUTF(message);
    }
    resolve(true);
  });
}; module.exports.sendMessageToTemp = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.temp.sendUTF !== undefined) {
      websocket.temp.sendUTF(message);
    }
    resolve(true);
  });
}; module.exports.sendMessageToFan = (message) => {
  return new Promise((resolve, reject) => {
    if (websocket.fan.sendUTF !== undefined) {
      websocket.fan.sendUTF(message);
    }
    resolve(true);
  });
};
