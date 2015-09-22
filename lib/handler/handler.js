/**
 * 中间件处理器
 */

module.exports = exports = function() {
    return function(request, response, next) {
        process(request, response, next);
    };
};

/**
 * 根据route分析出来的handlers依次执行
 * @param {http.Request} request
 * @param {http.Response} response
 */
function process(request, response, next) {
    var handlerArray = request._handlers;

    handlerArray.forEach(function (name) {
        (handlers[name] || handlers['file'])(request, response, next);
    });
}


var handlers = {
    less: require('./less')(),
    file: require('./fileList')()
};
