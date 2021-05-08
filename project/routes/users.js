var express = require('express');
var router = express.Router();
var model = require('../model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//注册接口
router.post('/regist', (req, res, next) => {
    var data = {
            username: req.body.username,
            password: req.body.password,
            password2: req.body.password2,
            username2: req.body.username2,
            phone: req.body.phone,
            email: req.body.email,
            sex: req.body.sex,
            class: req.body.class,
            hobby: req.body.hobby
        }
        //数据校验
    model.connect(db => {
        db.collection('users').insertOne(data, (err, result) => {
            if (err) {
                console.log('注册失败！');
                res.redirect('/regist');
            } else {
                res.redirect('/login')
            }
        })
    })
})

//登入接口
router.post('/login', (req, res, next) => {
    var data = {
        username: req.body.username,
        password: req.body.password
    }
    model.connect(db => {
        db.collection('users').find(data).toArray((err, dosc) => {
            if (err) {
                res.redirect('/login');
            } else {
                if (dosc.length > 0) {
                    //登入成功，进行session会话存储
                    req.session.username = data.username;
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                }
            }
        })
    })
    console.log('用户登入', data);
})

//退出登录
router.get('/logout', (req, res, next) => {
    req.session.username = null;
    res.redirect('/login');
})

module.exports = router;