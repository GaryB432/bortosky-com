var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    sass = require('gulp-sass'),
    path = require('path'),
    jade = require('gulp-jade'),
    Server = require('karma').Server;


var garyts = [
    './source/gary/js/app.ts',
    './source/gary/js/controllers.ts',
    './source/gary/js/directives.ts',
    './source/gary/js/models.ts',
    './source/gary/js/services.ts'
];

var tsProject = typescript.createProject({
    target: 'ES5',
    module: 'amd',
    noImplicitAny: true,
    out: 'main.js'
});

gulp.task('scripts-gary', function () {
    var tsResult = gulp.src(garyts)
    //.pipe(plugins.sourcemaps.init())
        .pipe(typescript(tsProject));

    tsResult.removeAllListeners('error');
    tsResult.on('error', function (err) {
        result.emit(err);
        //result.emit('error', new gutil.PluginError('gulp-typescript', err.toString()));
    });
    var result = tsResult.js
    //.pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('./app/gary/js'));
    return result;
});

gulp.task('jade', function () {
    return gulp.src('./source/jade/**/*.jade')
        .pipe(jade({
            locals: { fun: false, revDate: new Date() },
            pretty: true
        }))
        .pipe(gulp.dest('./app'))
});

gulp.task('jade-gary', function () {
    return gulp.src('./source/gary/jade/**/*.jade')
        .pipe(jade({
            locals: { fun: false, revDate: true, hi: "there" },
            pretty: true
        }))
        .pipe(gulp.dest('./app/gary'))
});

gulp.task('copy-gary', function () {
    return gulp.src('./source/gary/theater.json').pipe(gulp.dest('./app/gary'));
});

var tsTestProject = typescript.createProject({
    target: 'ES5',
    module: 'amd',
    noImplicitAny: true,
    out: 'tests.js'
});

gulp.task('test-ts-gary', function () {
    var tsResult = gulp.src("./test/**/*.ts")
    //.pipe(plugins.sourcemaps.init())
        .pipe(typescript(tsTestProject));

    tsResult.removeAllListeners('error');
    tsResult.on('error', function (err) {
        result.emit(err);
        //result.emit('error', new gutil.PluginError('gulp-typescript', err.toString()));
    });
    var result = tsResult.js
    //.pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('./test'));
    return result;
});


gulp.task('test', ['test-ts-gary'], function (done) {
    var server = new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
    server.start();
});

gulp.task('sass-gary', function () {
    gulp.src('./source/gary/sass/style.scss')
        .pipe(sass({ outputStyle: 'nested' })
            .on('error', sass.logError))
        .pipe(gulp.dest('./app/gary/css'));
});

gulp.task('sass', function () {
    gulp.src('./source/sass/style.scss')
        .pipe(sass({ outputStyle: 'nested' })
            .on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('jade-all', ['jade', 'jade-gary']);

gulp.task('sass-all', ['sass', 'sass-gary']);

gulp.task('watch-gary', function () {
    gulp.watch(garyts, ['scripts-gary']);

});

gulp.task('watch-others', function () {

    gulp.watch('./source/gary/sass/**/*.scss', ['sass-gary']);

    gulp.watch('./source/gary/jade/**/*.jade', ['jade-gary']);

    gulp.watch('./source/sass/**/*.scss', ['sass']);

    gulp.watch('./source/jade/**/*.jade', ['jade']);
});

gulp.task('dev', ['watch-gary', 'watch-others']);

gulp.task('build', ['scripts-gary', 'jade-all', 'sass-all', 'copy-gary']);

gulp.task('default', ['build']);
