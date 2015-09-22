/**
 * @file 编译并输出less
 * @author wenber
 */
module.exports = exports = function () {
    return function (request, response, next) {
        var less = require('less');
        var path = require('path');
        var fs = require('fs');

        var requstPath = path.resolve(process.cwd(), '.' + request.url);
        var content = fs.readFileSync(requstPath, 'utf8');
        response.setHeader('charset', 'UTF-8');
        response.setHeader('Content-Type', require('../util/mineType')['css']);
        less.render(content, function (e, output) {
            if (e) {
                console.warm(e);
                response.setHeader('status', 500);
                response.end();
            }
            else {
                response.write(output.css);
                response.end();
            }
            
        });
    }
};
