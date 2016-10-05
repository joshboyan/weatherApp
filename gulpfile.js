var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/*.js']; //may need to dictate specific concatenation order

gulp.task('coffee', function() {
	gulp.src('components/coffee/tagline.coffee')
	.pipe(coffee({bare: true})
		.on('error', gutil.log))
	.pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('builds/dev/js'))
});