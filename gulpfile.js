var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var jsFiles = [
    'src/js/example.js'
];

gulp.task('clean', function () {
    return del('public/**/*');
});

gulp.task('views', function() {
    return gulp.src('src/views/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('./public'))
});

gulp.task('sass', function(){
    return gulp.src('src/sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});

gulp.task('minicss', function(){
    return gulp.src('public/css/style.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/css'))
});

gulp.task('scripts', function(){
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

gulp.task('build', gulp.series('clean', 'sass', 'minicss', 'scripts'), function(){});