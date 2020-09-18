const express = require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.get('/', (req, res, next)=>{
    res.render('index2');
});

app.post('/', (req, res, next)=>{
    // 普通方式上传数据 **************************************************
    // let data = '';
    // req.on('data', (chunk)=>{
    //     data += chunk;
    // });
    // req.on('end', ()=>{
    //     fs.writeFile(path.join(__dirname, 'data.txt'), data, (err)=>{
    //         if (!err) {
    //             res.end('success!');
    //         }
    //     })
    // });

    // formidable 方式上传数据 **************************************************
    // 1. 创建实例
    const form = formidable({ multiples: true });
    // 2. 指定文件上传的目录
    form.uploadDir = path.join(__dirname, 'storage');
    // 3. 指定文件的后缀
    form.keepExtensions = true;

    // 解析 request 发送过来的数据
    form.parse(req, (err, fields, files) => {
        if (err) {
             throw err;
        };

        console.log(fields);
        console.log(files);
        res.end('auccess');
        // res.json({ fields, files });
    });
});

app.listen(2000, ()=>{
    console.log('running...');
})