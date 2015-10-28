/// <reference path="./typings/tsd.d.ts" />

var inject = require("gulp-inject");
var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require("del");
var tslint = require("gulp-tslint");
var sourcemaps = require("gulp-sourcemaps");
var html2ts = require("gulp-html-to-ts");
var less = require('gulp-less');
var imageResize = require('gulp-image-resize');
var typedoc = require("gulp-typedoc");
var exec = require('child_process').exec;

var config = {
    paths: {
        web:{
            tsWebFiles: "./web/**/*.ts",
            htmlWebTemplateFiles: "./web/**/*.htm",
            webOutputPath: "./www/web",
            htmlFiles: ["./web/index.html", "./web/sidenav/sidenav.html"]
        },
        api:{
            tsApiFiles: "./api/**/*.ts",
            tsApiOutputPath: "./www/api",
        },
        typings: {
            folder: "./typings",
            tsDefinitions: "./typings/**/*.d.ts",
            tsdFile:"./typings/tsd.d.ts",
            appDefinition: "./typings/webApp.d.ts"
        },
        images:{
            source: "./images/*.*",
            destination: "./www/images"
        },
        styles:{
            lessFiles: "./styles/*.less",
            lessOutputPath: "./www/styles"
        },
        doc:{
            docOutputPath: "./www/doc"
        }
    },
    tscConfWeb: {
        target: "ES5",
        //module: "umd",
        declarationFiles: false,
        noExternalResolve: true,
        outFile: "app.js",
        //typescript: require('ntypescript')
        //typescript: require('typescript') //Force the usage of the local installed TSC?
    },
    tscConfApi: {
        target: "ES6",
        module: "umd",
        declarationFiles: false,
        noExternalResolve: true,
        //noLib: true
        //typescript: require('ntypescript')
        typescript: require('typescript') //Force the usage of the local installed TSC?
    }
};

gulp.task("build", ["webCompile", "apiCompile"]);
gulp.task("lint",["webLink","apiLint"]);

gulp.task("watchWeb", function () {
    gulp.watch([
        config.paths.web.tsWebFiles,
        config.paths.web.htmlFiles,
        config.paths.web.htmlWebTemplateFiles ],[ "html2ts", "webCompile" ]);
});
gulp.task("watchApi", function () {
    gulp.watch([config.paths.api.tsApiFiles], [ "apiCompile", "apiLint" ]);
});
gulp.task("watch", function () {
    gulp.watch([config.paths.api.tsApiFiles,config.paths.web.tsWebFiles], [ "apiCompile", "apiLint", "webCompile", "webLint"]);
});

gulp.task("webLint", function () {
    return gulp.src(config.paths.web.tsWebFiles).pipe(tslint()).pipe(tslint.report("prose"));
});
gulp.task("apiLint", function () {
    return gulp.src(config.paths.api.tsApiFiles).pipe(tslint()).pipe(tslint.report("prose"));
});

gulp.task("webCompile", function () {
    var sourceTsFiles = [
        "./web/_references.ts",
        config.paths.web.tsWebFiles,
        config.paths.typings.tsDefinitions,
        config.paths.typings.appDefinition]; //reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(ts(config.tscConfWeb));

    tsResult.dts.pipe(gulp.dest(config.paths.web.webOutputPath));

    tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.paths.web.webOutputPath));

    return gulp.src(config.paths.web.htmlFiles) //TODO inject app or minified version of app.js, remove sideNav.html to directive or something like that
        .pipe(gulp.dest(config.paths.web.webOutputPath));
});

gulp.task("apiCompile", function    () {
    var sourceTsFiles = [
        config.paths.typings.tsDefinitions,
        config.paths.api.tsApiFiles];
    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(ts(config.tscConfApi));
    tsResult.dts.pipe(gulp.dest(config.paths.api.tsApiOutputPath));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.paths.api.tsApiOutputPath));
});

gulp.task("cleanAllJs", function (cb) {
    var tsGenFiles = [
        config.paths.web.webOutputPath + "/**/*.js",
        config.paths.web.webOutputPath + "/**/*.js.map", // path to all sourcemap files auto gen"d by editor
        config.paths.api.tsApiOutputPath + "/**/*.js",
        config.paths.api.tsApiOutputPath + "/**/*.js.map" // path to all sourcemap files auto gen"d by editor
    ];
    // delete the files
    del(tsGenFiles, cb);
});

gulp.task("html2ts", function(){

    var myTemplapte = {
        tsTemplate:"namespace mtg.$folderName { export var $fileNameTemplate = \"$fileContent\";}",
        fileSrcType: ".htm"
    };

    return gulp.src(config.paths.web.htmlWebTemplateFiles)
        .pipe(html2ts(myTemplapte))
        .pipe(gulp.dest("./web/"));
});

gulp.task("lessCompile",function () {
    return gulp.src(config.paths.styles.lessFiles)
    .pipe(less())
    .pipe(gulp.dest(config.paths.styles.lessOutputPath));
});

gulp.task("webGenRefs", function () {
    var target = gulp.src(config.paths.typings.appDefinition);
    var sources = gulp.src([config.paths.web.tsWebFiles], { read: false });
    return target.pipe(inject(sources, {
        starttag: "//{",
        endtag: "//}",
        transform: function (filepath) {
            return "/// <reference path='.." + filepath + "' />";
        }
    })).pipe(gulp.dest(config.paths.typings.folder));
});

gulp.task("imageCompile", function(){
    //No need, yet, of gulp-images-resize
    gulp.src(config.paths.images.source)
    .pipe(gulp.dest(config.paths.images.destination));
});


gulp.task("docCompile", function() {
/**
 * Does not work correctly yet => to be fanilized
 * I currently use 1.5 béta and the version supported is 1.4.1 => wait a little bit ;-)
 */
    // return gulp
    //     .src([config.paths.api.tsApiFiles, config.paths.web.tsWebFiles])
    //     .pipe(typedoc({
    //         module: "commonjs",
    //         target: "es5",
    //         out: config.paths.doc.docOutputPath,
    //         name: "MTG Documentation"
    //     }));
});

gulp.task('start:mongodb', function (cb) {
  //exec(['"c:\\program files\\MongoDB 2.6 Standard\\bin\\mongod" --dbpath C:\\Dev\\mongodb --repair'], function (err, stdout, stderr) {
  // exec(["mongod --dbpath C:\\Dev\\mongodb --repair"], function (err, stdout, stderr) {
    // console.log(stdout);
    // console.log(stderr);
    // cb(err);
  // });
  //exec(['"c:\\program files\\MongoDB 2.6 Standard\\bin\\mongod" --dbpath C:\\Dev\\mongodb --rest'], function (err, stdout, stderr) {
  exec("\"c:\\program files\\MongoDB 2.6 Standard\\bin\\mongod.exe\" --dbpath C:\\Dev\\mongodb --rest", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task("start:server", function (cb) {
  exec("node --harmony ./www/api/server.js", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});