let gulp = require('gulp');
let connect = require('gulp-connect');

const STATICS_SRC_GLOB = 'assets/statics/**/*';

/**
 * Copies all statics to statics dir.
 */
gulp.task('statics', () => {
	return gulp.src(STATICS_SRC_GLOB)
		.pipe(gulp.dest('build/statics'))
		.pipe(connect.reload());
});
