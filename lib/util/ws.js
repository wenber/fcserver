/**
 * @file ws服务端
 * @author wenber
 */

'use strict';
function webSoket(server, app) {
    var WebSocketServer = require('ws').Server;
    var ws = new WebSocketServer({server: server});
    var exec = require('child_process').exec;
    var timer = 0;
    ws.on('connection', function connection(socket) {
        socket.on('message', function message(data, flags) {
            console.log(data);
            clearTimeout(timer);
        });
        socket.on('close', function close() {
            console.log('WebSocket close!');
            // 这个地方必须延时后去删除，否则，刷新时就会删除，造成文件找不到
            timer = setTimeout(function () {
                exec('rm ' + process.cwd() + '/socket.js', function () {});
            }, 5000);
        });
        exports.socket = socket;
    });
};

exports.webSoket = webSoket;
