import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import cached from "gulp-cached";
import gulpif from "gulp-if";
import dependents from "gulp-dependents";
import changed from "gulp-changed"; // 追加

import { src, dest } from "./_config.mjs";

// Pug のオプション
const pugOptions = {
  pretty: true,
  basedir: src.pugbase
};

export const pug_task = () => {
  return gulp.src(src.pug, { since: gulp.lastRun(pug_task) })
    .pipe(plumber())

    // キャッシュで「変更がなければ通さない」
    .pipe(cached("pug"))

    // 依存関係を解決して対象を追加
    .pipe(dependents())

    // 出力先と比較して差分だけ通す
    .pipe(changed(dest.pug, { extension: ".html" }))

    // コンパイル
    .pipe(pug(pugOptions))

    // 出力
    .pipe(gulp.dest(dest.pug))
    .pipe(browserSync.reload({stream:true}));
}

// 全コンパイル（必要なときだけ手動で実行）
export const pug_all = () => {
  return gulp.src(src.pug)
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(dest.pug))
    .pipe(browserSync.reload({stream:true}));
};
