var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    server = require('gulp-server-livereload'),
    compass = require('gulp-for-compass'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    rigger = require('gulp-rigger'),
    htmlmin = require('gulp-html-minifier'),
    sourceFile = './js/main.js',
    destFolder = './js/',
    destFile = 'script.js';

gulp.task('browserify', function() {
    return browserify(sourceFile)
        .bundle()
        .pipe(source(destFile))
        .pipe(gulp.dest(destFolder));
});

gulp.task('watch', function() {
  gulp.watch('./html/**/*.html', ['rigger']);
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./js/**/*.js', ['browserify']);
});


gulp.task('sass', function() {
    gulp.src('./scss/style.scss')
        .pipe(compass({
            sassDir: 'scss',
            cssDir: '.',
            imagesDir: 'img',
            javascriptsDir: 'js',
            force: true
        }))
        .pipe(rename("style.css"))
    //.pipe(minifyCSS())
    .pipe(autoprefixer(['last 2 versions']))
        .pipe(gulp.dest('./'));
});


gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(server({
            livereload: true,
            open: true,
            defaultFile: 'index.html'
        }));
});

 
gulp.task('rigger', function () {
    gulp.src('html/index.html')
        .pipe(rigger())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
});


gulp.task('default', ['sass', 'rigger','browserify', 'watch', 'webserver']);
