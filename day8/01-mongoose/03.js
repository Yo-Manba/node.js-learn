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

// 4.CRUD
// 4.1增加
// personModel.insertMany([
//     {name: '小七', age: 25, chat: 'itlike001', sex: '女'},
//     {name: '小八', age: 27, chat: 'itlike002', sex: '女'},
//     {name: '小九', age: 29, chat: 'itlike003'}
// ]).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// });

// 4.2查询
// personModel.find({name: '小七'}, (err, docs)=>{
//     if(err) throw err;
//     console.log(docs[0]);
//     console.log(typeof docs);
// });

// 字段过滤查询 (_id默认自带，如果不需要就标0，其他数据需要就标1，不需要就不填)
// personModel.find({name: '小七'}, { _id: 0, name: 1, sex: 1}, (err, docs)=>{
//     if(err) throw err;
//     console.log(docs);
// });

// 字段过滤查询方式二
// personModel.find({name: '小七'}, '-_id name', (err, docs)=>{
//     if(err) throw err;
//     console.log(docs);
// });

// 条件过滤查询 -- 跳过前三条，查找两条
// personModel.find({}, '-_id name',{skip: 3, limit: 2}, (err, docs)=>{
//     if(err) throw err;
//     console.log(docs);
// });

// 4.3更新
// personModel.updateMany({name: '小七'}, {$set: {age: 50}}, (err)=>{
//     if (err) throw err;
//     console.log('修改成功');
// });

// personModel.updateOne({name: '小七'}, {$set: {age: 50}}, (err)=>{
//     if (err) throw err;
//     console.log('修改成功');
// });

// 4.4删除
// personModel.deleteOne({name: '小七'}, (err)=>{
//     if (err) throw err;
//     console.log('删除成功');
// });

// personModel.deleteMany({name: '小撩'}, (err)=>{
//     if (err) throw err;
//     console.log('删除成功');
// });

personModel.countDocuments({}, (err, num)=>{
    if (err) throw err;
    console.log(num);
})