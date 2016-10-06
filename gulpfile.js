var gulp = require('gulp'),
    sass = require('gulp-sass'),
 	autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-html'),
    imgmin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    panini = require('panini'),
    sitemap = require('gulp-sitemap');


var jsSources = ['./components/js/*.js']; //may need to dictate specific concatenation order
var sassSources = ['./components/sass/*.scss'];
var htmlSources = ['./builds/dev/*.html'];

gulp.task('panini', function() {
  gulp.src('./components/pages/**/*.html')
    .pipe(panini({
      root: './components/pages/',
      layouts: './components/layouts/',
      partials: './components/partials/',
      helpers: './components/helpers/',
      data: './components/data/'
    }))
    .pipe(gulp.dest('./builds/dev'));
});

gulp.task('lint', function() {
  return gulp.src('./components/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(babel({
            presets: ['es2015']
        }))
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('./builds/dev/js'))
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
	.pipe(gulp.dest('./builds/dist'));
});

gulp.task('imgmin', function() {
    gulp.src('./components/img/**/*.*')
    .pipe(imgmin())
    .pipe(gulp.dest('./builds/dev/img'));
});

gulp.task('imgminDist', function() {
	gulp.src('./builds/dev/img/**/*.*')
	.pipe(imgmin())
	.pipe(gulp.dest('./builds/dist/img'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "builds/dev/index.html"
        }
    });
});

gulp.task('sitemap', function () {
    gulp.src('./builds/dist/**/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'https://github.com/joshboyan/minimal-framework.git'
        }))
        .pipe(gulp.dest('./builds/dist'));
});

gulp.task('watch', function() {
	gulp.watch(['./components/{layouts,partials,helpers,data}/**/*'], [panini.refresh]);
	gulp.watch(htmlSources, ['html']).on('change', browserSync.reload);
	gulp.watch(jsSources, ['js', 'jsDist']).on('change', browserSync.reload);
	gulp.watch(sassSources, ['sass', 'sassDist']).on('change', browserSync.reload);
});

gulp.task('default', ['panini', 'js', 'sass', 'browser-sync',  'imgmin', 'watch']);

gulp.task('dist', ['sassDist','jsDist', 'html', 'imgminDist', 'sitemap'])