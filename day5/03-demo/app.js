const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const morgan = require('morgan');
const path = require('path');

let app = express();

// 注册模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置全局变量，运用于服务器的整个生命周期
let entries = [];
app.locals.entries = entries;

// 设置用户表单提交数据的接收中间件，所有提交的信息都会保留在req。body中
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res)=>{
   res.render('index');
});

app.get('/new', (req, res)=>{
    res.render('new');
});

// 数据提交
app.post('/new', (req, res)=>{
    // console.log(req.body);
    if(!req.body.title || !req.body.content){
        res.status(400).send('留言必须要有标题和内容');
        return ;
    }

    // 保存用户的留言数据
    entries.push({
        title: req.body.title,
        content: req.body.content,
        published: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    });

    console.log(entries);

    // 回到主界面，重定向
    res.redirect('/')

})

// 走到最后都没匹配上，走404页面
app.use((req, res)=>{
    res.status(404).render('404');
})

app.listen(3000, ()=>{
    console.log('服务器已启动');
})