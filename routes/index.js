/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2014 TenX Cloud. All Rights Reserved.
*/
'use strict';
const uuid   = require("node-uuid");
const util = require('../services/requestUtils.js');
const db = require('../database/user');
// var logger = require('../services/loggerUtil.js').getLogger("message");

/*
 * GET home page.
 */
exports.home = function(req, res) {
  let reqData = req.query;
  console.log('ajax',reqData);
  if (reqData.type == 'ajax') {
      var data = {
    'name':'Baiyu',
    'email': 'baiyu@tenxcloud.com',
    'age': '25year',
    'size':'168cm',
    'income':'1000000'
  }
  util.okJsonResponse(data, res);
  return;
  }
   res.sendfile('public/index.html');
   console.log('end data')
};
exports.three = function(req, res) {
   res.sendfile('public/index.html');
};

exports.two = function(req, res) {
  // if(req.path.indexOf('/two')>=0){
  //   res.send("server text");

  // }else{ //angular启动页
  //   res.sendfile('public/index.html');
  // }
  res.sendfile('public/index.html');
};
exports.three = function(req, res) {
   res.sendfile('public/index.html');
};

exports.error = function(req, res) {
  res.sendfile('public/index.html');
};

exports.loading = function(req, res) {
  res.sendfile('public/loading/index')
}

exports.registerForm = function(req, res) {
  res.sendfile('public/index.html')
}
exports.registerSubmit = function (req, res) {
  let data = req.body;
  let method = 'register';
  console.log('database',JSON.stringify(db,null,2));
 let query = db.query('SELECT name FROM users', function(err, result) {
      if (err) {
          connection.release();
          throw err;
      } else {
          connection.release();
          logger.debug(method, "Result: " + JSON.stringify(result));
          if (callback) {
              callback(result);
          }
      }
  });
  util.okJsonResponse(data, res);
}

exports.loginForm = function (req, res) {
 res.sendfile('public/index.html')
}

exports.login = function(req, res) {
  let data = {status:200,data:req.body}
  conn.query('SELECT * from user where name="baiyu"', function(err, result) {
    if (err) throw err;
    console.log(result);
  })

  util.okJsonResponse(data, res);
}