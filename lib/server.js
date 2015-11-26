/**
 * @file 启动server
 * @author wenber
 */

'use strict';

exports.start = function (port) {
    var connect = require('connect');

    // 一大堆处理器来袭
    var app = connect();
    app.use(require('morgan')('dev'))
        .use(require('./handler/buffer')())
        .use(require('./handler/route')())
        .use(require('./handler/process')())

    // 创建服务
    require('http').createServer(app).listen(port);

    // 异常时重启
    process.on('uncaughtException', function(err) {
        console.error('Error caught in uncaughtException event:', err);
    });

    process.on('exit', function(code) {
        console.log('服务停止,退出code:', code);
    });

    // 启动信息
    var util = require('./util/util');
    var host = 'http://' + util.ip() + ':' + port;
    var chalk = require('chalk');
    console.log(chalk.yellow('fcserver start at = %s'), host);
    console.log(chalk.yellow('serverRoot = %s'), process.cwd());
};
