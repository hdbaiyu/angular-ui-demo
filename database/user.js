
var mysql = require('mysql');
var config = require('../config')
var conn = mysql.createConnection(config.db);
// conn.connect();

console.log("Initializing the connection pool for MYSQL...");

var Pool = mysql.createPool(config);
module.exports = Pool;
