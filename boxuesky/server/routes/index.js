var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd");

var book = "book";
var userBase = "userBase";
var fict = "fict";
var bookrack = "bookrack";
/* GET home page. */

//用户登录
router.post('/api/findUser', function(req, res, next) {
    mongo.find(book, userBase, req.body, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "登录失败" })
        } else {
            res.send({ code: 1, msg: "登陆成功",uid:result[0]._id })
        }
    })
});

//小说查询
router.post('/api/findFiction', function(req, res, next) {
    var  page = req.body.page;
    var  pageSize = req.body.pageSize;
    mongo.find(book, fict, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "找不到" })
        } else {
            res.send({ code: 1, data: result })
        }
    }, {
        skip: (page-1)*pageSize,
        limit: pageSize
    })
});

//小说详情
router.post('/api/finddetails', function(req, res, next) {
    mongo.find(book, fict,{"_id":req.body.xid}, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "找不到" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});

//分类查询  连载  完本
router.post('/api/findPart', function(req, res, next) {
	var  page = req.body.page;
	console.log(page)

	var  pageSize = req.body.pageSize;
    mongo.find(book, fict, { "updateType": req.body.text }, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "找不到" })
        } else {
            res.send({ code: 1, data: result })
        }
    }, {
        skip: (page-1)*pageSize,
        limit: pageSize
    })
});

//添加书架
router.post('/api/insertBookrack', function(req, res, next) {
    console.log(req.body)
    if (!req.body.uid || !req.body.bookName || !req.body.coverUrl || !req.body.authorName) {
        res.send({ code: 0, msg: "添加失败" })
    } else {
        mongo.insert(book, bookrack, req.body, function(result) {
            res.send({ code: 1, msg: "添加成功" })
        })
    }

});

//个人书架查询
router.post('/api/findBookrack', function(req, res, next) {
    console.log(req.body)
    mongo.find(book, bookrack, { "uid": req.body.uid }, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "找不到" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});

//删除个人书架里的书
router.post('/api/deleteBookrack', function(req, res, next) {
    console.log(req.body)
    mongo.remove(book, bookrack, { "_id": req.body.id }, function(result) {
        if (result.deletedCount === 0) {
            res.send({ code: 0, msg: "删除失败" })
        } else {
            res.send({ code: 1, msg: "删除成功" })
        }
    })
});

















































module.exports = router;