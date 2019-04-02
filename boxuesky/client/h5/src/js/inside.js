require.config({
	baseUrl : "../js",
	paths:{
		"mui":"libs/mui.min"
	}
})

require(["mui"],function(mui){
	let bindEvent = function () {
		mui(".main").on('tap','#bookrack',function () {
			window.location.href = "../page/bookrack.html"
		})
	}
	bindEvent()
})