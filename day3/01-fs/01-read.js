/*
* 1.读取
* */

// 引入
const fs = require('fs');

// 同步读取
// let fd = fs.readFileSync(__dirname + '/source/a.txt')
// console.log(fd);
// console.log(fd.toString());
// console.log('后续的操作')

// 异步读取
fs.readFile(__dirname + '/source/a.txt', (err, data)=>{
    console.log(err);
    if(!err){
        console.log(data);
        console.log(data.toString());
    }
})
console.log('后续的操作')

