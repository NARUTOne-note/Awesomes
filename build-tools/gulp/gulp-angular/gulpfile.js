var gulp = require('gulp'),
  bowerFiles = require('main-bower-files'), 
  jshint = require('gulp-jshint'), 
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  stripDebug = require('gulp-strip-debug'),
  inject = require('gulp-inject'),
  less = require('gulp-less'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  cache = require('gulp-cache'),  
  templateCache = require('gulp-angular-templatecache')
  ngAnnotate = require('gulp-ng-annotate')
  connect = require('gulp-connect');;
	

var paths = {
  js: ['./app/js/app.js', './app/js/**/*.js'],
  less: ['./app/style/less/*.less'],
  css: ['./app/style/css/*.css'],
  images: ['./app/images/*'],
  templates: './app/js/templates.js',
  buildjs: ['./build/**/*.js'],
  buildcss: ['./build/**/*.css']  
};

var Environment = { PROD: 'prod', DEV: 'dev' };

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['./build', paths.templates]);
});

gulp.task('jshint', function() {
  gulp.src(paths.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('template', function () {
  return gulp.src('./app/template/**/*.html')
      .pipe(templateCache({module: 'myApp'}))
      .pipe(gulp.dest('./app/js'))
      .pipe(connect.reload());
});

gulp.task('devIndex', function () {
  return gulp.src('./index.html')
      .pipe(
        inject(
          gulp.src(paths.js, {read: false}),
          {relative: true}
        )
      )
      .pipe(
        inject(
          gulp.src(paths.css, {read: false}),
          {relative: true}
        )
      )
      .pipe(
        inject(
          gulp.src(bowerFiles(), {read: false}),
          {name: 'bower', relative: true}
        )
      )
      .pipe(gulp.dest('./'));
});

gulp.task('deployIndex', ['deployJS', 'css', 'images'], function () {
  return gulp.src('./index.html')
      .pipe(
          inject(
              gulp.src(paths.buildjs, {read: false}),
              {relative: true}
          )
      )
      .pipe(
          inject(
              gulp.src(paths.buildcss, {read: false}),
              {relative: true}
          )
      )
      .pipe(
          inject(
            gulp.src(bowerFiles(), {read: false}),
            {name: 'bower', relative: true}
          )
      )
      .pipe(gulp.dest('./'));
});
 
gulp.task('deployJS', function() {
  if (deployEnvironment == Environment.DEV) { // DEV
    return gulp.src(paths.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
  } else { // PROD
    return gulp.src(paths.js)
    		.pipe(ngAnnotate())
        .pipe(sourcemaps.init())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
  }
});

//gulp.task('deployCSS', function() {
//return gulp.src(paths.css)
//    .pipe(cssmin())
//    .pipe(concat('all.css'))
//    // .pipe(rename({suffix: '.min'}))
//    .pipe(gulp.dest('./build'));
//});

//less ——> css
gulp.task('less', function(){
	return gulp.src(paths.less)
		.pipe(less())
		.pipe(gulp.dest('./app/style/css'))
		.pipe(connect.reload());
});

//css min
gulp.task('css',['less'], function(){
	 return gulp.src(paths.css)
      .pipe(cssmin())
      .pipe(concat('all.css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./build'))
      .pipe(connect.reload());
});

// images
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

// gulp.task('deployBower', function() {
//   gulp.src(bowerFiles())
//       .pipe(concat('bower.all.js')) 
//       .pipe(gulp.dest('./build'))
// });

gulp.task('service', function () {
  connect.server({
    root: ['.', 'build','app'],
    port: 3001,
    livereload: true
  });
});

gulp.task('deploy', ['template', 'deployIndex'], function(){
	return gulp.src('./app').pipe(connect.reload());
});

gulp.task('develop', ['less', 'images', 'devIndex'],function(){
	return gulp.src('./app').pipe(connect.reload());
});

var deployEnvironment = Environment.DEV;
// 监视

//var deployEnvironment = Environment.PROD;
// set target environment
if(deployEnvironment == 'dev') {
	gulp.task('watch', function() {
		gulp.watch('./app/style/less/*.less', ['deploy']);
		gulp.watch('./app/js/*.js', ['deploy']);
		gulp.watch('./app/images/*', ['deploy']);
		gulp.watch('./app/template/*.html', ['deploy']);
	});
	gulp.task('default', ['clean', 'jshint', 'develop', 'watch', 'service']);
	
}
else {
	gulp.task('watch', function() {
		gulp.watch('./app/*', ['deploy']);
	});
	gulp.task('default', ['clean', 'jshint', 'deploy', 'watch', 'service']);
}

