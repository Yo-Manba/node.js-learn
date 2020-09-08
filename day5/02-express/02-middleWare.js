// 引入
const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建web服务器
const app = express();

// 开启监听
app.listen(3000, '127.0.0.1', ()=>{
    console.log('服务器开启成功');
})

// 写日志
app.use((req, res, next)=>{
    const log = `
        ____________________________________
        1) 请求的方式：${req.method}, \n
        2) 请求的路径：${req.url}, \n
        3) 请求的时间：${new Date()}, \n
        ____________________________________
    `;

    // 写入文件
    fs.appendFile(path.join(__dirname, 'req.log'), log, (err, data)=>{
        if(err) throw err;
        next();
    });
});

// 其他中间件
app.get('/', (req, res)=>{
    res.writeHead(200, {'content-type': 'text/html; charset=uft-8'});
    res.write('<h2>Hello, express</h2>');
    res.end();
})
