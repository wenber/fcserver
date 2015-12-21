/**
 * @file ws服务端
 * @author wenber
 */

'use strict';
function webSoket(server, app) {
    var WebSocketServer = require('ws').Server;
    var ws = new WebSocketServer({server: server});
    var exec = require('child_process').exec;
    ws.on('connection', function connection(socket) {
        socket.on('message', function message(data, flags) {
            console.log(data);
        });
        socket.on('close', function close() {
            console.log('WebSocket close!');
            exec('rm ' + process.cwd() + '/socket.js', function () {});
        });
        exports.socket = socket;
    });
};

exports.webSoket = webSoket;
