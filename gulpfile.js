// Load plugins

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    size = require('gulp-size'),
    jekyll = require('gulp-jekyll'),
    rename = require('gulp-rename'),
    pngcrush = require('imagemin-pngcrush'),
    browserSync = require('browser-sync'),
    csslint = require('gulp-csslint'),
    shell = require('gulp-shell'),
    browserReload = browserSync.reload;

// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./_site"
        }
    });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('shorthand', shell.task([
  'jekyll build --watch'
]))

gulp.task('minify-css', function(){
gulp.src('./css/nkd.css') // set this to the file(s) you want to minify.
    .pipe(minifyCSS())
    .pipe(size({gzip: false, showFiles: true, title:'minified css'}))
    .pipe(size({gzip: true, showFiles: true, title:'minified css'}))
    .pipe(rename('nkd.min.css'))
    .pipe(gulp.dest('./css/'));
});

// Task to optimize and minify svg
gulp.task('minify-svg', function(){
  gulp.src('./img/svg')
          .pipe(svgmin())
          .pipe(gulp.dest('./img/svg'));
});

gulp.task('minify-images', function(){
  gulp.src('./img/*')
     .pipe(size({gzip: false, showFiles: true, title:'original image size'}))
     .pipe(size({gzip: true, showFiles: true, title:'original image size'}))
     .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
      }))
      .pipe(size({gzip: false, showFiles: true, title:'minified images'}))
      .pipe(size({gzip: true, showFiles: true, title:'minified images'}))
      .pipe(gulp.dest('./img')); // change the dest if you don't want your images overwritten
});

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', function(){
  gulp.src('./css/*.css')
    .pipe(csslint({
          'compatible-vendor-prefixes': false,
          'box-sizing': false,
          'important': false
        }))
    .pipe(csslint.reporter());

});

// Task that compiles scss files down to good old css
gulp.task('pre-process', function(){
  gulp.src('./_sass/nkd.scss')
      .pipe(watch(function(files) {
        return files.pipe(sass())
          .pipe(size({gzip: false, showFiles: true, title:'without vendor prefixes'}))
          .pipe(size({gzip: true, showFiles: true, title:'without vendor prefixes'}))
          .pipe(prefix())
          .pipe(size({gzip: false, showFiles: true, title:'after vendor prefixes'}))
          .pipe(size({gzip: true, showFiles: true, title:'after vendor prefixes'}))
          .pipe(gulp.dest('css'))
          .pipe(minifyCSS())
          .pipe(size({gzip: false, showFiles: true, title:'minified css'}))
          .pipe(size({gzip: true, showFiles: true, title:'minified css'}))
          .pipe(rename('nkd.min.css'))
          .pipe(browserSync.reload({stream:true}));
      }));
});

gulp.task('production', function(){
    gulp.run('minify-css', 'minify-img', 'minify-svg');
});

/*
   DEFAULT TASK

 • Process sass then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or sass files

*/
gulp.task('default', ['pre-process', 'minify-css', 'bs-reload', 'browser-sync', 'shorthand'], function(){
  gulp.start('pre-process', 'csslint');
  gulp.src(['./index.html', './_layouts/*.html', './_posts/*.{markdown,md}'])
      .pipe(jekyll({
          source: './',
          destination: './_site/',
          bundleExec: true
      }))
      .pipe(gulp.dest('./_site/'));
});
