const path = require('path');
const model = require(path.join(__dirname, 'models.js'));
const controller = require(path.join(__dirname, 'controllers.js'));
var WebSocketServer = require('websocket').server;
var http = require('http');

var httpServer = http.createServer(function(request, response) {
  console.log('Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

wsServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false
});
module.exports.vCore = false;
module.exports.vDram = false;
module.exports.qCode = false;
module.exports.clock = false;
module.exports.ratio = false;
module.exports.bclk = false;
module.exports.temp = false;
module.exports.fan = false;

const originIsAllowed = (origin) => {
  controller.authenticateWebSocketUser(origin)
    .then((result) => {
      return result;
    });
};

wsServer.on('request', function(request) {
  if (!controller.isThisUserAllowedToCommunicateWithUs(request.origin)) {
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
  if (request.requestedProtocols[0] === 'echo-protocol') {
    var connection = request.accept('echo-protocol', request.origin);
    console.log('echo-protocol connection accepted.');
    connection.on('message', function(message) {
      if (message.type === 'utf8') {
        controller.handleIncomingWebSocketMessage(message);
        // model.sendWebSocketBroadcastMessage(message.utf8Data);
      } else {
        console.log('Websocket received a non-utf8 message! We do not know how to handle these.');
      }
    });
    connection.on('close', function(reasonCode, description) {
      console.log(' echo-protocol peer ' + connection.remoteAddress + ' disconnected.');
    });
    module.exports.connection = connection;
  } else if (request.requestedProtocols[0] === 'listen-vcore') {
    module.exports.vCore = request.accept('listen-vcore', request.origin);
  } else if (request.requestedProtocols[0] === 'listen-vdram') {
    module.exports.vDram = request.accept('listen-vdram', request.origin);
  } else if (request.requestedProtocols[0] === 'listen-qcode') {
    module.exports.qCode = request.accept('listen-qcode', request.origin);
  } else if (request.requestedProtocols[0] === 'listen-clock') {
    module.exports.clock = request.accept('listen-clock', request.origin);
  } else if (request.requestedProtocols[0] === 'listen-ratio') {
    module.exports.ratio = request.accept('listen-ratio', request.origin);
  } else if (request.requestedProtocols[0] === 'listen-bclk') {
    module.exports.bclk = request.accept('listen-bclk', request.origin);
  } else if (request.requestedProtocols[0] === 'listen-temp') {
    module.exports.temp = request.accept('listen-temp', request.origin);
  } else if (request.requestedProtocols[0] === 'listen-fan') {
    module.exports.fan = request.accept('listen-fan', request.origin);
  }
});

module.exports.httpServer = httpServer;
