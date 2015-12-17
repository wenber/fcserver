/**
 * @file 启动server
 * @author wenber
 */

'use strict';

module.exports = exports = function (port) {
    var connect = require('connect');
    var config = require('./config');
    var watch = require('watch');
    port = port || config.defaultPort;

    // 一大堆处理器来袭
    var app = connect();
    app.use(require('morgan')('dev'))
        .use(require('./handler/buffer')())
        .use(require('./handler/route')())
        .use(require('./handler/process')())

    // 创建服务
    require('http').createServer(app).listen(port);

    // 启动信息
    var util = require('./util/util');
    var host = 'http://' + util.ip() + ':' + port;
    var chalk = require('chalk');

    console.log(chalk.yellow('fcserver start at = %s'), host);
    console.log(chalk.yellow('serverRoot = %s'), process.cwd());
    watch.createMonitor(process.cwd(), function (monitor) {
        monitor.files[process.cwd() + '/.zshrc'];
        monitor.on("created", function (f, stat) {
          // Handle new files
        })
        monitor.on("changed", function (f, curr, prev) {
          // Handle file changes
        })
        monitor.on("removed", function (f, stat) {
          // Handle removed files
        })
    })
};
