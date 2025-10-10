import gulp from 'gulp';
import { src, dest } from "./_config.mjs";
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import browserSync from 'browser-sync';
// import changed from "gulp-changed";
import newer from "gulp-newer";
import cleanCss from "gulp-clean-css";
import notify from "gulp-notify";
import rename from "gulp-rename";
import wait from "gulp-wait";
import autoprefixer from "gulp-autoprefixer";

export const sass_task = () => {
  return gulp.src(src.sass, { sourcemaps: true })
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(wait(500))
  // Sass の処理前に変更があったファイルをフィルタリング
  .pipe(newer({ dest: dest.css, ext: '.css' }))
  .pipe(sass.sync({
    outputStyle : 'expanded'
  }))
  .pipe(autoprefixer({
    overrideBrowserslist: 'last 2 versions',
    grid:true,
    cascade: false
  }))
  .pipe(gulp.dest(dest.css, { sourcemaps: true }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(cleanCss())
  .pipe(gulp.dest(dest.css))
  .pipe(browserSync.reload({ stream: true }));
}