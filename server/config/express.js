var logger = require('morgan');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var localPath = __dirname;
var config = require('./config.js');
var ejs=require('ejs');

module.exports = function (app) {
    app.set('port', process.env.PORT || config.port || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(localPath,'../views'));
    app.set('view engine', 'html');
    app.use(logger('dev'));
    app.use(express.static(path.join(localPath, '../../dist')));
    require('./route.js')(app);
    require('./fileServer.js')(app);
};