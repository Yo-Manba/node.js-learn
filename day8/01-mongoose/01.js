
// 引入
const mongoose = require('mongoose');

// 1.链接数据库
mongoose.connect('mongodb://localhost:27017/m_data', {useNewUrlParser: true, useUnifiedTopology: true});

// 2.监听数据库的各种状态
let db = mongoose.connection;

// 3.监听
// 3.1连接成功
db.on('open', ()=>{
    console.log('数据库连接成功');
});

// 3.2连接失败
db.on('error', ()=>{
    console.log('数据库连接失败');
});

// 3.3断开连接
db.on('close', ()=>{
    console.log('数据库断开连接');
});