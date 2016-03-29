// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var ngAnnotate = require ('gulp-ng-annotate');

var config = require('./gulp-config.json');

gulp.task('vendorcss', function(){
    return gulp.src(config.paths.vendorcss)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('vendorjs', function(){
    return gulp.src(config.paths.vendorjs)       
        .pipe(concat('vendor.js'))
        .pipe(ngAnnotate({add: true}))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('vendorfonts', function(){
    return gulp.src(config.paths.vendorfonts)
        .pipe(gulp.dest('./assets/fonts/'));
});

// Lint Task
gulp.task('scripts', function() {
    return gulp.src(config.paths.localjs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(ngAnnotate({add: true}))
        .pipe(gulp.dest('./assets/js/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/css/'));
});



gulp.task('minify-html', function() {
  return gulp.src('src/partials/*.html')
    .pipe(gulp.dest('./assets/partials/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./assets/partials/'))
});

gulp.task('minify-cshtml', function() {
  return gulp.src('src/partials/*.cshtml')
    .pipe(gulp.dest('./assets/partials/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./assets/partials/'))
});

gulp.task('minify-convert-cshtml', function() {
  return gulp.src('src/partials/*.cshtml')
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./assets/partials/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./assets/partials/'))
});

gulp.task('images', function() {
    gulp.src('src/images/**/*.{png,svg,gif,jpg}')
        .pipe(gulp.dest('./assets/images/'))
    })

// Clean
gulp.task('clean', function() {
    return del(['assets/css', 'assets/js', 'assets/partials']);
});

//Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'minify-html', 'minify-cshtml', 'minify-convert-cshtml');
});

//Watch
gulp.task('default',function() {
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/partials/*.html', ['minify-html']);
    gulp.watch('src/partials/*.cshtml', ['minify-cshtml']);
    gulp.watch('src/partials/*.cshtml', ['minify-convert-cshtml']);
    gulp.watch('src/images/**/*.{png,svg,gif,jpg}', ['images']);
});
