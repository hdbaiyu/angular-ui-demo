/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2014 TenX Cloud. All Rights Reserved.
*/


var util = require('../services/requestUtils.js');
// var logger = require('../services/loggerUtil.js').getLogger("message");

/*
 * GET home page.
 */
exports.index = function(req, res) {
   res.sendfile('public/index.html');
};
exports.indexPage = function(req, res) {
  var data ={
    'name':'Baiyu',
    'email': 'baiyu@tenxcloud.com',
    'age': '25',
    'size':'168cm',
    'income':'1000000'
  }
  util.okJsonResponse(data, res);

// util.errCodeResponse(err, 500, res);
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
