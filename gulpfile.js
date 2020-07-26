const gulp = require("gulp");
const babel = require("gulp-babel");
const fs = require("fs");
const typescript = require("gulp-typescript");
const childProcess = require("child_process");
const nodemon = require("gulp-nodemon");
const pkg = require("pkg");

const tsProject = typescript.createProject("tsconfig.json");

function clear(callback) {
  const buildExists = fs.existsSync("./build");
  const distExists = fs.existsSync("./dist");
  if (buildExists) childProcess.execSync("rmdir /q /s build");
  if (distExists) childProcess.execSync("rmdir /q /s dist");
  return callback();
}

function transpile() {
  return gulp
    .src(["src/**/*.ts"])
    .pipe(tsProject())
    .pipe(gulp.src("src/**/*.js"))
    .pipe(babel())
    .pipe(gulp.dest("build"));
}

function bundle() {
  return pkg.exec([
    "build/updater.js",
    // "--targets",
    // "latest-win",
    "--out-path",
    "dist",
  ]);
}

function start() {
  return nodemon({
    script: "src/updater.ts",
    watch: "src",
    tasks: ["transpile"],
  });
}

exports.default = gulp.series(clear, transpile, bundle);
exports.build = gulp.series(clear, transpile);
exports.clear = clear;
exports.start = start;
