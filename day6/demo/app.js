
// 引入所有的包依赖文件
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入路由文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 创建文本服务器
var app = express();

// 设置模板引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 使用各种中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 处理找不到页面的情况
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 统一错误处理
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
