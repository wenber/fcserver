/**
 * @file Buffer
 * @author wenber
 */

'use strict';

module.exports = function () {
    return function (requst, respose, next) {
        var bodyBuffer = [];
        // GET请求没有data事件
        requst.on(
            'data',
            function (chunk) {
                bodyBuffer.push(chunk);
            }
        );
        // POST，GET都有end事件
        requst.on(
            'end',
            function () {
                if (bodyBuffer.length) {
                    requst.__body = bodyBuffer.join('').toString();
                }
                // 数据接收完成，交由下一步
                next();
            }
        );
    };
};
