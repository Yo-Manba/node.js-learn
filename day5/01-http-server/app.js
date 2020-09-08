const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

// 创建服务器
http.createServer((req, res)=>{
    // 读取文件
    readDataJson((jsonData)=>{
        // 读取模板信息
        fs.readFile(path.join(__dirname, 'view/list2.ejs'), (err, data)=>{
            if(err) throw err;
            console.log(data.toString());

            // 实例化模板引擎
            let ejsList = data.toString();
            let tempList = ejs.render(ejsList, jsonData)

            // 响应给客户端
            res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
            res.end(tempList)
        })
    })

}).listen(3000, '127.0.0.1', ()=>{
    console.log('服务器启动成功');
})

let readDataJson = (callback)=>{
    fs.readFile(path.join(__dirname, 'model/data.json'), (err, data)=>{
        if(err) throw err;
        let jsonData = JSON.parse(data);
        callback && callback(jsonData);
    })
}