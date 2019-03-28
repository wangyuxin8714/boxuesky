var express = require('express');
var router = express.Router();
var mongo=require("mongodb-curd");

var book="book";
var userBase="userBase";
console.log(userBase)
var fict="fict";
console.log(fict);
var bookrack="bookrack";
/* GET home page. */

//用户登录
router.post('/api/findUser',function(req, res, next) {
	mongo.find(book,userBase,req.body,function(result){
		if(result.length===0){
			res.send({code:0,msg:"登录失败"})
		}else{
			res.send({code:1,msg:"登陆成功"})
		}
	})
});

//小说查询
router.post('/api/findFiction',function(req, res, next) {
	mongo.find(book,fict,function(result){
		if(result.length===0){
			res.send({code:0,msg:"找不到"})
		}else{
			res.send({code:1,data:result})
		}
	})
});

//分类查询  连载  完本
router.post('/api/findPart',function(req, res, next) {
	mongo.find(book,fict,{"updateType":req.body.updateType},function(result){
		if(result.length===0){
			res.send({code:0,msg:"找不到"})
		}else{
			res.send({code:1,data:result})
		}
	})
});

//添加书架
router.post('/api/insertBookrack',function(req, res, next) {
	if(req.body.uid===""&&req.body.bookName===""&&req.body.coverUrl===""){
		res.send({code:0,msg:"添加失败"})
	}
	mongo.insert(book,fict,req.body,function(result){
		res.send({code:1,msg:"添加成功"})
	})
});

//个人书架查询
router.post('/api/findBookrack',function(req, res, next) {
	mongo.find(book,fict,{"uid":req.body.uid},function(result){
		if(result.length===0){
			res.send({code:0,msg:"找不到"})
		}else{
			res.send({code:1,data:result})
		}
	})
});

//删除个人书架里的书
router.post('/api/deleteBookrack',function(req, res, next) {
	mongo.remove(book,fict,{"_id":req.body.id},function(result){
		if(result.deletedCount===0){
			res.send({code:0,msg:"删除失败"})
		}else{
			res.send({code:1,msg:"删除成功"})
		}
	})
});

















































module.exports = router;
