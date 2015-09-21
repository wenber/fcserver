/**
 * @file 工具方法
 * @author wenber
 */

'use strict';

/**
 * 获取本机IP
 * 默认取127.0.0.1之外的一个IP地址
 *
 * @return {string}
*/
exports.ip = function () {
    var ifaces = require('os').networkInterfaces();
    var defultAddress = '127.0.0.1';
    var ip = '';

    function findIP(key, val) {
        if (key.family === 'IPv4' && key.address !== defultAddress) {
            ip = key.address;
        }
    }

    for (var dev in ifaces) {
        if (ifaces.hasOwnProperty(dev)) {
            ifaces[dev].forEach(findIP);
        }

        if (ip) {
            break;
        }
    }

    return ip;
};

/**
 * 打开浏览器器
 * @param {string} url 待打开的url
 * @return {?boolen}
 */
exports.openInBrowser = function (url) {

    if (url == null || url === '') {
        return false;
    }

    if (process.platform === 'win32') {
        var cmd  = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
    }
    else if (process.platform === 'linux') {
        cmd  = 'xdg-open';
    }
    else if (process.platform === 'darwin') {
        cmd  = 'open';
    }
    else {
        return true;
    }

    require('child_process').exec(cmd + ' "'+ url + '"');
};
