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
            var mockPath = require(fcserverConf).mockPath || process.cwd();
        }
        else {
            mockPath = process.cwd();
        }

        var mockFile = path.resolve(mockPath, path2File);
        if (fs.existsSync(mockFile + '.js')) {
            if (request.method === 'GET') {
                var param = require('url').parse(request.url, true).query;
            }
            else {
                param = util.form2JSON(request.__body);
            }
            response.__body = JSON.stringify(require(mockFile + '.js')(param));
            promise.resolve();
        }
    };
};
