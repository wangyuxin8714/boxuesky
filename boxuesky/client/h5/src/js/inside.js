require.config({
	paths:{
		"mui":"./libs/mui.min"
	}
})


require(["mui"],function(mui){
	var xid=localStorage.getItem("xid");
	var head=document.querySelector("#head")
	
	
	
	rander()
	function rander(){
		mui.ajax('/api/finddetails',{
			data:{
				xid:xid
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(res){
				head.innerHTML=res.data.map(item=>{
					return `<div class="header">
								<div class="left">
									<img src="http:${item.coverUrl}">
								</div>
								<div class="right">
									<h3>${item.bookName}</h3>
									<p>${item.authorizerName}<span>${item.authorName}</span></p>
									<p>${item.tags}</p>
									<p>${item.categoryName}|${item.updateStateName}</p>
								</div>
							</div>
							<div class="btn">
								<button type="button">免费阅读</button>
								<button type="button" id="bookrack">加入书架</button>
								<button type="button">VIP订阅</button>
							</div>
							<div class="rote">
								<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.description}</p>
							</div>`
				}).join("")
					bindEvent()
				
				
			}
		})
	}
	let bindEvent = function () {
		mui(".main").on('tap','#bookrack',function () {
			window.location.href = "../page/bookrack.html"
		})
	}
	
})