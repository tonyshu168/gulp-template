const fs = require('fs'),
      path = require('path'),
      browserify = require('browserify'),
      watchify = require('watchify'),
      gulp = require('gulp'),
      inject = require('gulp-inject'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      gif = require('gulp-if'),
      uglify = require('gulp-uglify'),
      sourcemaps = require('gulp-sourcemaps'),
      babel = require('gulp-babel'),
      autoprefixer = require('gulp-autoprefixer'),
      less = require('gulp-less');
      
// 1
// function bundleJs( cb ) {
//   const b = browserify().add('./src/index.js');

//   b.bundle().pipe(fs.createWriteStream('./output/bundle.js'));
// }

// 2 
const isProduction = /production/.test(process.env.NODE_ENV);

function bundleJs( ) {
  const b = browserify({
    entries: ['./src/index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  b.on('update', bundle);
  bundle();

  function bundle() {
    b.bundle().on('error', console.error)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gif(isProduction, uglify()))
    .pipe(gulp.dest('./output/'));
    // .pipe(fs.createWriteStream('./output/bundle.js'));
  }
}

function injectFun() {
  const target = gulp.src('./src/index.html');
  const sources = gulp.src(['./output/**/*.js'], { read: false}, {relative: true});

  target.pipe(inject(sources))
  .pipe(gulp.dest('./src'));
}

// gulp.task('index', function() {
//   const target = gulp.src('./src/index.html');
//   const sources = gulp.src(['./output/bundle.js'], { read: false});

//   return target.pipe(inject(sources))
//   .pipe(gulp.dest('./src'));
// })

function lessTask() {
  gulp.src('./src/**/*.less')
  .pipe(gif(!isProduction, sourcemaps.init()))
  .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
  .pipe(autoprefixer())
  .pipe(gif(!isProduction, sourcemaps.write()))
  .pipe(gulp.dest('./output'))
}

function defaultTask( cb ) {
  bundleJs();
  cb();
}

// exports.default = defaultTask;
exports.default = gulp.parallel(defaultTask, injectFun, lessTask);
