require.config({
	baseUrl: "../js",
	paths: {
		"mui": "./libs/mui.min"
	}
})

require(["mui"], function(mui) {
	var xid = localStorage.getItem("xid");
	var uid = localStorage.getItem("id");
	var name = localStorage.getItem("name");
	var head = document.querySelector("#head")
	var btn = document.querySelector(".btn");
	var text = document.querySelector("#text");
	var books = document.querySelector(".book")
	var num = document.querySelector(".num")
	
	//初始
	function init() {
		rander()
		commentrander()
		commentclick()
	}

	//详情渲染
	function rander() {
		mui.ajax('/api/finddetails', {
			data: {
				xid: xid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				head.innerHTML = res.data.map(item => {
					return `<div class="header">
								<div class="left">
									<img src="http:${item.coverUrl}">
								</div>
								<div class="right">
									<h3>${item.bookName}</h3>
									<p>${item.authorizerName}<span>${item.authorName}</span></p>
									<p>${item.tags}</p>
									<p>${item.categoryName}|${item.updateStateName}</p>
									<h6 class="yd">阅读量<b class="sum">${typeof item.sum ==="undefined"? 0: item.sum}</b></h6>
								</div>
							</div>
							<div class="btn">
								<button type="button"  data-id="${item.firstCid}" id="mfbook" data-ids="${item._id}">免费阅读</button>
								<button type="button" id="bookrack">加入书架</button>
								<button type="button" id="find" data-id="${item.bid}">查看目录</button>
							</div>
							<div class="rote">
								<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.description}</p>
							</div>`
				}).join("")
				bindEvent()
			}
		})
	}
	
	//点击事件
	let bindEvent = function() {
		var bookName=document.querySelector(".right h3").innerHTML;
		var coverUrl=document.querySelector(".left img").getAttribute("src");
		var authorName=document.querySelector(".right p span").innerHTML
		var mfbook=document.querySelector("#mfbook")
		var firstCid=mfbook.getAttribute("data-id")
		var find=document.querySelector("#find")
		var bid=find.getAttribute("data-id")
		// var id=mfbook.getAttribute("data-ids")
		var sum=document.querySelector(".sum").innerHTML;
		
		//免费阅读
		mfbook.addEventListener("tap",function(){
			sum++

			mui.ajax('/api/updatefict',{
				data:{
					xid:xid,
					sum:sum
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					if(res.code===1){
						rander()
					}
				}
			})
	window.location.href ="https://xs.sogou.com/chapter/"+bid+"_"+firstCid+"/";

			
	
		})
		
		//查看目录
		find.addEventListener("tap",function(){
			window.location.href ="https://xs.sogou.com/list/"+bid
		})
		
		// 将小说添加至书架
		mui(".main").on('tap', '#bookrack', function() {
			mui.ajax('/api/insertBookrack',{
				data:{
					uid:uid,
					bookName:bookName,
					coverUrl:coverUrl,
					authorName:authorName,
					bid:bid,
					xid:xid,
					firstCid:firstCid
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				timeout:10000,//超时时间设置为10秒；
				success:function(res){
					if(res.code==1){
						window.location.href = "../page/bookrack.html";
					}
					mui.alert(res.msg)
				}
			});
			
		})	
	}
	
	//评论渲染
	function commentrander() {
		mui.ajax('/api/findcomment', {
			data: {
				xid: xid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				if (res.code === 1) {
					books.innerHTML = res.data.map(item => {
						return `<dl>
								<dt class="book-left">
									<img src="../images/21.jpg">
								</dt>
								<dd class="book-right">
									<h4>${item.name}</h4>
									<p>${item.val}</p>
									<p>3个小时前</p>
								</dd>
							</dl>`
					}).join("");
					var dls=[...document.querySelectorAll(".book dl")];
					num.innerHTML=dls.length
				}
			}
		});
	}
	
	//添加评论
	function commentclick() {
		btn.addEventListener("tap", function() {
			mui.ajax('/api/insertcomment', {
				data: {
					uid: uid,
					xid: xid,
					name: name,
					val: text.value
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(res) {
					if (res.code === 1) {
						commentrander()
					}
				}
			});
		})
	}


	init()
})
