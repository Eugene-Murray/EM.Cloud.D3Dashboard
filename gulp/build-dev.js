'use strict';


var gulp = require('gulp');

var paths = gulp.paths;

var filesToMove = [
        paths.src + '/app/**/*.*',
        paths.src + '/assets/**/*.*',
        paths.src + '/components/**/*.*',
        paths.src + '/index.dev.html'
    ];

gulp.task('move', ['clean'], function() {
   gulp.src(filesToMove, { base: 'src' })
   .pipe(gulp.dest(paths.dist));
});


gulp.task('build-dev', ['move', 'inject']);
