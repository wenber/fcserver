// 创建WebSocket对象
if (window.WebSocket) {
    try {
        var wsServer = 'ws://127.0.0.1:8080';
        var websocket = new WebSocket(wsServer); 
        websocket.onopen = function (evt) {
            //已经建立连接
            console.log('WebSocket connected!')
            websocket.send("WebSocket connected!")
        };
        websocket.onclose = function (evt) {
            //已经关闭连接
            console.log('WebSocket close!');
        };
        websocket.onmessage = function (evt) {
            //收到服务器消息，使用evt.data提取
            var data = JSON.parse(evt.data);
            if (data.stdout) {
                console.clear();
                console.log('%c**********start***************\n', 'color: blue');
                var stdoutArr = data.stdout.split('\n');
                stdoutArr.forEach(function (item) {
                    if (/^(\+)\s.*$/.test(item)) {
                        console.log('%c' + item, 'color: green');
                    }
                    else if (/^(\-)\s.*$/.test(item)) {
                        console.log('%c' + item, 'color: red');
                    }
                    else {
                        console.log(item);
                    }
                });
                console.log('%c***********end**************\n', 'color: blue');
            }
            // js文件，热更新
            if (data.normaliazeFile.indexOf('.js') > -1 && data.normaliazeFile !== 'socket.js') {
                var moduleName = data.normaliazeFile.replace(/\.js/, '');
                var topModule = null;
                // 1,删除该module的缓存和上层模块缓存,否则require不会去执行请求
                window.REQUIREJS_MODULE_RELATION[moduleName].forEach(function (item) {
                    delete window.REQUIREJS_MODULE_CONTEXTS.defined[item];
                    delete window.REQUIREJS_MODULE_CONTEXTS.registry[item];
                    delete window.REQUIREJS_MODULE_CONTEXTS.urlFetched['./' + item + '.js'];
                    topModule = item;
                });
                
                // 2,重新require  topModule模块
                window.require([topModule], function () {
                    console.log('【' + topModule + '】 module has update!');
                });
            }
        };
    }
    catch (err) {
        console.log(err);
    }

    window.onbeforeunload
        = window.onunload
        = function () {
        try {
            websocket.close();
            websocket = null;
        }
        catch (err) {
            console.log(err);
         }
    }
}
else {
    console.log('您的浏览器不支持WebSocket!');
}
