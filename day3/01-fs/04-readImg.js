

// 引入
const fs = require('fs');

// 读取图片
fs.readFile('D:/常用图片/1.png', (err, data)=>{
    if(!err){
        console.log(data);
        // 写入图片文件
        fs.writeFile(__dirname + '/source/girl.png', data, (err)=>{
            if(err) throw err;
            console.log('write succ!');
        })
    }
})