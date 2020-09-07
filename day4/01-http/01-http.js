

// 引入http模块
const http = require('http');

let server = http.createServer((req, res)=>{
    res.end('hello lambert')
})

server.listen(3000, '127.0.0.1', ()=>{
    console.log('服务器已经启动')
    setTimeout(()=>{
        // server.close()
    },5000)
})

// 监听服务器关闭
server.on('close', ()=>{
    console.log('服务器已关闭')
})