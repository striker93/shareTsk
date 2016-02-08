#!/bin/env node

var Express = require('express');
var http = require('http');
var path = require('path');
var app = new Express();
var server = http.createServer(app);
var genConfig = require('./config/config');


var mongoose = require('./config/database').mongoose;
initialize(app);
startWith(genConfig, server);

function initialize(app, mongoose) {
    require('./config/express')(app);
}
function startWith(genConfig, server) {
    server.listen(app.get('port'), genConfig.ipaddress, function () {
        console.log('Listening to ' + genConfig.ipaddress + ':' + app.get('port'));
    });
}
