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
var es = require ('event-stream');

// Include source reference object
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
    });

gulp.task('component-images', function () {
  return es.merge(config.paths.component_images.map(function (component) {
    return gulp.src(component.src)
    .pipe(gulp.dest(component.dest));
    }));
  });


// Clean
gulp.task('clean', function() {
    return del(['assets/css', 'assets/js', 'assets/partials', 'assets/images']);
    });

//Default task
gulp.task('default', ['clean'], function() {
    gulp.start(
        'vendorcss',
        'vendorjs',
        'vendorfonts',
        'styles',
        'scripts', 
        'minify-html', 
        'minify-cshtml', 
        'minify-convert-cshtml', 
        'images', 
        'component-images');
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/partials/*.html', ['minify-html']);
    gulp.watch('src/partials/*.cshtml', ['minify-cshtml']);
    gulp.watch('src/partials/*.cshtml', ['minify-convert-cshtml']);
    gulp.watch('src/images/**/*.{png,svg,gif,jpg}', ['images']);
    });