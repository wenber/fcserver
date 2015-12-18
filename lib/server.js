/**
 * @file 启动server
 * @author wenber
 */

'use strict';

module.exports = exports = function (port) {
    var connect = require('connect');
    var config = require('./config');
    var watchFile = require('./util/watchFile');
    var inited = false;
    port = port || config.defaultPort;

    // 一大堆处理器来袭
    var app = connect();
    app.use(require('morgan')('dev'))
        .use(require('./handler/buffer')())
        .use(require('./handler/route')())
        .use(require('./handler/process')())
    // 创建服务
    var server = require('http').createServer(app);
    server.listen(port);
    // webSocket服务
    require('./util/ws').webSoket(server);


    // 启动信息
    var util = require('./util/util');
    var host = 'http://' + util.ip() + ':' + port;
    var chalk = require('chalk');

    console.log(chalk.yellow('fcserver start at = %s'), host);
    console.log(chalk.yellow('serverRoot = %s'), process.cwd());
    // TODO: 已经可以监听服务端文件变动，待推送到客户端
    watchFile();
};
