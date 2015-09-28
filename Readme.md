# fcserver

### 安装

```
npm install -g fcserver
```

### 使用
+ 启动方法，在项目根目录下
```
fcserver start [-o] [-p 8000]   // -o 表示同时打开默认浏览器 -p 指定端口
```

### 功能
+ 支持文件目录索引
+ 支持less文件使用
+ 支持本地mock数据
+ 支持es6文件自动转换成es5（要求预先安装全局安装babel模块）
+ 支持自定义处理器
+ 正在扩展各种资源的处理器...

### 已经拥有的处理器模块

* less 处理less文件，直接将less语法的文件转换成css格式后返回到客户端
* mock 本地响应请求的mock数据，可以动态生成一些列数据供客户端使用，使得前端开发不再依赖后端接口


### 关于使用本地mock数据服务的说明

在项目根目录下添加fcserver-config.js配置文件，文件内容如下

```
exports.path2Handler = [
    { 
        // 对less文件的请求，交由less处理器模块
        path: /.+\.less($|\?)/, // path配置特定的路径
        handler:  'less' // handler是该路径下请求对应的处理器模块名称
           
    },
    {   
        // 对以.ajax标示的异步请求，交由mock处理器模块
        path: /.+\.ajax($|\?)/,
        handler: 'mock'
    },
    {
        path: /._es6\.js?($|\?)/, // 为了标示es6文件，所有es6类型文件都以*_es6.js结尾
        handler: 'es6to5'
    },
    {
        path: /._es6\.js?($|\?)/, // 为了标示es6文件，所有es6类型文件都以*_es6.js结尾
        handler: addCookie  // 自定义处理器以函数名表示，该函数要求在配置文件中可以访问
    }
];

// mockPath是mock文件的顶级文件夹，默认是项目根目录下的mock文件夹，你也可以配置成其他目录作为mock顶级目录,例如，当ajax的请求url为/path/to/file时，前端会返回如下路径里的文件返回值
   root
        ----mock
            ----path
                ----to
                    ----file.js
exports.mockPath = './mock';
```
