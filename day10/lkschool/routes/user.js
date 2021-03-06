import express from 'express'
import formidable from "formidable";
import {basename} from "path";
import md5 from 'blueimp-md5'
import config from "../src/config";
import User from './../models/User'

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
                console.log(req.session);

                // session 中存 token
                req.session.token = data._id;

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

/**
 * 退出登录
 */
router.get('/back/user/api/logout', (req, res, next)=>{
    // 销毁 session
    // 方式一：将cookie的时间设置为0，只有cookie中携带的信息用过客户端请求传递到服务器，由对应的session接收，session才起作用，cookie没了session自然将不起作用
    req.session.cookie.maxAge = 0;

    // 方式二：destroy
    // req.session.destroy((err)=>{
    //     return next(err);
    // });

    // 提示用户
    res.json({
        status: 200,
        result: '退出登录成功'
    });
});

/**
 * 获取用户信息-用户中心板块
 */
router.get('/back/user/api/u_msg/:token', (req, res, next)=>{
    User.findById(req.params.token, "-_id real_name icon_url intro_self points rank gold", (err, user)=>{
       if(err){
           return next(err);
       };

       if(user){
           res.json({
               status: 200,
               result: user
           });
       }else {
           req.session.cookie.maxAge = 0;
       }
    });
});

/**
 * 获取用户信息-用户信息板块
 */
router.get('/back/user/api/u_msg_all/:token', (req, res, next)=>{
    User.findById(req.params.token, (err, user)=>{
        if(err){
            return next(err);
        };

        if(user){
            res.json({
                status: 200,
                result: user
            });
        }else {
            req.session.cookie.maxAge = 0;
        }
    });
});

/**
 * 根据id（token）去修改用户信息
 */
router.post('/back/user/api/edit', (req, res)=>{
    // formidable 方式上传数据 **************************************************
    // 1. 创建实例
    const form = formidable({ multiples: true });
    // 2. 指定文件上传的目录
    form.uploadDir = config.uploadPath;
    // 3. 指定文件的后缀
    form.keepExtensions = true;

    // 解析 request 发送过来的数据
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        };
        console.log(fields);
        console.log(files);

        //  1. 获取普通数据
        let body = fields;
        //  2. 根据id查询文档
        User.findById(body.token, (err, data)=>{
            if(err){
                return next(err);
            };

            // 修改文档的内容
            data.real_name = body.real_name;
            data.icon_url = body.icon_url || basename(files.icon_url.path);
            data.phone = body.phone;
            data.email = body.email;
            data.join_time = body.join_time;
            data.intro_self = body.intro_self;

            // 保存到数据库
            data.save((err, result)=>{
                if(err){
                    return next(err);
                };
                res.json({
                    status: 200,
                    result: '修改用户信息成功！'
                })
            });
        });
    });
});

/**
 * 根据 token 修改密码
 */
router.post('/back/user/api/reset', (req, res, next)=>{
    // 获取数据
    const  token = req.body.token;
    const  old_pwd = req.body.old_pwd;
    const  new_pwd = req.body.new_pwd;

    // 根据 token 查询用户
    User.findById(token, (err, data)=>{
        if(err){
            return next(err);
        };

        if(data){
            // 取出散列做比较
            if(data.user_pwd !== old_pwd){
                res.json({
                    status: 1,
                    result: '密码不正确！'
                });
            }else {
                data.user_pwd = new_pwd;
                data.save((err, result)=>{
                    if(err){
                        return next(err);
                    };
                    res.json({
                        status: 200,
                        result: '密码修改成功！'
                    });
                });
            }
        }else {
            res.json({
                status: 1,
                result: '非法用户！'
            });
        };

    })

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