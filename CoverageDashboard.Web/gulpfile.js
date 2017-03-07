/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var ngAnotate = require("gulp-ng-annotate");
var concat = require("gulp-concat");
//var jshint = require("gulp-jshint");

gulp.task('default', function () {
    // place code for your default task here


});
gulp.task('minify', function () {
    //Include the all .js files from app/ and app/**/*.js 
    //Exclude the files which ends *.spec.js 
    return gulp.src(["app/*.js", "app/**/*.js", "!app/**/*.spec.js"])
               //.pipe(jshint())
               .pipe(ngAnotate())
               .pipe(concat('capabilitymain.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest("lib/_app"));



});