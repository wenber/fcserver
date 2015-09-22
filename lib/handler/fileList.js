/**
 * @file fileList
 * @author wenber
 */

/* global process */

'use strict';

module.exports = function () {
    return function (request, response, next) {
        var path = require('path');
        var fs = require('fs');
        var requstPath = path.resolve(process.cwd(), '.' + request.url);

        fs.exists(requstPath, function (exists) {
            if (exists) {
                var stats = fs.lstatSync(requstPath);
                var content = '';
                if (stats.isDirectory()) {
                    fs.readdir(requstPath, function (err, files) {
                        var list = [];
                        files.forEach(function (file) {
                            var stat = fs.statSync(path.join(requstPath, file));
                            list.push({
                                name: stat.isDirectory() ? file + '/' :  file,
                                url: encodeURIComponent(file) + (stat.isDirectory() ? '/' : ''),
                                size: stat.size,
                                mtime: stat.mtime
                            });
                        });

                        var tplStr = fs.readFileSync(
                            path.join( __dirname, '../util/fileList.tpl'),
                            'utf8'
                        );
                        var tpl = require('handlebars').compile(tplStr);
                        content = tpl({
                            files: list
                        });
                        response.write(content);
                        response.end();
                    });
                }
                else {
                    var extname = path.extname(requstPath).slice(1).toLowerCase();
                    var contentType = require('../util/mineType')[extname] || 'text/plain';
                    response.setHeader('Content-Type', contentType);
                    response.setHeader('charset', 'UTF-8');

                    var fileReadStream = fs.createReadStream(
                        requstPath, 
                        {
                            encoding: 'UTF-8',
                            autoClose: true
                        });
                    fileReadStream.on('data', function (data) {
                        response.write(data);
                    });
                    fileReadStream.on('end',function(){
                        response.end();
                    });
                }
            }
            else {
                next();
            }
        });
    };
};
