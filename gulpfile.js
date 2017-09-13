const gulp = require('gulp')
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const less = require('gulp-less')
const maps = require('gulp-sourcemaps')
const watch = require('gulp-watch')
const watchLess = require('gulp-watch-less')
const rename = require("gulp-rename")
const notify = require("gulp-notify")
const lazypipe = require("lazypipe")
const del = require('del')
const runseq = require('run-sequence')

const srcPath = 'src'
const destPath = 'lib'
const stylesRoot = 'app'

const handleErrors = lazypipe()
    .pipe(plumber, {
        errorHandler: notify.onError("Error: <%= error.message %>"),
        onLast: false,
        emitError: false
    })

gulp.task('default', ['clean'], function(cb) {
    runseq([ 'htdocs', 'scripts', 'styles' ], cb)
})

gulp.task('clean', function() { return del([`${destPath}/**/*`]) })

gulp.task('htdocs', function() {
    const srcPattern = `${srcPath}/**/*.html`
    return gulp.src(srcPattern)
        .pipe(handleErrors())
        .pipe(watch(srcPattern, { ignoreInitial: false, verbose: true }))
        .pipe(gulp.dest(destPath))
})

gulp.task('scripts', function() {
    const srcPattern = [ `${srcPath}/**/*.js`, `!${srcPath}/bak{,/**}` ]
    const watchOpts = { verbose: true, ignoreInitial: false }
    const transpile = lazypipe()
        .pipe(maps.init).pipe(babel).pipe(maps.write).pipe(gulp.dest, destPath)
    return gulp.src(srcPattern)
        .pipe(watch(srcPattern, watchOpts, function(file) {
            gulp.src(file.path).pipe(handleErrors()).pipe(transpile())
        }))
})


gulp.task('styles', function() {
    const srcPattern = `${srcPath}/${stylesRoot}.less`
    const watchOpts = { verbose: true }
    const transpile = lazypipe()
        .pipe(maps.init).pipe(less).pipe(maps.write).pipe(gulp.dest, destPath)
    return gulp.src(srcPattern).pipe(handleErrors()).pipe(transpile())
        .pipe(watchLess(srcPattern, watchOpts, function() {
            gulp.src(srcPattern).pipe(handleErrors()).pipe(transpile())
        }))
})
