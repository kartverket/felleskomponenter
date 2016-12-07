// Include gulp
var gulp = require('gulp');

// Include Plugins
var jshint      = require('gulp-jshint');
var sass        = require('gulp-sass');
var cssnano     = require('gulp-cssnano');
var htmlmin     = require('gulp-htmlmin');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var del         = require('del');
var ngAnnotate  = require ('gulp-ng-annotate');
var es          = require ('event-stream');
var replace     = require('gulp-replace');

// Include source reference object
var config = require('./gulp-config.json');


gulp.task('vendor-styles', function(){
  return gulp.src(config.paths.vendorStyles)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./assets/css/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(cssnano())
  .pipe(gulp.dest('./assets/css/'));
  });

gulp.task('vendor-scripts', function(){
  return gulp.src(config.paths.vendorScripts)       
  .pipe(concat('vendor.js'))
  .pipe(ngAnnotate({add: true}))
  .pipe(gulp.dest('./assets/js/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('./assets/js/'));
  });

gulp.task('vendor-fonts', function(){
  return gulp.src(config.paths.vendorFonts)
  .pipe(gulp.dest('./assets/fonts/'));
  });

gulp.task('vendor-fonts-styles', function(){
  return gulp.src(config.paths.vendorFontsStyles)
  .pipe(concat('vendorfonts.css'))
  .pipe(replace("url(", "url(../fonts/"))
  .pipe(gulp.dest('./assets/css/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(cssnano({discardUnused: {fontFace: false}}))
  .pipe(gulp.dest('./assets/css/'));
  });

gulp.task('vendor-images', function () {
  return es.merge(config.paths.vendorImages.map(function (component) {
    return gulp.src(component.src)
    .pipe(gulp.dest(component.dest));
    }));
  });

gulp.task('styles', function() {
  gulp.src(config.paths.styles)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./assets/css/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(cssnano())
  .pipe(gulp.dest('./assets/css/'));
  });

gulp.task('scripts', function() {
  return gulp.src(config.paths.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(ngAnnotate({add: true}))
  .pipe(gulp.dest('./assets/js/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('./assets/js/'));
  });

gulp.task('fonts', function(){
  return gulp.src(config.paths.fonts)
  .pipe(gulp.dest('./assets/fonts/'));
  });

gulp.task('images', function() {
  gulp.src(config.paths.images)
  .pipe(gulp.dest('./assets/images/'))
  });

gulp.task('minify-html', function() {
  return gulp.src(config.paths.html)
  .pipe(gulp.dest('./assets/partials/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./assets/partials/'))
  });

gulp.task('minify-cshtml', function() {
  return gulp.src(config.paths.cshtml)
  .pipe(gulp.dest('./assets/partials/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./assets/partials/'))
  });

gulp.task('minify-convert-cshtml', function() {
  return gulp.src(config.paths.cshtml)
  .pipe(rename({ extname: '.html' }))
  .pipe(gulp.dest('./assets/partials/'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./assets/partials/'))
  });

// Clean
gulp.task('clean', function() {
  return del(['assets/css', 'assets/js', 'assets/partials', 'assets/images', 'assets/fonts']);
  });

//Default task
gulp.task('default', ['clean'], function() {
  gulp.start(
    'vendor-styles',
    'vendor-scripts',
    'vendor-fonts',
    'vendor-fonts-styles',
    'vendor-images',
    'styles',
    'scripts', 
    'fonts',
    'images', 
    'minify-html', 
    'minify-cshtml', 
    'minify-convert-cshtml'); 
  gulp.watch('src/sass/**/*.scss',['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/partials/*.html', ['minify-html']);
  gulp.watch('src/partials/*.cshtml', ['minify-cshtml']);
  gulp.watch('src/partials/*.cshtml', ['minify-convert-cshtml']);
  gulp.watch('src/images/**/*.{png,svg,gif,jpg}', ['images']);
  });