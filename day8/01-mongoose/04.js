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

personModel.findOne({}, (err, data)=>{
    if (err) throw err;
    console.log(data.get('sex'));
    console.log(data.set('sex', '男'));
    console.log(data.toJSON());
})