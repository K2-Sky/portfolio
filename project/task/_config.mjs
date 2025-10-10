export const src = {
  root: 'dirPug/',
  pug: ['dirPug/**/*.pug', '!dirPug/**/_*.pug'],
  pugbase: './dirPug/',
  pugwatch: 'dirPug/**/*.pug',
  sass: ['./dirPug/**/*.scss', '!./dirPug/**/_*.scss'],
  sasswatch: './dirPug/**/*.scss',
  javascript: ['./dirPug/**/js/min/*.js'],
  jswatch: './dirPug/**/*.js'
};

export const dest = {
  root: './public/',
  pug: './public/',
  css: './public/',
  javascript: './public/js/'
};