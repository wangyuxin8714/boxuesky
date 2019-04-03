require.config({
	paths:{
		"mui":"./libs/mui.min"
	}
})


require(["mui"],function(mui){
	
	var login=document.querySelector("#login");
	var account=document.querySelector("#account")
	var password=document.querySelector("#password")
	
	login.addEventListener("tap",function(){
		console.log(11111)
		mui.ajax('/api/findUser',{
			data:{
				user:account.value,
				pwd:password.value
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			success:function(res){
				console.log(res.uid)
				if(res.code==1){
					location.href="../index.html";
					localStorage.setItem("id",res.uid)
					localStorage.setItem("name",account.value)
				}else{
					mui.alert(res.msg)
				}
				
			}
		});
	})
	
	
	
})