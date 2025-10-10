import gulp from 'gulp';
import { src, dest } from "./_config.mjs";
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import rename from "gulp-rename";
import uglify from 'gulp-uglify';

export const js_task = () => {
  return gulp.src(src.javascript, {
    sourcemaps: true
  })
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat('function.js'))
    .pipe(gulp.dest(dest.javascript), {
      sourcemaps: './sourcemaps'
    })
    .pipe(uglify({}))
    .pipe(
      rename({
        suffix: '.min',
      })
  )
  .pipe(gulp.dest(dest.javascript))
  .pipe(browserSync.reload({stream:true}));
}