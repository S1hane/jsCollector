const path = require('path');
const controller = require(path.join(__dirname, 'modules', 'controllers.js'));
const model = require(path.join(__dirname, 'modules', 'models.js'));


// -------------------------------
// | Express                     |
// -------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();

const morgan = require('morgan');
app.use(morgan('common', {
  skip: function (req, res) { return req.ip === '::ffff:127.0.0.1'; }, // prohibits logging of docker healthcheck requests
  immediate: true
}));

app.get('/', (req, res) => { // this endpoint responds to docker healthcheck
  res.status(200);
  res.send('Hello.');
});

app.get('/api/:userName/all', controller.handleAPIrequest);
app.get('/api/:userName/:sensorID', controller.handleAPIrequest);
app.post('/api/:userName/:sensorID', controller.handleAPIrequest);

app.put('/api/createUser', jsonParser, controller.handleUserCreation);

app.listen(3001, () => {
  console.log('Express listening at http://localhost:3001');
});

// -------------------------------
// | Websocket                  |
// -------------------------------
model.startWebSocketServer(8080).then(result => console.log(result));
