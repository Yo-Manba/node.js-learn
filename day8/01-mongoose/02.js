
// 引入
const mongoose = require('mongoose');

// 1.链接数据库
mongoose.connect('mongodb://localhost:27017/m_data', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', ()=>{
    console.log('数据库连接成功');
});

// 2.创建 Schema 对象
let Schema = mongoose.Schema;
let personSchema = new Schema({
    name: String,
    age: Number,
    chat: String,
    sex: {
        type: String,
        default: '男'
    }
});

// 3.创建 Model 集合对象
let personModel = mongoose.model('person', personSchema);

// 4.往集合中插入一条文档
// personModel.create({
//     name: '小七',
//     age: 25,
//     chat: 'itlike',
//     sex: '女'
// }).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

// 5.往集合中插入多条文档
personModel.create([
    {name: '小七', age: 25, chat: 'itlike001', sex: '女'},
    {name: '小八', age: 27, chat: 'itlike002', sex: '女'},
    {name: '小九', age: 29, chat: 'itlike003'}
]).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});