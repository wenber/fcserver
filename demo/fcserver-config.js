exports.path2Handler = [
    {
        path: /.+\.less($|\?)/,
        handler: 'less'
    },
    {
        path: /.+\.ajax($|\?)/,
        handler: 'mock'
    },
    {
        path: /._es6\.js?($|\?)/,
        handler: 'es6to5'
    }
];

// 默认是服务启动目录下的mock文件夹，这里也支持自定义的mock目录
exports.mockPath = './mock';

// 是否启动socket调试
exports.initSocket = true;

// 默认端口
exports.defaultPort = 8080;