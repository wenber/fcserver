/**
 * @file ws服务端
 * @author wenber
 */

'use strict';

module.exports = exports = function (server) {
    var WebSocketServer = require('ws').Server;
    var ws = new WebSocketServer({server: server});
    ws.on('connection', function connection(socket) {
        socket.on('message', function message(data, flags) {
            // flags.binary will be set if a binary data is received. 
            // flags.masked will be set if the data was masked.
        });
        socket.on('close', function close() {
        });
    });
};
