const path = require('path');			
const gulp = require('gulp'),
			gulpFileInclude = require('gulp-file-include'),
			gulpLess = require('gulp-less');
const	browserSync = require('browser-sync').create(),
			reload = browserSync.reload;

const lessDir = path.join(__dirname, 'src/less'),
			tplDir = path.join(__dirname, 'src/template'),
			cssDir = path.join(__dirname, 'src/css'),
			publicDir = path.join(__dirname, 'src/public');

const lessPath = path.join(lessDir, '*.less'),
			tplPath = [path.join(tplDir, '**/*.html'), path.join(tplDir, '*.html')];

gulp.task('less', () => {	
	return gulp.src(lessPath)
	  .pipe(gulpLess())
	  .pipe(gulp.dest(cssDir))
	  .pipe(reload({
	  	stream: true
	  }));
});

gulp.task('html', () => {
	return gulp.src(path.join(tplDir, '*.html'))
		.pipe(gulpFileInclude({
			prefix: '@@',
			basepath: '@file',	// for resolving path passed to @@include method
			indent: true
		}))
		.pipe(gulp.dest('src'))
		.pipe(reload({
			stream: true
		}));
});

// move bower files to src directory
const bowerList = [
	'zui/dist/**/zui.css',	// @font-face refer to zenicon.* with a relative directory
	'zui/dist/**/zenicon.*',
	'normalize-css/normalize.css',
	'jquery/jquery.min.js',
	'html5shiv/dist/html5shiv.min.js',
	'object-fit-polyfill/dist/object-fit-polyfill.js'
];
gulp.task('bower', () => {
	return gulp.src(bowerList.map(item => `bower_components/${item}`))
	  .pipe(gulp.dest(publicDir));
});

gulp.task('serve', ['less', 'html', 'bower'], () => {		
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});

	gulp.watch(lessPath, ['less']);	
	gulp.watch(tplPath, ['html']);
});

gulp.task('default', ['serve']);
