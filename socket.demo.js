// 浏览器端创建WebSocket对象
if (window.WebSocket) {
    try {
        var wsServer = 'ws://127.0.0.1:8080';
        var websocket = new WebSocket(wsServer); 
        websocket.onopen = function (evt) {
            //已经建立连接
            console.log('WebSocket connected!')
            websocket.send("WebSocket")
        };
        websocket.onclose = function (evt) {
            //已经关闭连接
        };
        websocket.onmessage = function (evt) {
            //收到服务器消息，使用evt.data提取
            console.log(evt.data);
        };
        websocket.onerror = function (evt) {
            //产生异常
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

