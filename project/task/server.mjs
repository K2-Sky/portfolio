import browserSync from 'browser-sync';
import { src, dest } from "./_config.mjs";

export const server_task = () => {
  browserSync({
    server: {
      baseDir: dest.root,
    },
    startPath: '/',
  });
}