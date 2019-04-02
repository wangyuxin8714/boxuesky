var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");

gulp.task("sass",function(){
	return gulp.src("./src/scss/*.scss")
 	.pipe(sass())
 	.pipe(gulp.dest("./src/css"))
 })

gulp.task("webserver",function(){
	gulp.src("./src")
	.pipe(webserver({
		// open:true,
		port:8089,
		livereload:true,
		proxies:[
			{source:"/api/findFiction",target:"http://localhost:3000/api/findFiction"},
			{source:"/api/findPart",target:"http://localhost:3000/api/findPart"},
			{source:"/api/findUser",target:"http://localhost:3000/api/findUser"},
			{source:"/api/finddetails",target:"http://localhost:3000/api/finddetails"},
			{ source: "/api/findBookrack",target:"http://localhost:3000/api/findBookrack"}
		]
	}))
})

gulp.task("watch",function(){
	 gulp.watch("./src/scss/*.scss",gulp.series("sass"))
})

gulp.task("dev",gulp.parallel("sass","webserver","watch"))