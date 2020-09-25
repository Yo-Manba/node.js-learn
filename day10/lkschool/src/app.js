// const express = require('express');
import express from "express"
import nunjucks from "nunjucks"
import config from "./config"
import bodyParser from "./../middleware/body_parser"
import errorLog from "./../middleware/error_log"
import loginPass from "./../middleware/login_pass"

// 引入 express-session
import session from 'express-session'
// 引入 connect-mongo 用于 express 连接数据库存储 session
const mongoStore = require('connect-mongo')(session);

// 3. 引入路由
import indexRouter from './../routes/index'
import sowingRouter from './../routes/sowing'
import userRouter from './../routes/user'

const app = express();

// 使用session
app.use(session({
    secret: 'itlike',   // 加密字符串
    name: 'like_id',    // 返回客户端 key 的名称，默认为 connect_sid
    resave: false,      // 强制保存 session，即使他没有变化
    saveUninitialized: true,    // 强制将未初始化的 session 存储。当新建一个 session 并且未设定属性或值时，它就处于未初始化状态。在设定 cookie 前，这对于登录验证，减轻服务器存储压力，权限控制是有帮助的，默认为 true.
    cookie: { maxAge: 864000000},
    rolling: true,      // 在每次请求时进行设置 cookie，将重置 cookie 过期时间
    store: new mongoStore({     // 将 session 数据存储到 mongo 数据库中
        url: 'mongodb://127.0.0.1/college',     // 数据库地址
        touchAfter: 24 * 3600   // 多长时间往数据库中更新存储一次，除了在会话数据上更改了某些数据除外
    })
}))

// 1. 配置公共资源访问路径
app.use(express.static(config.publicPath));

// 2. 配置 nunjucks 中间件 （使 nunjucks 模板引擎能够作用到 views 文件夹中的模板）
nunjucks.configure(config.viewsPath, {
    autoescape: true,
    express: app,
    noCache: true,  // 如果为 true，不使用缓存，模板每次都会重新编译。
});

// 配置数据处理的中间件
app.use(bodyParser);

// 配置后端拦截中间件
app.use(loginPass);

// 4. 挂载路由
app.use(indexRouter);
app.use(sowingRouter);
app.use(userRouter);

// 5. 挂在错误中间件
app.use(errorLog);

app.use((req, res)=>{
    res.render('404.html');
})

app.listen(3000, ()=>{
    console.log('server is running');
})