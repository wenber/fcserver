/**
 * @file 监控文件变动
 * @author wenber
 */

'use strict';

module.exports = exports = function (port) {
    var watch = require('watch');
    var config = require('../config');

    /**
     * 日志信息
     */
    function writeLogs(type, file) {
        var logs = new Date().toLocaleString() + ' file ' + type + ': '+ file + '\n';
        console.log(logs);
    }
    watch.createMonitor(process.cwd(), function (monitor) {
        monitor.files[process.cwd() + '/.zshrc'];
        monitor.on("created", function (file, stat) {
            if (config.supportUpdateType.test(file)) {
                writeLogs('created', file);
            }
        });
        monitor.on("changed", function (file, curr, prev) {
            if (config.supportUpdateType.test(file)) {
                writeLogs('changed', file);
            }
        });
        monitor.on("removed", function (file, stat) {
            if (config.supportUpdateType.test(file)) {
                writeLogs('removed', file);
            }
        });
    })
};
