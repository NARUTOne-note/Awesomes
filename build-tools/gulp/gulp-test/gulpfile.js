var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect')

//gulp任务测试

//gulp.task('task-name', function () {
//return gulp.src('source-files') // 待处理文件
//  .pipe(aGulpPlugin()) // 用Gulp插件处理文件
//  .pipe(gulp.dest('destination')) // 输出到目标文件
//})

gulp.task('test-task', function() {
	console.log('hello world!');
});

//Node globs，Globs是文件匹配模式，允许我们在gulp.src方法里面匹配到多个文件，很像正则表达式吧，区别在于Globs用在文件路径上。

//1、*.scss 匹配当前目录下所有以.scss结尾的文件
//2、**/*.scss 切尔西当前目录及所有子目录下，所有以.scss结尾的文``
//3、!not-me.scss不包含名为not-me.scss文件
//4、*.+(scss|sass) 匹配当前目录下所有以.scss或者.sass结尾的文件

gulp.task('less-test', function() {
	return gulp.src('./app/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('./app/css'))
		.pipe(connect.reload());
});

//gulp watch监听

gulp.task('connect', function() {
  connect.server({
    root: ['.','app'],
    port: 8888,
    livereload: true 
  });
});

gulp.task('watch', function(){
	gulp.watch('./app/less/**/*.less', ['less-test'])
})

gulp.task('default', ['less-test','connect', 'watch']);