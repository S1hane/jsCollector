let backendAddress = 'YOUR_SERVER_IP_GOES_HERE';
let backendPort = 'YOUR_SERVER_PORT_GOES_HERE';
let backendUser = 'YOUR_SERVER_USERNAME';
let backendPass = 'YOUR_SERVER_PASSWORD';

if (process.env.NODE_ENV === 'development') {
  backendAddress = process.env.backendAddress;
  backendPort = process.env.backendPort;
  backendUser = process.env.backendUser;
  backendPass = process.env.backendPass;
}

module.exports.backendAddress = backendAddress;
module.exports.backendPort = backendPort;
module.exports.backendUser = backendUser;
module.exports.backendPass = backendPass;
