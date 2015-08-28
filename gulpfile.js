'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.paths = {
  src: 'src',
  dist: 'public',
  tmp: '.tmp',
  e2e: 'e2e'
};

gulp.task('default', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT:process.env.PORT
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting');
    });
});

gulp.task('test', function(){
    env({vars: {ENV:'Test'}});
    gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
});

require('require-dir')('./gulp');

gulp.task('create-ui', ['clean'], function () {
    gulp.start('build');
});