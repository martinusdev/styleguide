const gulp = require('gulp');
const hub = require('gulp-hub');

// handle enviromental variables in .env file
require('dotenv').config({ silent: true });

gulp.task('prepare', function () {
    gulp.src('./node_modules/lightgallery.js/src/img/**')
        .pipe(gulp.dest('./app/images/lightgallery/'));

    gulp.src('./node_modules/lightgallery.js/src/fonts/**')
        .pipe(gulp.dest('./app/fonts/lightgallery/'));
});

hub('./node_modules/light-scripts/gulpfile.js');
