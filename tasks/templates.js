let gulp = require('gulp');
let pug = require('gulp-pug');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');

const PUG_SRC_GLOB = 'assets/templates/**/*.pug';

/**
 * Compiles templates.
 */
gulp.task('templates', () => {
	return gulp.src(PUG_SRC_GLOB)
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest('build/templates'))
		.pipe(connect.reload());
});

gulp.task('templates:watch', () => gulp.watch(PUG_SRC_GLOB, ['templates']));
