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
  sourcemaps = require('gulp-sourcemaps'),
  filenames = require("gulp-filenames");

var jsSources = ['./components/js/scripts.js', './components/js/sw-register.js', './components/js/notifications.js']; //may need to dictate specific concatenation order
var sassSources = ['./components/sass/*.scss'];
var htmlSources = ['./components/**/*.html'];

/***************

Automatically generate service worker with all assets 

***************/

gulp.task('serviceWorker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = './builds/dev';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});

gulp.task('serviceWorkerDist', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = './builds/dist';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});

/**************

Open up browser for builds/dev folder

**************/

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./builds/dev/",
            //Change address below to load different page with browserSync
            index: "index.html"
        }
    });
});

/***************

Inject push notification scripts into builds/dev and builds/dist sw.js

***************/

gulp.task('sw', ['serviceWorker'], function() {
  return gulp.src(['./builds/dev/sw.js', './components/sw-push.js'])
  .pipe(concat('./builds/dev/sw.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./'))
});

gulp.task('swDist', ['serviceWorkerDist'], function() {
  return gulp.src(['./builds/dev/sw.js', './components/sw-push.js'])
  .pipe(concat('./builds/dev/sw.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./builds/dist'))
});

/***************

Move manifest.json to build folders

***************/

gulp.task('manifest', function() {
  return gulp.src('./components/manifest.json')
  .pipe(gulp.dest('./builds/dev'))
});

gulp.task('manifestDist', function() {
  return gulp.src('./components/manifest.json')
  .pipe(gulp.dest('./builds/dist'))
});

/**************

Lint, concatenate, transpile to es5 and sourcemap js files

**************/

gulp.task('js', function() {
  return gulp.src(jsSources)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
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

/**************

Transpile scss to css, lint and autoprefix scss files

**************/

gulp.task('sass', function() {
    return gulp.src(sassSources)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(gulp.dest('./builds/dev/css'))

});

gulp.task('sassDist', function() {
    return gulp.src(sassSources)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(gulp.dest('./builds/dist/css'))
});

/*************

Minify img files

**************/

gulp.task('imgmin', function() {
    return gulp.src('./components/img/**/*.*')
        .pipe(imgmin())
        .pipe(gulp.dest('./builds/dev/img'));
});

gulp.task('imgminDist', function() {
    return gulp.src('./builds/dev/img/**/*.*')
        .pipe(imgmin())
        .pipe(gulp.dest('./builds/dist/img'));
});

/************

Compile partial html files and front matter into build folders 

*************/

gulp.task('panini', function() {
    return gulp.src('./components/pages/**/*.html')
        .pipe(panini({
            root: './components/pages/',
            layouts: './components/layouts/',
            partials: './components/partials/',
            helpers: './components/helpers/',
            data: './components/data/'
        }))
        .pipe(gulp.dest('./builds/dev'));
});

gulp.task('paniniDist', function() {
    return gulp.src('./components/pages/**/*.html')
        .pipe(panini({
            root: './components/pages/',
            layouts: './components/layouts/',
            partials: './components/partials/',
            helpers: './components/helpers/',
            data: './components/data/'
        }))
        
        .pipe(gulp.dest('./builds/dist'));
});

/*************

Automatically generate sitemap with all project pages based on URL below

*************/

gulp.task('sitemap', function() {
    return gulp.src('./builds/dist/**/*.html', {
            read: false
        })
        .pipe(sitemap({
            //Change this to your projects permanent address before deployment
            siteUrl: 'https://github.com/joshboyan/minimal-framework.git'
        }))
        .pipe(gulp.dest('./builds/dist'));
});

/*************

Watch all files for changes and update the browser

*************/

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']).on('change', browserSync.reload);
	gulp.watch(sassSources, ['sass']).on('change', browserSync.reload);
  gulp.watch(htmlSources, ['panini']).on('change', browserSync.reload);
});

/**************

Default commands

**************/

gulp.task('default', ['sw', 'js', 'sass', 'imgmin', 'manifest', 'panini', 'browser-sync', 'watch']);

gulp.task('dist', ['swDist','sassDist', 'jsDist', 'swDist', 'paniniDist', 'imgminDist', 'manifestDist', 'sitemap']);
