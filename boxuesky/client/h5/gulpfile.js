let [
	gulp,
	sass,
	rename,
	minCss,
	autoprefixer,
	webserver
] = [
	require("gulp"),
	require("gulp-sass"),
	require("gulp-rename"),
	require("gulp-clean-css"),
	require("gulp-autoprefixer"),
	require("gulp-webserver")
]

gulp.task("sass",function(){
	return gulp.src("./src/scss/!(bookrack)*.scss")
 	.pipe(sass())
 	.pipe(gulp.dest("./src/css"))
 })

gulp.task("devCss",function (){
	return gulp.src("./src/scss/bookrack.scss")
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(minCss())
	.pipe(rename({
		suffix: ".min"
	}))
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
			{source: "/api/findBookrack",target:"http://localhost:3000/api/findBookrack"}
		]
	}))
})

gulp.task("watch",function(){
	gulp.watch(["./src/scss/bookrack.scss"],gulp.series(["devCss"]))
	gulp.watch("./src/scss/*.scss",gulp.series("sass"))
})

gulp.task("dev",gulp.parallel("sass","webserver","watch"))