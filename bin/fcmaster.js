#!/usr/bin/env node

var fork = require('child_process').fork;
var exec = require('child_process').exec;

var cpus = require('os').cpus();
var path = require('path');
var server = require('net').createServer();
server.listen(1337);

var worker = {};
var createWorker = function () {
    var server  = path.resolve(__dirname, './fcserver.js');
    worker = exec('node ' + server + ' start');

    worker.on('exit', function (err) {
        console.log('Worker ' + worker.pid + ' exited' + err);
        delete worker;
        createWorker();
    });

    // 错误
    worker.stderr.on('data', function (data) {
        console.log(data)
    });

    // 子进程输出到父进程
    worker.stdout.on('data', function (data) {
        console.log(data);
    });

    console.log('Create worker pid: ' + worker.pid);

};
createWorker();

process.on('exit',  function () {
        worker.kill();
})
