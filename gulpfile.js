const path = require('path');			
const gulp = require('gulp'),
			gulpFileInclude = require('gulp-file-include'),
			gulpLess = require('gulp-less');
const	browserSync = require('browser-sync').create(),
			reload = browserSync.reload;

const lessDir = path.join(__dirname, 'src/less'),
			tplDir = path.join(__dirname, 'src/template'),
			cssDir = path.join(__dirname, 'src/css');

const lessPath = path.join(lessDir, '**.less'),
			tplPath = path.join(tplDir, '**.html');

gulp.task('less', () => {	
	console.log('less');
	return gulp.src(lessPath)
	  .pipe(gulpLess())
	  .pipe(gulp.dest(cssDir))
	  .pipe(reload({
	  	stream: true
	  }));
});

gulp.task('html', () => {
	return gulp.src(tplPath)
		.pipe(gulpFileInclude({
			prefix: '@@',
			basepath: '@file'	// for resolving path passed to @@include method 
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('serve', ['less', 'html'], () => {		
	browserSync.init({
		server: {
			baseDir: path.join(__dirname, 'src')
		}
	});

	gulp.watch(lessPath, ['less'], (evt) => {
		console.log(evt);
	});	
	gulp.watch(tplPath, ['html']);
});

gulp.task('default', ['serve'], () => {});
