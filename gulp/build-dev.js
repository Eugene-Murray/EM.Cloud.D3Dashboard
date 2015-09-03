'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

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
   
   gulp.src('bower_components/**/*.*', { base: './' })
   .pipe(gulp.dest(paths.dist));
});

gulp.task('less-css', function(){
   console.log('Compiling Less --> CSS');
    
    return gulp
        .src(paths.src + '/app/less/style.less')
        //.pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({
            browser: ['last 2 version', '> 5%']    
        }))
        .pipe(gulp.dest(paths.dist + '/app/css'));     
});

// gulp.task('wiredep', function(){
//   console.log('Wiring the bower dependencies into the html');
  
//   var wiredep = require('wiredep').stream;
//   var options = config.getWiredepDefaultOptions();
  
//   return gulp
//         .src(config.index)
//         .pipe(wiredep(options))
//         .pipe($.inject(gulp.src(config.js)))
//         .pipe(gulp.dest(config.client));  
// });

gulp.task('inject', function(){
    
    console.log('Wire up css into the html, after files are ready');
    
    return gulp
        .src(paths.src + '/index.dev.html')
        .pipe($inject(gulp.src(paths.dest + '/app/css/*.css')))
        .pipe(gulp.dest(paths.dest + '/index.dev.html'));
});

gulp.task('build-dev', ['move', 'less-css', 'inject']);
//gulp.task('build-dev', ['less-css']);