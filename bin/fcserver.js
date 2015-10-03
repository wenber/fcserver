#!/usr/bin/env node

/**
 * @file 入口
 * @author wenber(wenbo.fe@gmail.com)
 */

'use strict';

var program = require('commander');
var defaultPort = require('../lib/config').defaultPort;

program
    .version('0.0.0')
    .option('-p, --port', 'set the listen port')
    .option('-o, --open', 'open in browser');

program
    .command('start')
    .action(function (port) {
        port = port || defaultPort;
        var server = require('../lib/server');
        server.start(port);
        if (program.open) {
            require('../lib/util/util').openInBrowser('http://localhost:' + port);
        }
    });

program.parse(process.argv);
