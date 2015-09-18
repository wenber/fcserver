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
