
const fs = require('fs');
const path = require('path');

// 1.创建一个promise ( Promise特性：一经创建，立马执行 )
new Promise((resolve, reject)=>{
    fs.readFile(path.join(__dirname, 'data/a.txt'), (err, data)=>{
        if (err) reject(err);
        resolve(data);
    });
}).then((data)=>{
    console.log(data.toString());
    return new Promise((resolve, reject)=>{
        fs.readFile(path.join(__dirname, 'data/b.txt'), (err, data)=>{
            if (err) reject(err);
            resolve(data);
        });
    });
}).then((data)=>{
    console.log(data.toString());
    return new Promise((resolve, reject)=>{
        fs.readFile(path.join(__dirname, 'data/c.txt'), (err, data)=>{
            if (err) reject(err);
            resolve(data);
        });
    });
}).then((data)=>{
    console.log(data.toString());
}).catch((err)=>{
    console.log(err);
});