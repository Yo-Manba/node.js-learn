
// 引入
const express = require('express');
const path = require('path');

// 创建web服务器
const app = express();

// 开启监听
app.listen(3000, '127.0.0.1', ()=>{
    console.log('服务器开启成功');
})

//中间件访问静态资源
app.use(express.static(path.join(__dirname, 'public')));

