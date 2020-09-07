
const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res)=>{
    let out = fs.createWriteStream(path.join(__dirname, 'request.log'));
    out.write('1.method: ' + req.method + '\n');
    out.write('2.url: ' + req.url + '\n');
    out.write('3.headers: ' + JSON.stringify(req.headers) + '\n');
    out.write('4.httpVersion: ' + req.httpVersion + '\n');
}).listen(8080, '127.0.0.1')