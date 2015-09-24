/**
 * @file 空处理
 * @author wenber
 */

'use strict';

module.exports = function () {
    return function (request, response, next, promise) {
        response.statusCode = 200;
        response.__body = JSON.stringify({});
        promise.resolve();
    };
};
