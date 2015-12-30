/**
 * @file 直接输出文件
 * @author wenber
 */

/* global process */

'use strict';

module.exports = function () {
    return function (request, response, next, promise) {
        var path = require('path');
        var fs = require('fs');
        var inited = false;
        var config = require('../../fcserver-config');
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
                            path.join(__dirname, '../util/fileList.tpl'),
                            'UTF-8'
                        );
                        var tpl = require('handlebars').compile(tplStr);
                        content = tpl({
                            files: list
                        });
                        response.__body = content;
                        promise.resolve();
                    });
                }
                else {
                    var extname = path.extname(requstPath).slice(1).toLowerCase();
                    var contentType = require('../util/mineType')[extname] || 'text/plain';
                    response.setHeader('Content-Type', contentType);
                    response.setHeader('Charset', 'UTF-8');
                    response.setHeader('Cache-Control', 'private');
                    var bodyBuffer = [];
                    if (config.initSocket && /(seajs)|(requirejs)\.js/.test(request.url)) {
                        var name = RegExp.$1 || RegExp.$2;
                        var seajsFixPath = path.resolve(__dirname, '../loader/' + name +'-fix.js');
                        response.__body = fs.readFileSync(seajsFixPath, 'UTF-8');
                        promise.resolve();
                    }
                    else {
                        var fileReadStream = fs.createReadStream(
                            requstPath,
                            {
                                autoClose: true
                            });
                        fileReadStream.setEncoding('UTF-8');
                        fileReadStream.on('data', function (chunk) {
                            bodyBuffer.push(chunk);
                        });

                        fileReadStream.on('end', function () {
                            response.__body = bodyBuffer.join('').toString();
                            if (config.initSocket && /\.html$/.test(request.url)) {
                                var socketPath = path.resolve(__dirname, '../../socket.js');

                                var socketData = fs.readFileSync(socketPath, 'UTF-8');
                                fs.writeFileSync(process.cwd() + '/socket.js', socketData);
                                var injectScript = '\n<script src="\/socket.js"><\/script>\n';
                                var body = response.__body.split('<\/body>');
                                response.__body = body[0] + injectScript + '<\/body>' + body[1];
                            }
                            promise.resolve();
                        });
                    }
                    
                }
            }
            else {
                next();
            }
        });
    };
};
