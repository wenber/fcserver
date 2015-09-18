/**
 * @file 启动server
 * @author wenber
 */

'use strict';

exports.start = function () {
    var config = require('./config');
    var connect = require('connect');

    // 一大堆处理器来袭
    var app = connect();
    app.use(require('morgan')('dev'))
        .use(require('./handler/buffer')());

    // 创建服务
    require('http').createServer(app).listen(config.port);

    // 启动信息
    var util = require('./util');
    var host = 'http://' + util.ip() + ':' + config.port;
    var chalk = require('chalk');
    console.log(chalk.yellow('fcserver start at = %s'), host);
    console.log(chalk.yellow('serverRoot = %s'), process.cwd());
};
