const path = require('path');
const controller = require(path.join(__dirname, 'modules', 'controllers.js'));
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3001;

const morgan = require('morgan');
app.use(morgan('common', {
  skip: function (req, res) { return req.ip === '::ffff:127.0.0.1'; }, // prohibits logging of docker healthcheck requests
  immediate: true
}));

app.get('/', (req, res) => { // this endpoint responds to docker healthcheck
  res.status(200);
  res.send('Hello.');
});

// routers
app.get('/api/:userName/all', controller.handleAPIrequest);
app.get('/api/:userName/:sensorID', controller.handleAPIrequest);

// body-parser
app.use(bodyParser.json());

app.put('/api/:userName', controller.handleAPIrequest);
app.post('/api/:userName/:sensorID', controller.handleAPIrequest);

// listeners
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
