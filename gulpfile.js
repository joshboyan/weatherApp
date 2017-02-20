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
  sitemap = require('gulp-sitemap'),
  replace = require('gulp-replace'),
  browserify = require('gulp-browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps');

var jsSources = ['./components/js/*.js']; //may need to dictate specific concatenation order
var sassSources = ['./components/sass/*.scss'];
var htmlSources = ['./components/**/*.html'];

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            //Change address below to load different page with browserSync
            index: "builds/dev/index.html"
        }
    });
});

gulp.task('js', function() {
  return gulp.src(jsSources)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./builds/dev/js'))
});

gulp.task('jsDist', function() {
  return gulp.src(jsSources)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('scripts.js'))
    .pipe(browserify({
      insertGlobals: true
    }))
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
gulp.task('panini', function() {
  gulp.src(htmlSources)
    .pipe(panini({
      root: './components/pages/',
      layouts: './components/layouts/',
      partials: './components/partials/',
      helpers: './components/helpers/',
      data: './components/data/'
    }))
    .pipe(replace(/(js\/)/g, './builds/dev/js/'))
    .pipe(replace(/(css\/)/g, './builds/dev/css/'))
    .pipe(replace(/(img\/)/g, './builds/dev/img/'))
    .pipe(gulp.dest('./builds/dev'));
});

gulp.task('paniniDist', function() {
  gulp.src(htmlSources)
    .pipe(panini({
      root: './components/pages/',
      layouts: './components/layouts/',
      partials: './components/partials/',
      helpers: './components/helpers/',
      data: './components/data/'
    }))
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
	gulp.watch(jsSources, ['js']).on('change', browserSync.reload);
	gulp.watch(sassSources, ['sass']).on('change', browserSync.reload);
  gulp.watch(htmlSources, ['panini']).on('change', browserSync.reload);
});

gulp.task('default', ['js', 'sass', 'panini', 'browser-sync',  'imgmin', 'watch']);

gulp.task('dist', ['sassDist','jsDist', 'paniniDist', 'imgminDist', 'sitemap']);
