const i2c = require('i2c-bus');
let get = {};

get.promiseToReadByte = (byte) => {
  return new Promise((resolve, reject) => {
    i2c.openPromisified(1)
      .then(bus => bus.readByte(0x4A, byte)
        .then(rawData => {
          // console.log('returning:', rawData, 'for byte:', byte);
          resolve(rawData);
        })
        .catch(console.log)
      );
  });
};

get.generatePromiseArray = (addresses) => {
  let output = [];
  for (let i = 0; i < addresses.length; i++) {
    output.push(get.promiseToReadByte(addresses[i]));
  }
  return output;
};

get.calculateVoltage = (addresses) => {
  return new Promise((resolve, reject) => {
    const vDiv1 = 1.28;
    const vDiv2 = 0.005;
    let promiseArray = get.generatePromiseArray(addresses);
    Promise.all(promiseArray)
      .then((results) => {
        resolve(((results[0] * vDiv1) + (results[1] * vDiv2)).toFixed(3));
      });
  });
};

get.calculateFanSpeed = (addresses) => {
  return new Promise((resolve, reject) => {
    let promiseArray = get.generatePromiseArray(addresses);
    Promise.all(promiseArray)
      .then((results) => {
        resolve(((results[0] << 8) | (results[1])));
      });
  });
};

get.generateValue = (address) => {
  return new Promise((resolve, reject) => {
    get.promiseToReadByte(address)
      .then((result) => {
        resolve(result);
      });
  });
};

get.calculateCpuClockSpeed = (addresses) => {
  return new Promise((resolve, reject) => {
    const vDiv1 = 25.6;
    const vDiv2 = 0.1;
    let promiseArray = get.generatePromiseArray(addresses);
    Promise.all(promiseArray)
      .then((results) => {
        resolve((results[0] * ((results[1] * vDiv1) + (results[2] * vDiv2))).toFixed(0));
      });
  });
};

get.calculateBusClockSpeed = (addresses) => {
  return new Promise((resolve, reject) => {
    const vDiv1 = 25.6;
    const vDiv2 = 0.1;
    let promiseArray = get.generatePromiseArray(addresses);
    Promise.all(promiseArray)
      .then((results) => {
        resolve(((results[0] * vDiv1) + (results[1] * vDiv2)).toFixed(2));
      });
  });
};

var Sensors = function() {
  var newSensors = {};
  var values = {};
  newSensors.update = () => {
    get.generateValue(0x10)
      .then((result) => {
        values.QCODE = result;
      });
    get.calculateCpuClockSpeed([0x20, 0x28, 0x29])
      .then((result) => {
        values.CLOCK = result;
      });
    get.generateValue(0x20)
      .then((result) => {
        values.RATIO = result;
      });
    get.calculateBusClockSpeed([0x28, 0x29])
      .then((result) => {
        values.BCLK = result;
      });
    get.calculateVoltage([0x40, 0x41])
      .then((result) => {
        values.VCORE = result;
      });
    get.calculateVoltage([0x48, 0x49])
      .then((result) => {
        values.VDRAM = result;
      });
    get.generateValue(0x50)
      .then((result) => {
        values.TEMP = result;
      });
    get.calculateFanSpeed([0x60, 0x61])
      .then((result) => {
        values.FAN = result;
      });
  };
  newSensors.getValues = () => {
    return values;
  };
  return newSensors;
};

var mySensors = Sensors();

setInterval(() => {
  mySensors.update();
}, 100);

module.exports.returnAllSensorValues = () => {
  return new Promise((resolve, reject) => {
    resolve(mySensors.getValues());
  });
};
