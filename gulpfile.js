'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat'); 
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('sass', function () {
    return gulp
        .src('src/client/app/*.scss')
        .pipe(concat('main.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('src/server/static'))
        .pipe(connect.reload());
});

gulp.task("babel", function(){
    return gulp
        .src("src/client/app/*.jsx")
    	.pipe(babel())
    	.pipe(gulp.dest('src/server/static/'))
    	.pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp
        .src('src/client/app/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('src/server/static'));
});

gulp.task('css_bower', function(){
    return gulp.src(['src/server/static/*.css','bower_components/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('src/server/static'));
})

gulp.task('build', function(){
    gulp.run('sass');
    gulp.run('css_bower');
    gulp.run('babel');
    gulp.run('images');
});

gulp.task('watch', function() {
    gulp.run('build');
    gulp.watch('src/client/app/*.scss', ['sass', 'css_bower']);
    gulp.watch('src/client/app/*jsx', ['babel']);
});

gulp.task('default', ['watch']);