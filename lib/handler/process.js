/**
 * @file 中间件处理器分发
 * @author wenber
 */

'use strict';

module.exports = exports = function () {
    return function (request, response, next) {
        process(request, response, next);
    };
};

/**
 * 各个处理器
 * @type {Object}
 */
var handlers = {
    less: require('./less')(),
    file: require('./file')(),
    mock: require('./mock')()
};

/**
 * 根据route分析出来的handlers依次执行
 *
 * @param {http.Request} request 请求对象
 * @param {http.Response} response 响应对象
 * @param {Function} next 执行流控制器
 */
function process(request, response, next) {
    var handlerArray = request._handlers;
    var Promise = require('promise');
    var promise = [];

    handlerArray.forEach(function (name, index) {
        promise[index] = new Promise(function (resolve, reject) {
            (handlers[name] || handlers.file)(request, response, next, {resolve: resolve, reject: reject});
        });
    });

    // TODO:不能在处理器模块内部调用end(),这个地方应该做成串行处理
    Promise.all(promise).then(function () {
        response.end(response.__body, 'UTF-8');
    });
}
