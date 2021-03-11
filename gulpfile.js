const { dest, series, src, watch, parallel } = require("gulp");
const sass = require("gulp-sass");
const concat = require('gulp-concat');
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

async function cleanAssetsSrcJSBootstrap() {
    await del(["assets/src/js/bootstrap/**"]);
}

function copyBootstrapAssetsSCSS() {
    return src("node_modules/bootstrap/scss/**")
    .pipe(dest("assets/src/sass/bootstrap"));
}

function copyFontAwesomeAssetsSCSS() {
    return src(
        "node_modules/@fortawesome/fontawesome-free/scss/**"
    )
    .pipe(dest("assets/src/sass/fontawesome"));
}

function copyBootstrapAssetsJS() {
    return src(
        "node_modules/bootstrap/dist/js/bootstrap.bundle.js"
    )
    .pipe(dest("assets/src/js/bootstrap"));
}

function js() {
    return src([
        "assets/src/js/bootstrap/*", 
        "assets/src/js/custom-javascript.js", 
        "assets/js/*", 
        "!assets/js/theme.js"
    ])
    .pipe(babel({
        presets: ["@babel/env"]
    }))
    .pipe(concat("theme.js"))
    .pipe(dest("assets/js"));
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
    return src("assets/js/*.js")
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

exports.clean = parallel(
    cleanAssetsSrcSass, 
    cleanAssetsSrcJSBootstrap, 
    cleanAssetsDist
);

exports.copyAssets = series(
    parallel(
        copyBootstrapAssetsSCSS, 
        copyFontAwesomeAssetsSCSS
    ), 
    parallel(copyBootstrapAssetsJS)
);

exports.watch = function() {
    watch([
        "assets/sass/**/*.scss", 
        "assets/js/*.js", 
        "!assets/js/theme.js"], 
        series(parallel(scss, js), 
        parallel(minifyCSS, minifyJS)
        )
    );
}