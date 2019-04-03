require.config({
	paths: {
		"mui": "./libs/mui.min",
		"swiper":"./libs/swiper.min"
	}
})


require(["mui","swiper"], function(mui,Swiper) {
	
	var swiper=new Swiper("#swiper",{
		autoplay:{
			delay:1000
		},
		loop:true,
		pagination: {
			el: '.swiper-pagination',
			clickable:true
		},
	})
	
	let uid=localStorage.getItem("id");
	let nav = document.querySelector('.nav');
	let scro = document.querySelector('.scro');

	
	var page = 1;
	let pageSize = 10;
	var bton=[...document.querySelectorAll(".yw-data button")]
	
	var txt=[...document.querySelectorAll(".yw-data button")][0].getAttribute("data-main")
	function init() {
		render(txt,page++)
	}
	
	//是否登录
	if(!uid){
		location.href = '../page/login.html'
	}
	
	//网站简介
	details.addEventListener('tap', () => {
		location.href = '../page/details.html'
	})
	//登录页面
	let login=document.querySelector('.login');
	login.addEventListener('tap',()=>{
		location.href = '../page/login.html'
	})
	
	//tab切换
	mui(".yw-data").on("tap","button",function(){
		for(let i=0;i<bton.length;i++){
			bton[i].classList.remove("active")
		}
		this.classList.add("active")
		nav.innerHTML ='';
		txt=this.getAttribute("data-main");

		page=1
		render(txt,page++)
	})
	
	

	//渲染页面
	function render(tet,page) {
		if(tet==="2"){
			console.log(page)
			mui.ajax('/api/findFiction', {
				data: {
					page: page,
					pageSize: pageSize
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				success: function(data) {
					ranlist(data)
			
					
				}
			});
		}else if(tet==="0"){
				mui.ajax('/api/findPart', {
				data: {
					page: page,
					pageSize: pageSize,
					text: tet
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				success: function(data) {
					console.log(data)
					
				ranlist(data)
				}
			});
		}else{
				mui.ajax('/api/findPart', {
				data: {
					page: page,
					pageSize: pageSize,
					text: tet
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				success: function(data) {
					console.log(data)
					ranlist(data)
					
				}
			});
			
			
		}
		
	}

function ranlist(data){
	if(data.code==0){
		return mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了
	}
	mui('#pullrefresh').pullRefresh().refresh(true);//重置上拉加载
	mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); 
	nav.innerHTML+= data.data.map(val => {
		return `<div class="nav-img" data-id="${val._id}">
				<div class="left">
					<img src="${val.coverUrl}" >
				</div>
				<div class="right">
					<h3>${val.bookName}</h3>
					<p>${val.authorName}</p>
					<p>${val.updateStateName}</p>
					<p>${val.description}</p>
				</div>
			</div>`
	}).join('')
	liclick()
}


var spa=document.querySelectorAll(".navtab span")
mui(".navtab").on("tap","span",function(){
	for(let i=0;i<spa.length;i++){
		spa[i].classList.remove("act")
	}
	this.classList.add("act")
	if(this.innerHTML==="书架"){
		location.href="page/bookrack.html"
	}
})



		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				up: {
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});

		
	function pullupRefresh() {
		setTimeout(function() {
			render(txt,page++)

		});
	}

	function liclick(){
		
		mui(".nav").on("tap",".nav-img",function(){
			localStorage.setItem("xid",this.getAttribute("data-id"));
			location.href="./page/inside.html";
		})
	}

	


	init()
})
