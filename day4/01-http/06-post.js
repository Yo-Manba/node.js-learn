
const http = require('http');
const queryString = require('querystring');

http.createServer((req, res)=>{

    //设置隐式响应头
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    let postData = '';
    //post请求，得做事件监听
    req.on('data', (data)=>{
        postData += data;
        console.log(postData);
    });

    // 监听数据接收完毕
    req.on('end', ()=>{
        postData = queryString.parse(postData);
        console.log(postData);
        res.end('数据接收成功')
    })

}).listen(3000, '127.0.0.1', ()=>{
    console.log('服务器已启动');
})