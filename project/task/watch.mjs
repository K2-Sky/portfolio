import gulp from 'gulp';
import { src, dest } from "./_config.mjs";
import { pug_task } from "./pug.mjs";
import { pug_all } from "./pug.mjs";
import { sass_task } from "./sass.mjs";
import { js_task } from "./scriptjs.mjs";

export const watch_task = () => {
  gulp.watch(src.jswatch, js_task);
  gulp.watch(src.sasswatch, sass_task);

  // Pug ファイルの変更を監視
  gulp.watch([src.pugwatch, `${src.pugbase}/**/*.pug`], (done) => {
    pug_task(); // 差分更新用。実装後はこちらを使う
    // pug_all(); // 開発段階の全pugファイル更新用。実装後はコメントアウト
    done();
  });


}