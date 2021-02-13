const path = require('path');
const errorHandler = require(path.join(__dirname, 'errorHandler.js'));
const model = require(path.join(__dirname, 'models.js'));
const view = require(path.join(__dirname, 'views.js'));
const db = require(path.join(__dirname, 'database.js'));


module.exports.handleAPIrequest = (req, res, next) => {
  let terms = {};
  if (req.params.id) {
    terms = {itemID: parseInt(req.params.id)};
  }
  model.returnAllRecords(terms)
    .then( (result) => {
      view.sendReplyToRequestor(req, res, next, result);
    })
    .catch( e => errorHandler.log( e ) );
};
