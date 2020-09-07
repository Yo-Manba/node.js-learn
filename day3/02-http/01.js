
// 引入http模块
const http = require('http');

// //创建一个web服务器
// let server = http.createServer((req, res)=>{
//     res.end('hello lambert!!!');
// })
//
// // 监听
// server.listen(8080, '127.0.0.1', ()=>{
//     console.log('8080端口上的node服务器已经启动了！')
// })


//创建一个web服务器 (链式写法)
http.createServer((req, res)=>{
    res.end('hello lambert');
}).listen(8080, '127.0.0.1', ()=>{
    console.log('8080端口上的node服务器已经启动了！')
})

