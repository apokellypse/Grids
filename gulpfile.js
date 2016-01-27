var gulp = require('gulp');

// plugins
var fs     = require('fs');
var path   = require('path');
var es     = require('event-stream');
var jshint = require('gulp-jshint');
var sass   = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var startPath = 'src/js';
var finalPath = 'dist/js';

function getFolders(dir) {
	return fs.readdirSync(dir)
			.filter(function(file) {
					return fs.statSync(path.join(dir, file)).isDirectory();
			});
}

gulp.task('lint', function() {
	return gulp.src('src/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
	return gulp.src('src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});

// concat and minify/uglify
gulp.task('scripts', function() {
	var folders = getFolders(startPath);

	var tasks = folders.map(function(folder) {
		return gulp.src(path.join(startPath, folder, '/*.js'))
			.pipe(concat(folder + '.js'))
			.pipe(gulp.dest(finalPath));
			// .pipe(rename(folder + '.min.js'))
			// .pipe(uglify())
			// .pipe(gulp.dest(finalPath));
	});

	return es.concat.apply(null, tasks);
});

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['lint', 'scripts']);
	gulp.watch('src/scss/*.scss', ['sass']);
});

gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);