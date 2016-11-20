/**
 * Script for mysql connection pool
 *
 * v0.1 - 2016-09 07
 *
 * @author Bai Yu
 */
var mysql = require('mysql');
var config = require('../config/db.js');
console.log("Initializing the connection pool for MYSQL...");

var Pool = mysql.createPool(config);

module.exports = Pool;