
const http = require('http');

http.createServer((req, res)=>{
    console.log(res.headersSent ? '响应头已发送' : '响应头未发送');

    //设置隐式响应头
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    res.writeHead(200, 'ok')
    
    res.write('<h1>Hello</h1>')
    res.write('<h1>Hello</h1>')
    res.write('<h1>Hello</h1>')
    res.write('<h1>Hello</h1>')
    res.write('<h1>Hello</h1>')

    //本次响应结束
    res.end('<h1>Lambert</h1>');

    console.log(res.headersSent ? '响应头已发送' : '响应头未发送');

}).listen(3000, '127.0.0.1', ()=>{
    console.log('服务器已启动');
})