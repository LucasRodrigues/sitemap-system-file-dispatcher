const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const del = require('del');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');

const TASK_ES6_TO_ES5_TEST = 'TASK_ES6_TO_ES5_TEST';
const TASK_ES6_TO_ES5_SRC = 'TASK_ES6_TO_ES5_SRC';
const TASK_CLEAN_DIST = 'TASK_CLEAN_DIST';
const BUILD_DEVELOPMENT = 'BUILD_DEVELOPMENT';
const BUILD_DEPLOY = 'BUILD_DEPLOY';
const TASK_ES6_TO_ES5_SRC_DEPLOY = 'TASK_ES6_TO_ES5_SRC_DEPLOY';

const SOURCE_FOLDER_SRC = 'src/';
const SOURCE_FOLDER_TEST = 'test/';
const DESTINATION_FOLDER = 'lib/';

gulp.task(TASK_CLEAN_DIST, function () {

  del.sync([DESTINATION_FOLDER + '**']);
});

gulp.task(TASK_ES6_TO_ES5_SRC_DEPLOY, function () {

  const babelConfiguration = {
    presets: ['es2015']
  };

  return gulp.src(SOURCE_FOLDER_SRC + '**/*.js')
    .pipe(gulpBabel(babelConfiguration))
    .pipe(uglify())
    .pipe(gulp.dest(DESTINATION_FOLDER));
});


gulp.task(TASK_ES6_TO_ES5_SRC, function () {

  const babelConfiguration = {
    presets: ['es2015']
  };

  return gulp.src(SOURCE_FOLDER_SRC + '**/*.js')
    .pipe(gulpBabel(babelConfiguration))
    .pipe(uglify())
    .pipe(gulp.dest(DESTINATION_FOLDER + '/src'));
});

gulp.task(TASK_ES6_TO_ES5_TEST, function () {

  const babelConfiguration = {
    presets: ['es2015']
  };

  return gulp.src(SOURCE_FOLDER_TEST + '**/*.js')
    .pipe(gulpBabel(babelConfiguration))
    .pipe(uglify())
    .pipe(gulp.dest(DESTINATION_FOLDER + '/test'));
});

gulp.task(BUILD_DEPLOY,function(){

  runSequence(TASK_CLEAN_DIST,TASK_ES6_TO_ES5_SRC_DEPLOY);
});

gulp.task(BUILD_DEVELOPMENT,function(){

  runSequence(TASK_CLEAN_DIST,TASK_ES6_TO_ES5_SRC,TASK_ES6_TO_ES5_TEST);
});