/*
* Licensed Materials - Property of tenxcloud.com
* (C) Copyright 201 hdbaiyu. All Rights Reserved.
*/

'use strict'
let level = "INFO";


/**
 * Module dependencies.
 */
const express = require('express');
const http = require('http');
const path = require('path');
const router = require('./routes');
const fs = require('fs')
const config = require('./config');
const bodyParser = require('body-parser');
//override console functions to provide date/time information in the logs and to put console.log to stderr instead of stdout

const favicon = require('express-favicon')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
global.VIEWSPATH = 'public';

app.use(favicon(path.join(__dirname, '/public/images/favicon.jpg')))
// global.VIEWSPATH = 'views';

app.set('port', config.port);
app.set('host', config.host);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate-var'));


app.get('/', router.home);

app.get('/home', router.home);
app.get('/two', router.two);
app.get('/three', router.three);
app.get('/404', router.error);
app.get('/loading',router.loading)
app.get('/register',router.registerForm)
app.post('/register',router.registerSubmit)
app.get('/login',router.loginForm)
app.post('/login',router.login)
http.createServer(app).listen(app.get('port'), app.get('host'), function(){
  console.info('Starting http server');
  console.info(app.get('host') + ': server listening on port ' + app.get('port'));
})

