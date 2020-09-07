

//引入
const fs = require('fs');

//创建读写流
let rs = fs.createReadStream('D:/视频文件/11.mp4');
let ws = fs.createWriteStream(__dirname + '/source/11.mp4');

//监听读流的打开
rs.once('open', (err)=>{
    console.log('读流已打开')
})

//监听写流的打开
ws.once('open', ()=>{
    console.log('写流已打开')
})

//监听读出流的data数据, 边读出边写入
rs.on('data', (data)=>{
    console.log(data);
    ws.write(data)
})

//监听读流已完成
rs.once('end', ()=>{
    console.log('读流已完成')
})

//监听读流的关闭
rs.once('close', ()=>{
    console.log('读流已关闭')
})
