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
    es6to5: require('./es6to5')(),
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
    var handler = request._handler;
    var Promise = require('promise');

    var promise = new Promise(function (resolve, reject) {
        // 可以在配置文件fcserver-config.js中配置自定义的处理器
        if (typeof handler === 'function') {
            handler();
        }
        else if (typeof handler === 'string') {
            handlers[handler](request, response, next, {resolve: resolve, reject: reject});
        }
    });

    // 在处理器内部构造返回数据，在这里统一返回
    promise.then(
        function () {
            response.end(response.__body, 'UTF-8');
            next();
        }, function () {
            response.statusCode = 404;
            response.end();
            next();
        }
    );
}
