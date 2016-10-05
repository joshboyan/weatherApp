var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/*.js']; //may need to dictate specific concatenation order
var sassSources = ['components/sass/*.scss'];

gulp.task('coffee', function() {
	gulp.src(coffeeSources)
	.pipe(coffee({bare: true})
	.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('builds/dev/js'))
});

gulp.task('sass', function () {
  return gulp.src('sassSources')
    .pipe(sass( {
    	outputStyle:'extended'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('builds/dev/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./components/sass/**/*.scss', ['sass']);
});

gulp.task('watch', function() {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
});

gulp.task('default', ['coffee', 'js', 'sass']);