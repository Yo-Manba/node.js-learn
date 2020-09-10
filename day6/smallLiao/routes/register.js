
const express = require('express');
const router = express.Router();
let util = require('./../util/util');

router.get('/', (req, res, next)=>{
    res.render('register');
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
    if(user === null || user === undefined){ // 没有注册
        util.users.push(regUser);
        res.redirect('/login');
    }else { // 已经注册
        res.send('当前用户已经注册，请直接登录');
    }
})


module.exports = router;