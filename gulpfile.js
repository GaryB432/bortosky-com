var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    less = require('gulp-less'),
    path = require('path'),
    del = require('del'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade');

var garyts = [
    './source/gary/js/app.ts',
    './source/gary/js/models/**/*.ts',
    './source/gary/js/services/**/*.ts',
    './source/gary/js/controllers/**/*.ts',
    './source/gary/js/filters/**/*.ts',
    './source/gary/js/directives/**/*.ts'
];

var tsProject = typescript.createProject({
    target: 'ES5',
    module: 'commonjs',
    noImplicitAny: true,
    out: 'main.js'
});

gulp.task('scripts-gary', function () {
    var tsResult = gulp.src(garyts)
                  //.pipe(plugins.sourcemaps.init())
                  .pipe(typescript(tsProject));

    tsResult.removeAllListeners('error');
    tsResult.on('error', function (err) {
        result.emit('error', new gutil.PluginError('gulp-typescript', err.toString()));
    });
    var result = tsResult.js
    //.pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest('./app/gary/js'));
    return result;
});

gulp.task('less', function () {
    return gulp.src('./source/less/main.less')
        .pipe(less({ paths: ['./source/less'] }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('less-gary', function () {
    return gulp.src('./source/gary/less/main.less')
        .pipe(less({ paths: ['./source/gary/less'] }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./app/gary/css'));
});

gulp.task('jade', function () {
    return gulp.src('./source/jade/**/*.jade')
      .pipe(jade({
          locals: { fun: true },
          pretty: true
      }))
      .pipe(gulp.dest('./app'))
});

gulp.task('jade-gary', function () {
    return gulp.src('./source/gary/jade/**/*.jade')
      .pipe(jade({
          locals: { fun: true },
          pretty: true
      }))
      .pipe(gulp.dest('./app/gary'))
});

gulp.task('copy-gary', function () {
    return gulp.src('./source/gary/producers.json').pipe(gulp.dest('./app/gary'));
});

gulp.task('wtf', function () {
    console.log('wtf');
});

gulp.task('jade-all', ['jade', 'jade-gary']);

gulp.task('less.all', ['less', 'less-gary']);

gulp.task('default', ['scripts-gary',  'jade-all', 'less-gary', 'copy-gary']);

gulp.task('watch', function () {

    gulp.watch('./source/gary/less/**/*.less', ['less-gary']);

    gulp.watch('./source/gary/**/*.js', ['scripts-gary']);

    gulp.watch('./source/gary/jade/**/*.jade', ['jade-gary']);

    gulp.watch('./source/less/**/*.less', ['less']);

    gulp.watch('./source/jade/**/*.jade', ['jade']);
});