'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('browser-sync', function() {
    var files = [
    	'./style.css',
    	'./*.aspx',
        './*.cshtml',
    	'./*.html'
    ];
 
    browserSync.init(files, {
        proxy: 'localhost:51213/',
    	notify: false,
		port: 3598
    });
});

gulp.task('stylus:watch', function () {
	gulp.watch('assets/stylus/**/*.styl', ['css']);
});

gulp.task('javascript:watch', function () {
    gulp.watch('assets/js/*.js', ['javascript']);
});

gulp.task('buildfiles', function () {
    var processors = [
		autoprefixer({ browsers: ['last 10 versions', '> 1%', 'ie 9'] }),
		cssnano()
	];
	
	return gulp.src('./*.css')
		.pipe(plumber())
		.pipe(stylus())
		.pipe(postcss(processors))
		.pipe(gulp.dest('./css'));
});

gulp.task('css', ['stylus'], function () {
	var processors = [
		autoprefixer({ browsers: ['last 10 versions', '> 1%', 'ie 9'] }),
        cssnano()
	];

	return gulp.src('./*.css')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./css'))
		.pipe(reload({stream:true}));
});

gulp.task('stylus', function () {
	return gulp.src('./assets/stylus/style.styl')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'));
});

gulp.task('javascript', function () {
    pump([
        gulp.src('./assets/js/*.js'),
        uglify(),
        gulp.dest('./js')
    ]);
});

gulp.task('default', ['stylus:watch', 'javascript:watch']);
gulp.task('onlyCss', ['stylus:watch']);
gulp.task('build', ['buildfiles']);
gulp.task('buildAll', ['buildfiles', 'javascript']);