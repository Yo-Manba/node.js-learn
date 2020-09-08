const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const morgan = require('morgan');
const path = require('path');

let app = express();

// 注册模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
   res.render('index');
});

app.listen(3000, ()=>{
    console.log('服务器已启动');
})