/**
 * @file 路由到处理器的映射
 * @author wenber
 */

'use strict';

module.exports = exports = function () {
    var route = new Route();
    return function (require, response, next) {
        route.process(require, response, next);
    };
};

var path = require('path');
var fs = require('fs');
var _  = require('underscore');

/**
 * Route
 *
 * @constructor
 */
function Route() {
    this.config = require('../../fcserver-config');
    this.routes = this.config.path2Handler;
}

/**
 * 处理请求的方法，找到handlers，并将handlers放在request中，等待其他模块处理
 *
 * @param {http.Request} request 请求对象
 * @param {http.Response} response 响应对象
 * @param {Function} next 执行流控制器
 */
Route.prototype.process = function (request, response, next) {
    var me = this;

    var url = require('url');
    _.extend(request, url.parse(request.url, true));

    for (var i = 0, l = me.routes.length; i < l; i++) {
        path = me.routes[i].path;
        if (path instanceof RegExp && path.test(request.url)) {
            // 将handlers传递下去
            request._handler = me.routes[i].handler;
            break;
        }
    }
    // 如果不需要特殊处理，则直接映射到文件处理器
    if (request._handler == null) {
        request._handler = 'file';
    }
    next();
};
