'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const server = express();
var ejs=require('ejs');
server.engine('html',ejs.__express)
server.set('view engine', 'html');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));

server.use(express.static(path.join(__dirname, 'static')));

server.use(cookieParser());

server.get('/',function(req,res){
  res.render('index');
});


server.use(morgan('dev'));

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// 错误处理
// 开发环镜
if (server.get('env') === 'development') {
  server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: err.message,
      message: err.message,
      error: err
    });
  });

}

// 生产环境错误处理
server.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


server.listen(3000, function() {
  console.info('server start success at port:3000');
});

module.exports = server;
