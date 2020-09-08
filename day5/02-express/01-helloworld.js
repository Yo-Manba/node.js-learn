// 引入
const express = require('express');

// 创建web服务器
const app = express();

// 根据路由(路径)处理get和post请求
app.get('/', (req, res)=>{
    res.writeHead(200, {'content-type': 'text/html; charset=uft-8'});
    res.write('<h2>Hello, express</h2>');
    res.end();
})

app.get('/like', (req, res)=>{
    res.writeHead(200, {'content-type': 'text/html; charset=uft-8'});
    res.write('<h2>Hello, like</h2>');
    res.end();
})

// 开启监听
app.listen(3000, '127.0.0.1', ()=>{
    console.log('服务器开启成功');
})