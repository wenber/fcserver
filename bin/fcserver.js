#!/usr/bin/env node

/**
 * @file 入口
 * @author wenber(wenbo.fe@gmail.com)
 */

'use strict';

var program = require('commander');

program
    .version('0.0.0')
    .option('-p, --port', 'set the listen port');

program
    .command('start')
    .action(function (port) {
        var server = require('../lib/server')
        if (program.port) {
            server.start(port);
        }
        else {
            server.start();
        }
    });

program.parse(process.argv);
