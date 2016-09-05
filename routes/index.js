/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2014 TenX Cloud. All Rights Reserved.
*/


var util = require('../services/requestUtils.js');
// var logger = require('../services/loggerUtil.js').getLogger("message");

/*
 * GET home page.
 */
exports.home = function(req, res) {
  var reqData = req.query;
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
  console.log('req.query',req.body.user);
  console.log('req.',req.body.password);
}

exports.loginForm = function (req, res) {
 res.sendfile('public/index.html')
}