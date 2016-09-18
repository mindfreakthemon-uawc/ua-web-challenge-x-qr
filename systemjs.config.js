(function (global) {
	var map = {
		'app': 'build/app/app',
		'@angular': 'build/vendor/@angular',
		'rxjs': 'build/vendor/rxjs',
		'google-maps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDl5GGBdprdOCGM7ZXZYAR8Q6pbXxnLqgY'
	};

	var packages = {
		'app': {
			main: 'main.js',
			defaultExtension: 'js'
		},
		'rxjs': {
			defaultExtension: 'js'
		}
	};

	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade',
	];

	ngPackageNames.forEach(function (pkgName) {
		packages['@angular/' + pkgName] = {
			main: System.packageWithIndex ? 'index.js' : 'bundles/' + pkgName + '.umd.js',
			defaultExtension: 'js'
		};
	});

	System.config({
		map: map,
		meta: {
			'google-maps': {
				format: 'global',
				exports: 'google',
				scriptLoad: true
			}
		},
		packages: packages
	});
})(this);
