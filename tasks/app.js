let gulp = require('gulp');
let typescript = require('gulp-tsc');
let connect = require('gulp-connect');
let plumber = require('gulp-plumber');
let rename = require('gulp-rename');
let embed = require('gulp-angular2-embed-templates');
let Builder = require('systemjs-builder');

const APP_SRC_GLOB = 'app/**/*.ts';

	/**
	 * Compiles typescript application and copies it to app dir.
	 */
	gulp.task('app', () => {
		let compilerOptions = require('../tsconfig.json').compilerOptions;

		return gulp.src(['typings/index.d.ts', APP_SRC_GLOB])
			.pipe(plumber())
			.pipe(typescript(compilerOptions))
			.pipe(gulp.dest('build/app'))
			.pipe(connect.reload());
	});

	/**
	 * Embeds compiled templates into compiled application.
	 */
	gulp.task('app:embed', ['app', 'templates'], () => {
		return gulp.src('build/app/**/*.js', { base: 'build/app' })
			.pipe(embed({
				sourceType: 'js',
				basePath: '.',
				minimize: {
					quotes: true
				}
			}))
			.pipe(gulp.dest('build/app'));
	});

	/**
	 * Bundles application into one file, along with RxJS and Angular2.
	 */
	gulp.task('app:bundle', ['app', 'app:embed', 'vendor'], () => {
		var builder = new Builder('.', './systemjs.config.js');

		return builder.bundle('app', 'build/bundle/app.min.js', { minify: true });
	});

	gulp.task('app:watch', () => gulp.watch(APP_SRC_GLOB, ['app']));
