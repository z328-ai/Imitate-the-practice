var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//引入自定义模板
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session配置
app.use(session({
    secret: 'keyboard cat', //可更改
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 } //指定会话的有效时长 5分钟
}))

//登入拦截
app.get('*', (req, res, next) => { //'*'指访问该程序
    var username = req.session.username;
    var path = req.path;
    console.log('session', username);
    //如果访问的不是登入或注册页面，则进行拦截
    if (path != '/login' && path != '/regist') {
        if (!username) {
            res.redirect('/login');
        }
    }
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

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