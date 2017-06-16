const path = require('path');			
const gulp = require('gulp'),
			gulpRename = require('gulp-rename'),
			gulpFileInclude = require('gulp-file-include'),
			gulpLess = require('gulp-less'),
			gulpFlatmap = require('gulp-flatmap'),
			gulpBatchReplace  = require('gulp-batch-replace'),
			gulpInject = require('gulp-inject'),
			gulpAutoprefixer = require('gulp-autoprefixer');			
			// ToDo: bundle js/css link in html
			// gulpHtmlReplace = require('gulp-html-replace');
const	browserSync = require('browser-sync').create(),
			reload = browserSync.reload;

const lessDir = path.join(__dirname, 'src/less'),
			tplDir = path.join(__dirname, 'src/template'),
			jsDir = path.join(__dirname, 'src/js'),
			cssDir = path.join(__dirname, 'src/css'),
			publicDir = path.join(__dirname, 'src/public');

const lessPath = path.join(lessDir, '*.less'),
			tplPath = [path.join(tplDir, '**/*.html'), path.join(tplDir, '*.html')];

gulp.task('less', () => {	
	return gulp.src(lessPath)
	  .pipe(gulpLess())
	  .pipe(gulpAutoprefixer({
	  	browsers: [
	  		'last 4 versions',
	  		'Android >= 4.0'
	  	]
	  }))
	  .pipe(gulp.dest(cssDir))
	  .pipe(reload({
	  	stream: true
	  }));
});

gulp.task('html', () => {
	return gulp.src(path.join(tplDir, 'content/*.html'))
		.pipe(gulpFlatmap(function(stream, file) {
			var fileName = path.basename(file.path);
			var jsName = fileName.replace('.html', '.js');
			var cssName = fileName.replace('.html', '.css');
			var layoutPath = path.join(tplDir, 'layout.html');			
			// Stream that default js&css used by content html files
			var defStream = gulp.src([`${jsDir}/${jsName}`, `${cssDir}/${cssName}`]);
				
			var regCss = /<link\s.*href=([\"\'])(.*\.css)\1[^>]*>/ig;
			var regJs = /<script\s.*src=([\"\'])(.*\.js)\1[^>]*><\/script>/ig;
			var ref = [];
			var refList = [];
			var content = file.contents.toString('utf8');
			var matchedCss = content.match(regCss);
			var matchedJs = content.match(regJs);
			if(matchedCss) {
				matchedCss.forEach((tag, i) => {
					ref = tag.replace(regCss, '$2');
					refList.push(ref);
				});
			}
			if(matchedJs) {
				matchedJs.forEach((tag, i) => {
					ref = tag.replace(regJs, '$2');
					refList.push(ref);
				});
			}

			// js&css dependent'stream that was delared in html	
			var domStream = gulp.src(refList.map(path => path.replace('./public/', './src/public/')), {base: './src'});
			var replaceThese = [
				['{{fileName}}', fileName],
				['/src/', './']
			]

			var layoutStream = gulp.src(layoutPath)
				.pipe(gulpRename(fileName))
				.pipe(gulpInject(domStream, {starttag: '<!-- inject:public:{{ext}} -->'}))		
				.pipe(gulpInject(defStream))
				.pipe(gulpBatchReplace(replaceThese))
				.pipe(gulpFileInclude({
					prefix: '@@',
					basepath: '@file',	// for resolving path passed to @@include method
					indent: true
				}))				
				.pipe(gulp.dest('src'));

			return layoutStream;
		}))
		.pipe(reload({
			stream: true
		}));
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
	'zui/dist/lib/chart/zui.chart.min.js'
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
