/**
 * @file 监控文件变动
 * @author wenber
 */

'use strict';

module.exports = exports = function (port) {
    var watch = require('watch');
    var config = require('../config');
    var ws = require('./ws');
    var exec = require('child_process').exec;
    var versionControl = '';

    /**
     * 日志信息
     *
     * @return {string} logs
     */
    function getLogs(type, file) {
        return new Date().toTimeString() + ' file ' + type + ': '+ file + '\n';
    }
    watch.createMonitor(process.cwd(), function (monitor) {
        monitor.files[process.cwd() + '/.zshrc'];

        exec('git status ' + process.cwd(), function (err, stdout, stderr) {
            if (stdout) {
                versionControl = 'git';
            }
        });
        exec('svn status ' + process.cwd(), function (err, stdout, stderr) {
            if (stdout) {
                versionControl = 'svn';
            }
        });

        monitor.on("created", function (file, stat) {
            if (config.supportUpdateType.test(file)) {
                ws.socket.send(getLogs('created', file));
            }
        });
        monitor.on("changed", function (file, curr, prev) {
            if (config.supportUpdateType.test(file)) {
                ws.socket.send(getLogs('changed', file));
                if (versionControl) {
                    exec(versionControl + ' diff ' + file, function (err, stdout, stderr) {
                        ws.socket.send(stdout + '\n');
                    });
                }
            }
        });
        monitor.on("removed", function (file, stat) {
            if (config.supportUpdateType.test(file)) {
                ws.socket.send(getLogs('removed', file));
            }
        });
    })
};
