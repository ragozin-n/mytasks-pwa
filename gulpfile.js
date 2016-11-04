'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat'); 
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('sass', function () {
  return gulp.src('src/client/app/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('src/server/static/'))
    .pipe(connect.reload());
});

gulp.task("babel", function(){
    return gulp.src("src/client/app/*.jsx")
    	.pipe(babel())
    	.pipe(gulp.dest("src/server/static/"))
    	.pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp.src('src/client/app/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('src/server/static'));
});

gulp.task('http-server', function() {
	connect.server({
	  port: 8888,
	  livereload: true
	});

    console.log('Server listening on http://localhost:8888');
});

gulp.task('watch', function() {
    gulp.run('sass');
    gulp.run('babel');
    gulp.run('images');
    gulp.watch('src/client/app/*.scss', ['sass']);
    gulp.watch('src/client/app/*jsx', ['babel']);
    gulp.run('http-server');
});

gulp.task('default', ['watch']);