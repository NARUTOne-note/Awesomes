var gulp = require('gulp');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var	notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');
var livereload = require('gulp-livereload');

//less ——> css
gulp.task('less', function(){
	return gulp.src('./app/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('./app/css'))
		.pipe(livereload());
});

//css min
gulp.task('css',['less'], function(){
	return gulp.src('./app/css/**/*.css')
		.pipe(concat('style.css'))
		.pipe(rename({suffix:'.min'}))
		.pipe(cleancss())
		.pipe(gulp.dest('build'))
		.pipe(notify({ message: 'less task complete' }));
});

//js min
gulp.task('js', function(){
	return gulp.src('./app/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('build'))
		.pipe(notify({ message: 'js task complete' }))
		.pipe(livereload());
});

// images
gulp.task('images', function() {
  return gulp.src('./app/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'images task complete' }))
});

// Clean
gulp.task('clean', function(cb) {
  del(['build/main.min.js', 'build/style.min.css', 'build/images'], cb)
});

// Default

//gulp.task('default',['clean'], function(){
//	gulp.start('js', 'less', 'css', 'images');
//});//废弃

gulp.task('default', ['clean', 'less', 'css', 'js', 'images', 'watch']);

// 监视
gulp.task('watch', function() {
	// 监视less文件的改动
  gulp.watch('app/less/*.less', ['less']);
	// 监视css文件的改动
	gulp.watch('app/css/*.css', ['css']);
  // 监视js文件的改动
  gulp.watch('app/js/*.js', ['js']);
  // 监视images文件的改动
  gulp.watch('app/images/*', ['images']);
  // 创建浏览器自动刷新服务器
  livereload.listen();
  
  gulp.watch(['build/**/*.*']).on('change', livereload.changed);
});
