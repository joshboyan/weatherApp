var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
 	autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-html'),
    imgmin = require('gulp-imagemin'),
    concat = require('gulp-concat');

var coffeeSources = ['./components/coffee/*.coffee'];
var jsSources = ['./components/scripts/*.js']; //may need to dictate specific concatenation order
var sassSources = ['./components/sass/*.scss'];
var htmlSources = ['./builds/dev/*.html']
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

gulp.task('jsDist', function () {
        gulp.src(jsSources)
        .pipe(uglify())
        .pipe(gulp.dest('builds/dist/js'))
});

gulp.task('sass', function () {
  return gulp.src(sassSources)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
    .pipe(gulp.dest('./builds/dev/css'))
});

gulp.task('sassDist', function () {
  return gulp.src(sassSources)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
    .pipe(gulp.dest('./builds/dist/css'))
});

gulp.task('html', function() {
	gulp.src(htmlSources)
	.pipe(minify())
	.pipe(gulp.dest('./builds/dist'))
});

gulp.task('imgmin', function() {
	gulp.src('builds/dev/img/**/*.*')
	.pipe(imgmin())
	.pipe(gulp.dest('./builds/dist/img'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "builds/dev/index.html"
        }
    });
});

gulp.task('watch', function() {
	gulp.watch(htmlSources, ['html']).on('change', browserSync.reload);
	gulp.watch(coffeeSources, ['coffee']).on('change', browserSync.reload);
	gulp.watch(jsSources, ['js', 'jsDist']).on('change', browserSync.reload);
	gulp.watch(sassSources, ['sass', 'sassDist']).on('change', browserSync.reload);
});

gulp.task('default', ['coffee', 'js', 'sass', 'browser-sync', 'sassDist','jsDist', 'html', 'watch']);