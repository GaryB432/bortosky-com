const { dest, src, parallel, series, watch } = require('gulp');
const { transform } = require('gulp-insert');
const sass = require('gulp-sass')(require('sass'));
const run = require('gulp-run');
const { createProject } = require('gulp-typescript');
const del = require('del');

function assets() {
  return src([
    'assets/**/*',
    'src/**/*',
    '!**/*.{t,scs}s',
    '!**/*.app.json',
  ], { dot: true }).pipe(dest('dist'));
}

function clean() {
  return del(['dist']);
}

function styles() {
  return src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist'));
}

function javascript() {
  const tsProject = createProject('src/tsconfig.app.json');
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(
      transform((content) =>
        content.replace(/(import\s+.*(?<!\.[tj]s))(['"];?\s*$)/gm, '$1.js$2')
      )
    )
    .pipe(dest('dist'));
}

function watcher(cb) {
  watch('src/**/*.html', assets);
  watch('src/**/!(*.spec).ts', javascript);
  watch('src/**/*.scss', styles);
  cb();
}

function schema() {
  return run('npm run json2ts', { silent: false }).exec();
}

exports.watch = watcher;

exports.default = series(clean, schema, parallel(assets, javascript, styles));
