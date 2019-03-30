require.config({
	paths: {
		"mui": "./libs/mui.min"
	}
})


require(["mui"], function(mui) {

	let nav = document.querySelector('.nav');
	let page = 1;
	let pageSize = 30;

	function init() {
		render(page,pageSize)
		muiInit();
		tab()
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

	function muiInit() {
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				up: {
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
	}

	function pullupRefresh() {
		setTimeout(function() {
			render(page++,pageSize)
		});
	}

	//渲染页面
	function render(page,pageSize) {
		mui.ajax('/api/findFiction', {
			data: {
				page: page,
				pageSize: pageSize
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			success: function(data) {
				if(data.data.code==0){
					return mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); 
				nav.innerHTML+= data.data.map(val => {
					return `<div class="nav-img">
								<div class="left">
									<img src="${val.coverUrl}" >
								</div>
								<div class="right">
									<h3>${val.bookName}</h3>
									<p>${val.authorName}</p>
									<p>${val.description}</p>
								</div>
							</div>`
				}).join('')
			}
		});
	}

	//tab
	function tab() {
		let btns = document.querySelectorAll('.yw-data button');
		let updateType = null;
		let count = 0;
		btns.forEach((val, i) => {
			val.addEventListener('tap', () => {
				btns[count].classList.remove('active');
				val.classList.add('active');
				count = i;
				if (i == 0) {
					return render()
				}
				type(i - 1)

			});
		})

	}

	function type(i) {
		nav.innerHTML ='';
		mui.ajax('/api/findPart', {
			data: {
				updateType: i
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			success: function(data) {
				nav.innerHTML  += data.data.map(val => {
					return `<div class="nav-img">
							<div class="left">
								<img src="${val.coverUrl}" >
							</div>
							<div class="right">
								<h3>${val.bookName}</h3>
								<p>${val.authorName}</p>
								<p>${val.description}</p>
							</div>
						</div>`
				}).join('')
			}
		});
	}

	init()
})
