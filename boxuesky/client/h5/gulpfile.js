var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");

gulp.task("sass",function(){
	return gulp.src("./src/scss/*.scss")
 	.pipe(sass())
 	.pipe(gulp.dest("./src/css"))
 })
// 错误
// gulp.task("webserver",function(){
// 	glup.src("./src")
// 	.pipe(webserver({
// 		open:true,
// 		port:8089,
// 		livereload:true,
// 		proxies:[
// 			{source:"/api/getBill",target:"http://localhost:3000/api/getBill"},
// 			{source:"/api/getLogin",target:"http://localhost:3000/api/getLogin"}
// 		]
// 	}))
// })

gulp.task("webserver",function(){
	gulp.src("./src")
	.pipe(webserver({
		//open:true,
		port:8089,
		livereload:true,
		proxies:[
			{source:"/api/findFiction",target:"http://localhost:3000/api/findFiction"},
			{source:"/api/findPart",target:"http://localhost:3000/api/findPart"},
		]
	}))
})

gulp.task("watch",function(){
	 gulp.watch("./src/scss/*.scss",gulp.series("sass"))
})

gulp.task("dev",gulp.parallel("sass","webserver","watch"))