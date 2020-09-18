// const express = require('express');
import express from "express"
import config from "./config"
import nunjucks from "nunjucks"

// 3. 引入路由
import indexRouter from './../routes/index'
import sowingRouter from './../routes/sowing'

const app = express();

// 1. 配置公共资源访问路径
app.use(express.static(config.publicPath));

// 2. 配置 nunjucks 中间件 （使 nunjucks 模板引擎能够作用到 views 文件夹中的模板）
nunjucks.configure(config.viewsPath, {
    autoescape: true,
    express: app,
    noCache: true,  // 如果为 true，不使用缓存，模板每次都会重新编译。
});

// 4. 挂载路由
app.use(indexRouter);
app.use(sowingRouter);

app.use((req, res)=>{
    res.render('404.html');
})

app.listen(3000, ()=>{
    console.log('server is running');
})