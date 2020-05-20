const gulp = require('gulp');
var HubRegistry = require('gulp-hub');

// handle enviromental variables in .env file
require('dotenv').config({ silent: true });

gulp.task('prepare', function (done) {
    gulp.src('./node_modules/lightgallery.js/src/img/**')
        .pipe(gulp.dest('./app/images/lightgallery/'));

    gulp.src('./node_modules/lightgallery.js/src/fonts/**')
        .pipe(gulp.dest('./app/fonts/lightgallery/'));

    done();
});

var hub = new HubRegistry(['./node_modules/light-scripts/gulpfile.js']);
gulp.registry(hub);
