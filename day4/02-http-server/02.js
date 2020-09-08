
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

//创建服务器
http.createServer((req, res)=>{
    //获取路径
    let pathUrl = url.parse(req.url);
    let pathName = pathUrl.pathname;
    console.log(pathName);

    //提取链接
    let fileUrl = path.join(__dirname, pathName);
    // console.log(fileUrl);

    //提取后缀 (没有后缀情况)
    if(pathName.lastIndexOf('.') === -1){
        pathName += 'index.html'
    }

    // 提取后缀 (有后缀情况)
    let extName = path.extname(fileUrl);
    console.log(extName)

    //读取文件
    fs.readFile(fileUrl, (err, data)=>{
        if(err){ // 没有找到资源
            res.writeHead(404, {'content-type': 'text/html; charset=utf-8'});
            res.end('<h1>404, 当前页面不存在</h1>');
        }else { // 找到资源
            getContentType(extName, (contentType)=>{
                console.log(contentType)
                res.writeHead(200, {'content-type': contentType});
                res.end(data);
            });
        }
    })

}).listen(3000, '127.0.0.1', ()=>{
    console.log('服务器启动成功')
})

let getContentType = (extName, callback)=>{
    // 读取文件
    fs.readFile(path.join(__dirname, 'mime.json'), (err, data)=>{
        if(err) throw err;
        let mineJson = JSON.parse(data);
        let contentType = mineJson[extName] || 'text/plain';
        callback(contentType);
    })
}