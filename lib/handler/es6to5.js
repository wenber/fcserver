/**
 * @file es6转es5
 * @author wenber
 */

'use strict';

module.exports = exports = function () {
    return function (request, response, next, promise) {
        var shelljs = require('shelljs');
        var spawn = require('child_process').spawn;
        var path = require('path');
        var chalk = require('chalk');
        var data = '';

        var requstPath = path.resolve(process.cwd(), '.' + request.url);
        if (shelljs.which('ddsf')) {
            var child = spawn('babel', [requstPath]);
            child.stdout.setEncoding('UTF-8');
            child.stdout.on('data', function (chunk) {
                data += chunk;
            });

            child.on('exit', function (code) {
                response.__body = !code ? data : '';
                promise.resolve();
            });
        }
        else {
            console.log(chalk.red('please install babel module prepare!'));
            process.exit(1);
        }
    };
};
