var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var tsc = require("typescript")
var typescript = require("gulp-typescript");

var config = {
	sass: { 
		src: ['./scss/**/*.scss'],
		dest: "./www/css"
	},
	ts: {
		src: ["./ts/**/*.ts", "!./ts/**/*.d.ts"],
		base: "./ts",
		dest: "./www/js"
	}
};
var tsconfig = function() { return typescript.createProject("tsconfig.json", { typescript: tsc }); };

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src(config.sass.src)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(config.sass.dest))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.sass.dest))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(config.sass.src, ['sass']);
});

/**
 * Compiles the TypeScript into JavaScript files.
 */
gulp.task("compile", function() {
	return gulp.src(config.ts.src, { base: config.ts.base })
		.pipe(typescript(tsconfig()))
		.on("error", function() {
			process.exit(1);
		})
		.js
		//.pipe(uglify())
		.pipe(gulp.dest(config.ts.dest));
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
