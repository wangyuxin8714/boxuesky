var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd");

var book = "book";
var userBase = "userBase";
var fict = "fict";
var bookrack = "bookrack";
var comment = "comment";
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

//更新阅读量
router.post('/api/updatefict', function(req, res, next) {
	console.log(req.body)
    mongo.update(book, fict,[{"_id":req.body.xid},{"sum":req.body.sum},{upsert:true}], function(result) {
		res.send({ code: 1, msg:"修改成功" })
    })
});

//分类查询  连载  完本
router.post('/api/findPart', function(req, res, next) {
	var  page = req.body.page;
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



//添加坪论
router.post('/api/insertcomment', function(req, res, next) {
    if (!req.body.uid || !req.body.name || !req.body.val || !req.body.xid) {
        res.send({ code: 0, msg: "添加失败" })
    } else {
        mongo.insert(book, comment, req.body, function(result) {
            res.send({ code: 1, msg: "添加成功" })
        })
    }
});

//查询评论
router.post('/api/findcomment', function(req, res, next) {
    mongo.find(book, comment, {"xid":req.body.xid}, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "查不到" })
        } else {
            res.send({ code: 1, data:result})
        }
    },{
		sort:{
			"_id":-1
		}
	})
});


//添加书架
router.post('/api/insertBookrack', function(req, res, next) {
    if (!req.body.uid || !req.body.bookName || !req.body.coverUrl || !req.body.authorName|| !req.body.bid|| !req.body.firstCid|| !req.body.xid) {
        res.send({ code: 0, msg: "添加失败" })
    } else {
		mongo.find(book,bookrack,{"uid":req.body.uid,"bookName":req.body.bookName},function(result){
			console.log(result)
			if(result.length===0){
				mongo.insert(book, bookrack, req.body, function(result) {
					res.send({ code: 1})
				})
			}else{
				res.send({code:2,msg:"已添加"})
			}
		})
    }

});

//个人书架查询
router.post('/api/findBookrack', function(req, res, next) {
    mongo.find(book, bookrack, { "uid": req.body.uid }, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "找不到" })
        } else {
            res.send({ code: 1, data: result })
        }
    },{
		sort:{
			"_id":-1
		}
	})
});

//删除个人书架里的书
router.post('/api/deleteBookrack', function(req, res, next) {
    mongo.remove(book, bookrack, { "_id": req.body.id,}, function(result) {
        if (result.deletedCount === 0) {
            res.send({ code: 0, msg: "删除失败" })
        } else {
            res.send({ code: 1, msg: "删除成功" })
        }
    })
});

















































module.exports = router;