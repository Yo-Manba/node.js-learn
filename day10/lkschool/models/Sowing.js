
// 引入 mongoose
import mongoose from 'mongoose'

// 1.链接数据库 （所有模块中只需连接一次）
mongoose.connect('mongodb://localhost/college', {useNewUrlParser: true, useUnifiedTopology: true});
// 2.监听数据库的各种状态

// 2.1连接成功
mongoose.connection.on('open', ()=>{
    console.log('数据库连接成功');
});

// 2.2连接失败
mongoose.connection.on('error', (err)=>{
    throw err;
    console.log('数据库连接失败');
});

// 2.3断开连接
mongoose.connection.on('close', ()=>{
    console.log('数据库断开连接');
});

// 创建轮播图的模式对象
const sowingSchema = mongoose.Schema({
    // 图片名称
    image_title: { type: String, required: true },
    // 图片地址
    image_url: { type: String, required: true },
    // 图片跳转链接
    image_link: { type: String, required: true },
    // 图片上架时间
    s_time: { type: String, required: true },
    // 图片下架时间
    e_time: { type: String, required: true },
    // 图片最后编辑时间
    l_edit: { type: Date, default: Date.now() },
    // 图片添加时间
    c_time: { type: Date, default: Date.now() }
});

const Sowing = mongoose.model('Sowing', sowingSchema);
export default Sowing;