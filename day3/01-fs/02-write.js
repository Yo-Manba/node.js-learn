/*
* 1.写入
* */

// 引入
const fs = require('fs');

// 同步写入
// // 1.获取打开的文件
// let fd = fs.openSync(__dirname + '/source/b.txt', 'w');
// console.log(fd);
//
// // 2.同步写入内容
// fs.writeFileSync(fd, '人生不就是一场旅行！')
//
// // 3.保存并退出
// fs.closeSync(fd)
//
// // 4.后续操作
// console.log('后续的操作')



// 异步写入
// 1.获取打开的文件
fs.open(__dirname + '/source/c.txt', 'a', (err, fd)=>{
    if(!err){
        // 2.写入文件
        fs.writeFile(fd, '今天很开心 ' + Date.now() + '\n', (err)=>{
            if(!err){
                console.log('写入成功')
            }else {
                throw err
            }
        })

        // 3.关闭文件
        fs.close(fd, (err) =>{
            if(!err){
                console.log('文件已经保存并关闭')
            }else {
                throw err
            }
        })
    }
});

//后续操作
console.log('后续的操作')