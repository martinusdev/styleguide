const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

// handle enviromental variables in .env file
require('dotenv').config({ silent: true });

gulp.task('prepare', done => {
  gulp
    .src('./node_modules/lightgallery.js/src/img/**')
    .pipe(gulp.dest('./app/images/lightgallery/'));

  gulp
    .src('./node_modules/lightgallery.js/src/fonts/**')
    .pipe(gulp.dest('./app/fonts/lightgallery/'));

  // Swiper v12 ships CSS-only styles that use modern CSS nesting.
  // `button&` isn't valid Sass syntax, so rewrite it to `&:is(button)`
  // before saving as a Sass partial that main.scss can @import.
  const swiperSrc = fs.readFileSync(
    './node_modules/swiper/swiper-bundle.css',
    'utf8'
  );
  const swiperDest = './app/styles/vendors/swiper/_swiper-bundle.scss';
  fs.mkdirSync(path.dirname(swiperDest), { recursive: true });
  fs.writeFileSync(swiperDest, swiperSrc.replace(/button&/g, '&:is(button)'));

  done();
});

const hub = new HubRegistry(['./node_modules/light-scripts/gulpfile.js']);
gulp.registry(hub);

