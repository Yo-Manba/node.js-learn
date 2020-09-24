import express from 'express'
import User from './../models/User'
import md5 from 'blueimp-md5'

const router = express.Router({});

const S_KEY = '@WaLK1314?.ItIkfO.VOm.#';

// ************************************************* 接口API - start ***********************************************************
/**
 * 生成后台管理员
 * itlike
 * 123
 */
router.post('/user/api/add', (req, res, next)=>{
    const user_name = req.body.user_name || '';
    const user_pwd = md5(req.body.user_pwd + S_KEY) || '';

    // 操作数据库
    const user = new User({
        // 用户名
        user_name: user_name,
        // 密码
        user_pwd: user_pwd
    });

    // 存储
    user.save((err, result)=>{
        if(err){
            return next(err);
        };
        res.json({
            status: 200,
            result: '添加管理员成功！'
        });
    });
});

/**
 * 用户名和密码进行登录
 */
router.post('/user/api/login', (req, res, next)=>{
    // 获取数据
    const user_name = req.body.user_name;
    const user_pwd = req.body.user_pwd;

    console.log(req.body);

    // 查询数据
    User.findOne({user_name: user_name}, (err, data)=>{
        if(err){
            return next(err);
        };
        // 判断用户存不存在
        if(data){
            // 判断密码
            if(data.user_pwd === user_pwd){
                // 密码正确，登录成功
                res.json({
                    status: 200,
                    result: {
                        token: data._id,
                        message: '登录成功'
                    }
                });
            }else {
                // 密码错误，登录失败
                res.json({
                    status: 1,
                    result: '输入密码有误'
                });
            }
        }else {
            res.json({
                status: 1,
                result: '用户不存在'
            })
        }
    });
});

// ************************************************* 接口API - end ***********************************************************



// ************************************************* 页面路由 - start ***********************************************************
router.get('/back/login', (req, res, next)=>{
    res.render('back/login.html');
});

router.get('/back/u_center', (req, res, next)=>{
    res.render('back/user_center.html');
});

router.get('/back/u_message', (req, res, next)=>{
    res.render('back/user_message.html');
});

router.get('/back/u_reset_pwd', (req, res, next)=>{
    res.render('back/reset_pwd.html');
});

// ************************************************* 页面路由 - end ***********************************************************

export default router;