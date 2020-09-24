
// 引入 mongoose
import mongoose from 'mongoose'

// 创建管理员用户的模式对象
const userSchema = mongoose.Schema({
    // 姓名
    real_name: {type: String, default: '撩课大管家'},
    // 用户名
    user_name: {type: String, required: true},
    // 密码
    user_pwd: {type: String, required: true},
    // 头像
    icon_url: {type: String, required: false},
    // 手机号码
    phone: {type: Number, required: false},
    // 邮箱
    email: {type: String, required: false},
    // 加入日期
    join_time: {type: String, required: false},
    // 自我介绍
    intro_self: {type: String, default: '喜欢it，就来撩课'},
    // 积分
    points: {type: Number, default: 100},
    // 等级
    rank: {type: Number, default: 1},
    // 金币
    gold: {type: Number, default: 0},
    // 当前编辑时间
    c_time: {type: Date, default: Date.now()},
    // 最后编辑时间
    l_edit: {type: Date, default: Date.now()},
});

const User = mongoose.model('User', userSchema);
export default User;