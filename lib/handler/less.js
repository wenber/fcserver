/**
 * @file 编译并输出less
 * @author wenber
 */

'use strict';

module.exports = exports = function () {
    return function (request, response, next, promise) {
        var less = require('less');
        var path = require('path');
        var fs = require('fs');

        var requstPath = path.resolve(process.cwd(), '.' + request.url);
        var content = fs.readFileSync(requstPath, 'UTF-8');

        less.render(content, function (e, output) {
            if (e) {
                console.warm(e);
                promise.resolve();
            }
            else {
                response.__body = output.css;
                response.setHeader('Charset', 'UTF-8');
                response.setHeader('Content-Type', require('../util/mineType').css);
                response.setHeader('Content-Length', Buffer.byteLength(response.__body));
                promise.resolve();
            }
        });
    };
};
