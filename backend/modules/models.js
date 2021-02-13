const path = require('path');
const db = require(path.join(__dirname, 'database.js'));

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
