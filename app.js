/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 2015 TenxCloud. All Rights Reserved.
*/

// Defaults to INFO for development purpose
var level = "INFO";


/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var router = require('./routes');


//override console functions to provide date/time information in the logs and to put console.log to stderr instead of stdout

var console_error = console.error;
console.error = function(){
  var date = new Date();
  console_error.apply(console, ['[', date.toLocaleString(), ']'].concat(Array.prototype.slice.call(arguments)));
};
var console_warn = console.warn;
console.warn = function(){
  var date = new Date();
  console_warn.apply(console, ['[', date.toLocaleString(), ']'].concat(Array.prototype.slice.call(arguments)));
};
var console_info = console.info;
console.info = function(){
  var date = new Date();
  console_info.apply(console, ['[', date.toLocaleString(), ']'].concat(Array.prototype.slice.call(arguments)));
};


/**
 * TODO: Add alert
 *
 * Catch unexpected exceptions.  If we hit one, log it
 * and mark the server as down
 */
// process.on('uncaughtException', function (err) {
//   var method = "uncaughtException";
//   //serverDown = true;
//   logger.error(method, 'Unexpected exception: ' + err);
//   logger.error(method, 'Unexpected exception stack: ' + err.stack);
// });

var favicon = require('express-favicon')
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
global.VIEWSPATH = 'public';

app.use(favicon(path.join(__dirname, '/public/images/favicon.jpg')))
// global.VIEWSPATH = 'views';



app.set('port', 5000);
app.set('host', '0.0.0.0');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate-var'));


app.get('/', router.home);

app.get('/home', router.home);
app.get('/two', router.two);
app.get('/three', router.three);
app.get('/404', router.error);


// Handle 404
app.use(function (req, res) {
  res.status(404);
  res.render('error/index', {code: 404, title: "您访问的页面不存在", loginUser : req.user});
});
// Handle 500
app.use(function (req, res) {
  res.status(500);
  res.render('error/index', {code: 500, title: "服务器异常，请稍候重试", loginUser : req.user});
});
// Handle 503
app.use(function (req, res) {
  res.status(503);
  res.render('error/index', {code: 503, title: "服务不可用，请稍候重试", loginUser : req.user});
});

http.createServer(app).listen(app.get('port'), app.get('host'), function(){
  console.info('Starting http server');
  console.info(app.get('host') + ': server listening on port ' + app.get('port'));
})

