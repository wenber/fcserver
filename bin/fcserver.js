#!/usr/bin/env node

/**
 * @file 入口
 * @author wenber(wenbo.fe@gmail.com)
 */

'use strict';

var program = require('commander');

program
    .version('0.0.0');

program
    .command('start')
    .action(function () {
        require('../lib/server').start();
    });
