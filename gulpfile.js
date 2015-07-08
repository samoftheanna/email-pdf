var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var prefix = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');

var paths = {
  sass: ['./scss/**/*.scss']
};

var bookletAssets = ['./assets/js/booklet/**/*.js', './assets/js/booklet/*.js'];
var treeExportAssets = ['./assets/js/treeExport/**/*.js', './assets/js/treeExport/*.js'];
// var templeOppsAssets = ['./assets/js/templeOpps/**/*.js', './assets/js/templeOpps/*.js'];
var styleAssets = ['./assets/css/*.styl'];

  gulp.task('compileBookletStyl', function() {
    return gulp.src('./assets/css/booklet.styl')
            .pipe(stylus().on('error', console.error))
            .pipe(prefix("last 10 versions", "> 1%", "ie 9", {cascade : true}).on('error', console.error))
            .pipe(gulp.dest('./assets/css'));
  });

  gulp.task('compileFinishStyl', function() {
    return gulp.src('./assets/css/finishPage.styl')
            .pipe(stylus().on('error', console.error))
            .pipe(prefix("last 10 versions", "> 1%", "ie 9", {cascade : true}).on('error', console.error))
            .pipe(gulp.dest('./assets/css'));
  });

  gulp.task('compileExportStyl', function() {
    return gulp.src('./assets/css/export.styl')
      .pipe(stylus().on('error', console.error))
      .pipe(prefix("last 10 versions", "> 1%", "ie 9", {cascade : true}).on('error', console.error))
      .pipe(gulp.dest('./assets/css'));
  });

  gulp.task('compileTempleOppsStyl', function() {
    return gulp.src('./assets/css/templeOpps.styl')
      .pipe(stylus().on('error', console.error))
      .pipe(prefix("last 10 versions", "> 1%", "ie 9", {cascade : true}).on('error', console.error))
      .pipe(gulp.dest('./assets/css'));
  });

  gulp.task('compileClientjs', function() {
    return gulp.src(bookletAssets)
            // Compile all the *.js files to one
            .pipe(jshint().on('error', console.error))
            .pipe(jshint.reporter('default'))
            .pipe(concat('booklet.js').on('error', console.error))
            // Output as booklet.js
            .pipe(gulp.dest('./www/assets/js'))
            .pipe(notify({
              title: 'Angular App Build Success',
              message: 'The angular app "booklet" was succesfully built'
            }));
  });

  gulp.task('compileMasterjs', function() {
    return gulp.src(bookletAssets)
            // Compile all the *.js files to one
            .pipe(concat('booklet.js').on('error', console.error))
            // Output as booklet.js
            .pipe(gulp.dest('./www/assets/js'));
  });

  gulp.task('compileTreeExportjs', function() {
    return gulp.src(treeExportAssets)
            .pipe(concat('treeExport.js').on('error', console.error))
            .pipe(gulp.dest('./assets/js'));
  });

  gulp.task('minifyjs', function() {
    return gulp.src('./assets/js/booklet.js')
            .pipe(uglify().on('error', console.error))
            .pipe(rename(function(path) {
              path.extname = '.min' + path.extname;
            }))
            .pipe(gulp.dest('./assets/js'))
            .pipe(notify({
              title: 'Angular App Style Compiled',
              message: 'Stylus files were succesfully compiled'
            }));
  });

  gulp.task('default',
    ['compileBookletStyl', 'compileFinishStyl', 'compileExportStyl' ,'compileTempleOppsStyl', 'compileTreeExportjs','sass', 'watch'], 
    function() {
    try {
      gulp.watch(styleAssets, ['compileBookletStyl', 'compileFinishStyl', 'compileExportStyl' ,'compileTempleOppsStyl','sass']);
      gulp.watch(treeExportAssets, ['compileTreeExportjs']);
      gulp.watch('./assets/js/booklet.js', ['minifyjs']);
      /**
       * Test File Watch: TreeExport
       */
      gulp.watch();
    } catch(e) {
      notify({
        title: 'GULP ERROR',
        message: 'There was an error in your gulp task. Check console'
      });
      return console.error(e);
    }
  });

gulp.task('sass', function() {
  gulp.src('./scss/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(prefix("last 2 versions", "> 1%", "ie 9", {cascade : true}).on('error', console.error))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});