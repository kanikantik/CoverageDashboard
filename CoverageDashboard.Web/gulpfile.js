/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var ngAnotate = require("gulp-ng-annotate");

gulp.task('default', function () {
    // place code for your default task here


});
gulp.task('minify', function () {
    return gulp.src("app/*.js")
               .pipe(ngAnotate())
               .pipe(uglify())
               .pipe(gulp.dest("lib/_app"));



});