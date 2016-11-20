var config = require('../config.js');

var database = {
  // Read from environment variables
  production: {
  },
  staging: {
    //aliyun, outer network for testing
    connectionLimit: 200,
    connectTimeout: 10000,
    host: "101.200.150.141",
    user: "admin",
    password: "",
    database: ""
  },
  developer: {
    // inter network for testing
    connectionLimit: 200,
    connectTimeout: 10000,
    host: "127.0.0.1",
    user: "root",
    password: "admin888",
    database: "ngblog"
  }
}

if (config.production === true) {
  module.exports = database.production;
} else if (config.staging === true) {
  module.exports = database.staging;
} else {
  module.exports = database.developer;
}