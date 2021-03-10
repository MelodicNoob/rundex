const { dest, series, src, watch, parallel, task } = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const ulgify = require('gulp-uglify');
const del = require('del');

sass.compiler = require('node-sass');

async function cleanAssetsDist(cb) {
    await del(['assets/dist']);
    cb();
}

async function cleanAssetsSrcSass(cb) {
    await del(['assets/src/sass']);
    cb();
}

function copyBootstrapAssets(cb) {
    src("node_modules/bootstrap/scss/**")
    .pipe(dest("assets/src/sass/bootstrap"));
    cb();
}

function copyFontAwesomeAssets(cb) {
    src("node_modules/@fortawesome/fontawesome-free/scss/**")
    .pipe(dest("assets/src/sass/fontawesome"));
    cb();
}

function js(cb) {
    src('./assets/js/*')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(dest('./assets/dist/js'));
    cb();
}

function minifyCSS(cb) {
    src('./assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(dest('assets/dist/css'));
    cb();
}

function minifyJS(cb) {
    src('./assets/dist/js/*.js')
    .pipe(ulgify())
    .pipe(rename({
        extname: ".min.js"
    }))
    .pipe(dest('assets/dist/js'));
    cb();
}

function scss(cb) {
    src('./assets/sass/theme.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./assets/css'));
    cb();
}

exports.build = series(
    parallel(cleanAssetsSrcSass, cleanAssetsDist),
    parallel(copyBootstrapAssets, copyFontAwesomeAssets),
    parallel(scss, js), 
    parallel(minifyCSS, minifyJS)
);

exports.watch = series(
    parallel(cleanAssetsSrcSass, cleanAssetsDist), 
    parallel(copyBootstrapAssets, copyFontAwesomeAssets),
    function() {
        watch(['assets/sass/theme.scss', 'assets/js/*.js'], parallel(scss, js))
    }
);