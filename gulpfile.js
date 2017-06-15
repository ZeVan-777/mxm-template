const path = require('path');			
const gulp = require('gulp'),
			gulpRename = require('gulp-rename'),
			gulpFileInclude = require('gulp-file-include'),
			gulpLess = require('gulp-less'),
			gulpForeach = require('gulp-foreach'),
			gulpBatchReplace  = require('gulp-batch-replace');
			// ToDo: bundle js/css link in html
			// gulpHtmlReplace = require('gulp-html-replace');
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
	return gulp.src(path.join(tplDir, 'content/*.html'), {read: false})	// make processing faster
		.pipe(gulpForeach(function(stream, file) {
			var filename = path.basename(file.path);
			var replaceThese = [
				['{{filename}}', filename]
			];
			return gulp.src(path.join(tplDir, 'layout.html'))
				.pipe(gulpBatchReplace(replaceThese))
				.pipe(gulpFileInclude({
					prefix: '@@',
					basepath: '@file',	// for resolving path passed to @@include method
					indent: true
				}))
				.pipe(gulpRename(filename))
				.pipe(gulp.dest('src'))
		}))
		.pipe(reload({
			stream: true
		}));

	// return gulp.src(path.join(tplDir, 'layout.html'))
	// 	.pipe(gulpFileInclude({
	// 		prefix: '@@',
	// 		basepath: '@file',	// for resolving path passed to @@include method
	// 		indent: true
	// 	}))
	// 	.pipe(gulp.dest('src'))
	// 	.pipe(reload({
	// 		stream: true
	// 	}));
});

// move bower files to src directory
const bowerList = [
	'zui/dist/**/zui.css',	// @font-face refer to zenicon.* with a relative directory
	'zui/dist/**/zenicon.*',
	'zui/dist/js/zui.min.js',
	'jquery/jquery.min.js',
	'html5shiv/dist/html5shiv.min.js',
	'object-fit-polyfill/dist/object-fit-polyfill.js',
	'vminpoly/*.js',
	'normalize-css/normalize.css',
	'zui/dist/lib/chart/zui.chart.min.js',
	'zui/dist/lib/datatable/zui.datatable.css',
	'zui/dist/lib/datatable/zui.datatable.js'
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
