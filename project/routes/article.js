var express = require('express');
var router = express.Router();
var model = require('../model');
var multiparty = require('multiparty');
var fs = require('fs');

/* GET users listing. */

//新增，编辑
router.post('/add', (req, res, next) => {
    var id = parseInt(req.body.id);
    if (id) { //编辑
        var page = req.body.page;
        var title = req.body.title;
        var content = req.body.content;
        model.connect(db => {
            db.collection('articles').updateOne({ id: id }, {
                $set: {
                    title: title,
                    content: content
                }
            }, (err, ret) => {
                if (err) {
                    console.log('修改失败', err);
                } else {
                    console.log('修改成功');
                    res.redirect('/?page=' + page);
                }
            })
        })
    } else {
        var data = {
            title: req.body.title,
            content: req.body.content,
            id: Date.now(),
            username: req.session.username
        }
        model.connect(db => {
            db.collection('articles').insertOne(data, (err, ret) => {
                if (err) {
                    console.log('文章发布失败');
                    res.redirect('/write');
                } else {
                    res.redirect('/');
                }
            })
        })
    }

})

//删除
router.get('/delete', (req, res, next) => {
    var id = parseInt(req.query.id);
    var page = req.query.page;
    model.connect(db => {
        db.collection('articles').deleteOne({ id: id }, (err, ret) => {
            if (err) {
                console.log('删除失败');
            } else {
                console.log('删除成功');
            }
            res.redirect('/?page=' + page);
        })
    })
})

router.post('/upload', (req, res, next) => {
    var form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log('上传失败', err);
        } else {
            console.log('文件列表', files)
            var file = files.filedata[0];

            var rs = fs.createReadStream(file.path);
            var newPath = '/upload/' + file.originalFilenanme;
            var ws = fs.createWriteStream('./public' + newPath);
            rs.pipe(ws);
            ws.on('close', () => {
                console.log('文件上传成功')
                res.send({ err: '', msg: newPath })
            })
        }
    })
})


module.exports = router;