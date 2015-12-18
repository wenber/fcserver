var work = new Worker("child.js");
    //发送消息
    work.postMessage("100");
    // 监听消息
    work.onmessage = function(event) {
        console.log(event.data)
}