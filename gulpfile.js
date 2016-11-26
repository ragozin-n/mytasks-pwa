'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat'); 
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('sass', ['clean'], function () {
    return gulp
        .src('src/client/app/*.scss')
        .pipe(concat('main.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('src/server/static'))
});

gulp.task("babel", function(){
    return gulp
        .src("src/client/app/*.jsx")
    	.pipe(babel())
    	.pipe(gulp.dest('src/server/static/'))
});

gulp.task('images', function() {
    return gulp
        .src('src/client/app/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('src/server/static'));
});

gulp.task('bower', ['sass'], function(){
    return gulp.src(['src/server/static/*.css','bower_components/materialize/dist/css/materialize.min.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('src/server/static'));
})

gulp.task('build', function(){
    gulp.run('clean');
    gulp.run('sass');
    gulp.run('bower');
    // gulp.run('babel');
    gulp.run('images');
});

gulp.task('clean', function(){
    return gulp.src('src/server/static/*.css', {read:false})
        .pipe(clean())
})

gulp.task('styles', function(){
    gulp.run('clean');
    gulp.run('sass');
    gulp.run('bower');
});

gulp.task('browserify', function() {
    return browserify('src/client/app/scripts.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('src/server/static'));
});

gulp.task('watch', function() {
    gulp.run('build');
    gulp.watch('src/client/app/*.scss', ['styles']);
    gulp.watch('src/client/app/scripts.js', ['browserify']);
    // gulp.watch('src/client/app/*jsx', ['babel']);
});

gulp.task('default', ['watch']);