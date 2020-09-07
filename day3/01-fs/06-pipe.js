
//引入
const fs = require('fs');

//创建读写流
let rs = fs.createReadStream('D:/视频文件/11.mp4');
let ws = fs.createWriteStream(__dirname + '/source/44.mp4');

// 创建管道
rs.pipe(ws)

// 管道原理
// rs.on('data', (data)=>{
//     let flag = ws.write(data)
//     console.log(flag)
//     // 判断
//     if(!flag){
//         // 暂停读入
//         rs.pause()
//     }
// })
//
// ws.on('drain', ()=>{
//     // 继续读取流
//     rs.resume()
// })
//
// // 监听读流完成
// rs.on('end', ()=>{
//     // 写流结束
//     ws.end()
// })