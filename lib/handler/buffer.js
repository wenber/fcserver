/**
 * @file Buffer
 * @author wenber
 */

'use strict';

module.exports = function () {
    return function (requst, respose, next) {
        var bodyBuffer = [];

        requst.on(
            'data',
            function (chunk) {
                bodyBuffer.push(chunk);
            }
        );

        requst.on(
            'end',
            function () {
                if (bodyBuffer.length > 0) {
                    requst.bodyBuffer = Buffer.concat(bodyBuffer);
                }
                next();
            }
        );
    };
};
