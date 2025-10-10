import gulp from 'gulp';
import { pug_task } from "./task/pug.mjs";
import { pug_all } from "./task/pug.mjs";
import { sass_task } from "./task/sass.mjs";
import { js_task } from "./task/scriptjs.mjs";
import { server_task } from "./task/server.mjs";
import { watch_task } from "./task/watch.mjs";

export default gulp.parallel(watch_task, server_task);
export {pug_task as pug};
export {pug_all as pug_all};
export {sass_task as sass};
export {js_task as js};
export {server_task as server};
export {watch_task as watch};