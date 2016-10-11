import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import uglifycss from 'gulp-uglifycss';
import uglify from 'gulp-uglify';
import autoprefix from 'gulp-autoprefixer';
import cmq from 'gulp-combine-media-queries';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import sourceMaps from 'gulp-sourcemaps';

const paths = {
	dev: {
		html: './public/*.html',
		sass: './public/static/sass/main.sass',
		sass2: '/public/static/sass/**',
		js: './dist/bundle.js'
	},

	prod: {
		css: './dist/styles',
		js: './dist/scripts',
		images: './dist/images'
	}
};


gulp.task('browserSync', () => {
	browserSync.init(null, {
		proxy: 'http://localhost:8000',
		files: ["public/**/*.*"],
		port: 7000
	});
});

gulp.task('styles', () => {
	gulp.src(paths.dev.sass)
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourceMaps.init())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compact',
			precision: 10
		}))
		.pipe(autoprefix({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: true
		}))
		.pipe(uglifycss({
			maxLineLne: 80
		}))
		.pipe(sourceMaps.write())
		.pipe(rename((path) => {
			path.extname = '.min.css'
		}))
		.pipe(gulp.dest(paths.prod.css))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', () => {
	gulp.src(paths.dev.js)
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename((path) => {
			path.extname = '.min.js'
		}))
		.pipe(gulp.dest(paths.prod.js))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('html', () => {
	gulp.src(paths.dev.html)
		.pipe(plumber())
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('default', ['browserSync', 'scripts', 'styles', 'html'], () => {
	gulp.watch([paths.dev.sass, paths.dev.sass2], ['styles']);
	gulp.watch(paths.dev.html, ['html']);
	gulp.watch(paths.dev.js, ['scripts']);
});





