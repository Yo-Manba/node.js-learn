
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

//创建服务器
http.createServer((req, res)=>{
    //获取路径
    let pathUrl = url.parse(req.url);
    let pathName = pathUrl.pathname;
    // console.log(pathName);

    if (pathName === '/page1') {
        fs.readFile(path.join(__dirname, '/page/page1.html'), (err, data)=>{
            if(err) throw err;
            res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
            res.end(data);
        });
    }else if (pathName === '/page2') {
        fs.readFile(path.join(__dirname, '/page/page2.html'), (err, data)=>{
            if(err) throw err;
            res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
            res.end(data);
        });
    }else if (pathName === '/css') {
        fs.readFile(path.join(__dirname, '/page/index.css'), (err, data)=>{
            if(err) throw err;
            res.writeHead(200, {'content-type': 'text/css; charset=utf-8'});
            res.end(data);
        });
    }else if (pathName === '/img') {
        fs.readFile(path.join(__dirname, '/page/1.png'), (err, data)=>{
            if(err) throw err;
            res.writeHead(200, {'content-type': 'image/png'});
            res.end(data);
        });
    }else {
        res.writeHead(404, {'content-type': 'text/html; charset=utf-8'});
        res.end('<h1>404, 当前页面不存在</h1>');
    }

}).listen(3000, '127.0.0.1', ()=>{
    console.log('服务器启动成功')
})