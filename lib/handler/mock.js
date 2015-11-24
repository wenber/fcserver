/**
 * @file mock数据
 * @author wenber
 */

'use strict';

module.exports = exports = function () {
    return function (request, response, next, promise) {
        // var mockservice = require('mockservice');
        var path = require('path');
        var fs = require('fs');
        var util = require('../util/util');
        var config = require('../config');
        var requestPath = request.pathname;
        var path2File = requestPath.replace(/\.\w+/, '');

        if (path2File.charAt('0') === '/') {
            path2File = path2File.substr(1);
        }
        var fcserverConf = path.resolve(process.cwd(), config.defaultConf);
        if (fs.existsSync(fcserverConf)) {
            var mockPath = require(fcserverConf).mockPath || config.mockPath;
        }
        else {
            mockPath = process.cwd();
        }

        var filePath = path.resolve(mockPath, path2File);
        var underlinePath = path.resolve(mockPath, path2File.replace(/\//g, '_'));
        var returnValue = '';
        if (request.method === 'GET') {
            var param = require('url').parse(request.url, true).query;
        }
        else {
            param = util.form2JSON(request.__body);
        }
        // 以文件夹路径形式存放mock文件
        if (fs.existsSync(filePath + '.js')) {
            returnValue = require(filePath)(param);
            if (typeof returnValue.then === 'function') {
                returnValue.then(function (data) {
                    response.__body = JSON.stringify(data, '\t', 4);
                    promise.resolve();
                });
            }
            else {
                response.__body = JSON.stringify(returnValue, '\t', 4);
                promise.resolve();
            }
        }
        // 以下划线形式存放mock文件
        else if (fs.existsSync(underlinePath + '.js')) {
            returnValue = require(underlinePath)(param)
            if (typeof returnValue.then === 'function') {
                returnValue.then(function (data) {
                   response.__body = JSON.stringify(data, '\t', 4);
                    promise.resolve(); 
                });
            }
            else {
                response.__body = JSON.stringify(returnValue, '\t', 4);
                promise.resolve();
            }
        }
        else {
            promise.reject();
        }
    };
};
