require.config({
	paths: {
		"mui": "./libs/mui.min"
	}
})


require(["mui"], function(mui) {

	var booklist = document.querySelector(".book-list");
	var uid = localStorage.getItem("id")


	mui.init({
		gestureConfig: {
			tap: true, //默认为true
			doubletap: true, //默认为false
			longtap: true, //默认为false
			swipe: true, //默认为true
			drag: true, //默认为true
			hold: true, //默认为false，不监听
			release: true //默认为false，不监听
		}
	});


	function init() {
		commrander()
	}

	function commrander() {
		mui.ajax('/api/findBookrack', {
			data: {
				uid: uid
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				booklist.innerHTML = res.data.map(item => {
					return `<li class="mui-table-view-cell lis">
								<div class="imgs"  data-bid="${item.bid}">
									<h3><img src="${item.coverUrl}"></h3>
									<p>${item.bookName}</p>
								</div>
								<span><b class="clickB" data-id="${item._id}">删除</b></span>
							</li>`
				}).join("")
			}
		})
		bindEvent()
	}

var spa=document.querySelectorAll(".navtab span")
	mui(".navtab").on("tap", "span", function() {
		
		for(let i=0;i<spa.length;i++){
			spa[i].classList.remove("act")
		}
		this.classList.add("act")
		if (this.innerHTML === "书库") {
			location.href = "../index.html"
		}
	})

	function bindEvent() {
		mui(".book-list").on("tap", ".imgs", function(e) {
			console.log(111)
			location.href="https://xs.sogou.com/list/"+this.getAttribute("data-bid")
		})

		mui(".book-list").on("longtap", ".lis", function() {
			var spa = this.querySelector("span");
			spa.style.display = "block";
			var bs = spa.querySelector("b");
			console.log(bs);
			bs.addEventListener("tap", function() {
				console.log(bs.getAttribute("data-id"))
				mui.ajax('/api/deleteBookrack', {
					data: {
						id:bs.getAttribute("data-id")
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(res) {
						console.log(res)
						if (res.code == 1) {
							commrander()
						}
					}
				});
			})


		})
	}



	init()
})
