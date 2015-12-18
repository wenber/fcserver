/**
 * @file 默认配置
 * @author wenber
 */

/* global process */

'use strict';

module.exports = {
    // 默认端口
    defaultPort: 8080,
    // 默认服务器配置文件名
    defaultConf: 'fcserver-config.js',
    // 路由映射到处理器
    path2Handler: [],
    // mock目录
    mockPath: require('path').resolve(process.cwd(), './mock'),
    // 支持实时更新的文件类型
    supportUpdateType: /\.(js|html|css|less)$/,
    // 是否启动socket
    initSocket: true
};
