/**
 * @file ws服务端
 * @author wenber
 */

'use strict';
function webSoket(server) {
    var WebSocketServer = require('ws').Server;
    var ws = new WebSocketServer({server: server});
    ws.on('connection', function connection(socket) {
        socket.on('message', function message(data, flags) {
            console.log(data);
        });
        socket.on('close', function close() {
            console.log('WebSocket close!');
        });
        exports.socket = socket;
    });
};

exports.webSoket = webSoket;
