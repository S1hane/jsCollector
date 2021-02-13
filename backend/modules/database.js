const path = require('path');
const mongoose = require('mongoose');
const errorHandler = require(path.join(__dirname, 'errorHandler.js'));
const Schema = mongoose.Schema;

let databaseURL = 'mongodb://localhost/jscollector';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

if (process.env.NODE_ENV === 'production') {
  databaseURL = process.env.databaseURI;
  options.user = process.env.databaseUser;
  options.pass = process.env.databasePass;
}

const userSchema = {
  _id: Schema.Types.ObjectId,
  userName: {
    type: String,
    minLength: 3,
    maxLength: 16
  },
  sensors: [
    { type: Schema.Types.ObjectId, ref: 'Sensor'}
  ]
};
const sensorSchema = {
  owner: [
    { type: Schema.Types.ObjectId, ref: 'User'}
  ],
  sensorID: {
    type: Number,
    index: true,
    unique: true,
    min: 1,
    max: 1000
  },
  data: Number
};
const UserModel = mongoose.model('user', userSchema);
const SensorModel = mongoose.model('sensor', sensorSchema);


// const logConnectionResult = (error) => {
//   if (error) {
//     console.log('DB Connection Error!', error);
//   } else {
//     UserModel.find({}, (error, data) => {
//       if (error) {
//         console.log('Backend: DB Connection Successful! But got error querying database:', error);
//       } else {
//         console.log('Backend: DB Connection Successful! Found', data.length, 'records in db.');
//       }
//     });
//   }
// };
// mongoose.connection.once('open', logConnectionResult);

mongoose.connection.on('error', (err) => {
  errorHandler.log(err);
});

mongoose.connect(databaseURL, options)
  .catch((error) => {
    console.log('error connecting to database:', error);
  });

module.exports.UserModel = UserModel;
module.exports.SensorModel = SensorModel;
