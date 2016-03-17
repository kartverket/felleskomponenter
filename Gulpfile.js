// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var ngAnnotate = require ('gulp-ng-annotate');

var config = require('./gulp-config.json');

gulp.task('vendorcss', function(){
    return gulp.src(config.paths.vendorcss)
        .pipe(concat('vendor.min.css'))
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
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/css/'));
});


// Clean
gulp.task('clean', function() {
    return del(['assets/css', 'assets/js']);
});

//Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

//Watch
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
});
