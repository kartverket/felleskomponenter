// Include gulp
const gulp = require('gulp')

// Include Plugins
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const del = require('del')
const ngAnnotate = require('gulp-ng-annotate')
const mergeStream = require('merge-stream')
const replace = require('gulp-replace')

// Include source reference object
const config = require('./gulp-config.json')

gulp.task('vendor-styles', function () {
  return gulp.src(config.paths.vendorStyles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss())
    .pipe(gulp.dest('./assets/css/'))
})

gulp.task('vendor-scripts', function () {
  return gulp.src(config.paths.vendorScripts)
    .pipe(concat('vendor.js'))
    .pipe(ngAnnotate({ add: true }))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'))
})

gulp.task('vendor-fonts', function () {
  return gulp.src(config.paths.vendorFonts)
    .pipe(gulp.dest('./assets/fonts/'))
})

gulp.task('vendor-fonts-styles', function () {
  return gulp.src(config.paths.vendorFontsStyles)
    .pipe(concat('vendorfonts.css'))
    .pipe(replace("url('./files", "url('../fonts"))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss({ discardUnused: { fontFace: false } }))
    .pipe(gulp.dest('./assets/css/'))
})

gulp.task('vendor-images', function () {
  return mergeStream(config.paths.vendorImages.map(function (component) {
    return gulp.src(component.src)
      .pipe(gulp.dest(component.dest))
  }))
})

gulp.task('styles', function (done) {
  gulp.src(config.paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss())
    .pipe(gulp.dest('./assets/css/'))
  done()
})

gulp.task('scripts', function () {
  return gulp.src(config.paths.scripts)
    .pipe(concat('main.js'))
    .pipe(ngAnnotate({ add: true }))
    .pipe(gulp.dest('./assets/js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'))
})

gulp.task('fonts', function () {
  return gulp.src(config.paths.fonts)
    .pipe(gulp.dest('./assets/fonts/'))
})

gulp.task('images', function (done) {
  gulp.src(config.paths.images)
    .pipe(gulp.dest('./assets/images/'))
  done()
})

gulp.task('minify-html', function () {
  return gulp.src(config.paths.html)
    .pipe(gulp.dest('./assets/partials/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./assets/partials/'))
})

gulp.task('minify-cshtml', function () {
  return gulp.src(config.paths.cshtml)
    .pipe(gulp.dest('./assets/partials/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./assets/partials/'))
})

gulp.task('minify-convert-cshtml', function () {
  return gulp.src(config.paths.cshtml)
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./assets/partials/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./assets/partials/'))
})

// Clean
gulp.task('clean', function () {
  return del(['assets/css', 'assets/js', 'assets/partials', 'assets/images', 'assets/fonts'])
})

gulp.task('build', gulp.series(
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
  'minify-convert-cshtml')
)

//Default task
gulp.task('default', gulp.series('clean', 'build', function (done) {
  done()
  /**To be adapted for gulp 4*/
  //gulp.watch('src/sass/**/*.scss', ['styles'])
  //gulp.watch('src/js/**/*.js', ['scripts'])
  //gulp.watch('src/partials/*.html', ['minify-html'])
  //gulp.watch('src/partials/*.cshtml', ['minify-cshtml'])
  //gulp.watch('src/partials/*.cshtml', ['minify-convert-cshtml'])
  //gulp.watch('src/images/**/*.{png,svg,gif,jpg}', ['images'])
}))