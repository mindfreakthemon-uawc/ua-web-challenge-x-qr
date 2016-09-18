let gulp = require('gulp');
let stylus = require('gulp-stylus');
let plumber = require('gulp-plumber');
let connect = require('gulp-connect');
let concat = require('gulp-concat');

const STYLUS_SRC_GLOB = 'assets/styles/**/*.styl';

/**
 * Compiles each styl file and places it in css dir.
 */
gulp.task('css', () => {
	return gulp.src(STYLUS_SRC_GLOB)
		.pipe(plumber())
		.pipe(stylus({
			pretty: true
		}))
		.pipe(gulp.dest('build/css'))
		.pipe(connect.reload());
});

/**
 * Compiles each styl file into one build.main.css and places it in css dir.
 * Inlines all the images via base64 data URI.
 */
gulp.task('css:bundle', () => {
	return gulp.src(STYLUS_SRC_GLOB)
		.pipe(plumber())
		.pipe(stylus({
			compress: true,
			rawDefine: {
				url: stylus.stylus.url({
					limit: false
				})
			}
		}))
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(connect.reload());
});

gulp.task('css:watch', () => gulp.watch(STYLUS_SRC_GLOB, ['css']));

