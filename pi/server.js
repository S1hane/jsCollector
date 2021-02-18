// const i2c = require('i2c-bus');
const path = require('path');
const controller = require(path.join(__dirname, 'modules', 'controllers.js'));
const model = require(path.join(__dirname, 'modules', 'models.js'));
const i2c = require('i2c-bus');
// -------------------------------
// | Express                     |
// -------------------------------

const express = require('express');
const app = express();
const port = 3002;


app.get('/', (req, res) => { // this endpoint responds to docker healthcheck
  res.status(200);
  res.send('Hello from pi.');
});

app.put('/api/createUser/:id', controller.handleUserCreationRequest);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


// -------------------------------
// | Websocket                   |
// -------------------------------
model.connectToBackendWebSocket();
setInterval(controller.getSensorDataAndSendMessagesToBackend, 100);
