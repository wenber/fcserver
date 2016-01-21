/**
 * @file 启动server
 * @author wenber
 */

'use strict';

module.exports = exports = function (port) {
    var connect = require('connect');
    var config = require('../fcserver-config');
    var watchFile = require('./util/watchFile');
    var morgan = require('morgan');
    var fs = require('fs');
    var FileStreamRotator = require('file-stream-rotator')
    var inited = false;
    var path = require('path');
    port = port || config.defaultPort;

    var logDirectory = path.resolve(__dirname, '../log');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    var accessLogStream = FileStreamRotator.getStream({
        filename: logDirectory + '/access-%DATE%.log',
        frequency: 'daily',
        verbose: false
    });

    // 一大堆处理器来袭
    var app = connect();
    app.use(morgan('dev'))
        .use(morgan('combined', {stream: accessLogStream}))
        .use(require('./handler/buffer')())
        .use(require('./handler/route')())
        .use(require('./handler/process')())
    // 创建服务
    var server;
    if (config.protocol === 'https') {
        server = require('https').createServer(config.tlsOptions, app);
    }
    else {
        server = require('http').createServer(app);
    }
    server.listen(port);
    // webSocket服务
    require('./util/ws').webSoket(server);


    // 启动信息
    var util = require('./util/util');
    var host = config.protocol + '://' + util.ip() + ':' + port;
    var chalk = require('chalk');

    console.log(chalk.yellow('fcserver start at = %s'), host);
    console.log(chalk.yellow('serverRoot = %s'), process.cwd());
    // TODO: 已经可以监听服务端文件变动，待推送到客户端
    watchFile();
};
