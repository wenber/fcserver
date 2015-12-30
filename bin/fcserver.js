#!/usr/bin/env node

/**
 * @file 入口
 * @author wenber(wenbo.fe@gmail.com)
 */

'use strict';

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var program = require('commander');
var config = require('../lib/config');


var defaultConfig = path.resolve(__dirname, '..', config.defaultConf);
var defaultModule = require(defaultConfig);

var userConfig = require('path').resolve(process.cwd(), './fcserver-config');
// 如果存在用户自定义的配置文件，则覆盖到默认配置
if (fs.existsSync(userConfig + '.js')) {
     _.extend(defaultModule, require(userConfig));
}
program
    .version('0.0.0')
    .option('-p, --port', 'set the listen port')
    .option('-o, --open', 'open in browser');

program
    .command('start')
    .action(function (port) {
        var fixPort = program.port ? port : defaultModule.defaultPort;
        var server = require('../lib/server');
        server(fixPort);
        if (program.open) {
            require('../lib/util/util').openInBrowser('http://localhost:' + fixPort);
        }
    });

program.parse(process.argv);
