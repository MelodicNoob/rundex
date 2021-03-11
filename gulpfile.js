const { dest, series, src, watch, parallel, task } = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const ulgify = require("gulp-uglify");
const del = require("del");

sass.compiler = require("node-sass");

async function cleanAssetsDist() {
    await del(["assets/dist"]);
}

async function cleanAssetsSrcSass() {
   await del(["assets/src/sass/**"]);
}

function copyBootstrapAssets() {
    return src("node_modules/bootstrap/scss/**")
    .pipe(dest("assets/src/sass/bootstrap"));
}

function copyFontAwesomeAssets() {
    return src("node_modules/@fortawesome/fontawesome-free/scss/**")
    .pipe(dest("assets/src/sass/fontawesome"));
}

function js() {
    return src("assets/js/*")
    .pipe(babel({
        presets: ["@babel/env"]
    }))
    .pipe(dest("assets/dist/js"));
}

function minifyCSS() {
    return src("assets/css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(dest("assets/dist/css"));
}

function minifyJS() {
    return src("assets/dist/js/*.js")
    .pipe(ulgify())
    .pipe(rename({
        extname: ".min.js"
    }))
    .pipe(dest("assets/dist/js"));
}

function scss() {
    return src("assets/sass/theme.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("assets/css"));
}

exports.build = series(
    parallel(scss, js),
    parallel(minifyCSS, minifyJS)
);

exports.clean = series(cleanAssetsSrcSass, cleanAssetsDist);

exports.copyAssets = series(copyBootstrapAssets, copyFontAwesomeAssets);

exports.watch = function() {
    watch(["assets/sass/**/*.scss", "assets/js/*.js"], series(parallel(scss, js), parallel(minifyCSS, minifyJS)));
}