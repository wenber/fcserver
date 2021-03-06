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
    var fs = require('fs');
    var path = require('path');

    /**
     * 标准化文件名
     * @param  {string} file 文件名称
     * @return {string}
     */
    function normalize(file) {
        return path.relative(process.cwd(), file);
    }

    /**
     * 日志信息
     *
     * @return {string} logs
     */
    function getLogs(type, file) {
        var baseDir = process.cwd();
        var moduleId = file.replace(baseDir + '\/', '');
        return new Date().toTimeString() + ' file ' + type + ': '+ moduleId + '\n';
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
                // ws.socket.send(getLogs('changed', file));
                if (versionControl) {
                    exec(
                        versionControl + ' diff ' + file,
                        {
                            maxBuffer: 1024 * 1024, // 1MB
                        },
                        function (err, stdout, stderr) {
                            if (stdout) {
                                ws.socket.send(JSON.stringify({
                                    stdout: stdout,
                                    log: getLogs('changed', file),
                                    normaliazeFile: normalize(file) 
                                }));
                            }
                        }
                    );
                }
                else {
                     ws.socket.send(JSON.stringify({
                        log: getLogs('changed', file),
                        normaliazeFile: normalize(file) 
                    }));
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
