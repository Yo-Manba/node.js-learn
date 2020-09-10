
const express = require('express');
const router = express.Router();
let util = require('./../util/util');

router.get('/', (req, res, next)=>{
    res.render('login');
})

router.post('/', (req, res, next)=>{
    // 获取数据
    let userName = req.body.userName;
    let loginPwd = req.body.loginPwd;

    // 生成用户对象
    let regUser = {
        userName,
        loginPwd
    };

    // 验证用户是否已经注册
    let user = util.isReg(regUser, util.users);
    if(user){ // 匹配到该用户
        // 判断用户密码是否正确
        if(user.loginPwd === loginPwd){
            res.redirect('/chat');
        }else {
            res.send('用户名或密码错误');
        }
    }else { // 没有匹配到该用户
        res.send('当前用户还没注册，请先注册再登录');
    }
})


module.exports = router;