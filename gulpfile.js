const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
// Пока не разобрался как связать с SCSS
const sourcemaps = require('gulp-sourcemaps');

const scssFiles = [
    './src/css/scss/_values.scss',
    './src/css/scss/_mixins.scss',
    './src/css/scss/_container.scss',
    './src/css/scss/_base.scss',
    './src/css/scss/style.scss'
];

const cssFiles = [
    './node_modules/normalize.css/normalize.css',
    './src/css/chosen.css',
    './src/css/ion.rangeSlider.min.css',
    './src/css/owl.carousel.min.css',
    './src/css/style.css'
];

const jsFiles = [
    './src/js/jquery-3.3.1.min.js',
    './src/js/chosen.jquery.js',
    './src/js/ion.rangeSlider.min.js',
    './src/js/owl.carousel.min.js',
    './src/js/script.js'
];


function stylesSCSS() {
    return gulp.src(scssFiles)
                // Из SASS в CSS
                .pipe(sass().on('error', sass.logError))
                // Объединение всех скомпиленых SCSS в один
                .pipe(concat('style.css'))
                // Сохранение итогового файла основных стилей
                .pipe(gulp.dest('./src/css'));
}

function styles() {
    // return gulp.src('./src/css/**/*.css')
    return gulp.src(cssFiles)
                // Объединение
                .pipe(concat('style.css'))
                // Префиксы
                .pipe(autoprefixer({
                    browsersList: ['> 0.1%'],
                    cascade: false
                }))
                // Минификация CSS
                .pipe(cleanCSS({
                    level: 2
                }))
                // Сохранение итогового файла стилей
                .pipe(gulp.dest('./build/css'))
                .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
                // Объединение
                .pipe(concat('script.js'))
                // Минификация
                .pipe(uglify({
                    toplevel: true
                }))
                .pipe(gulp.dest('./build/js'))
                .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: true
    });
    gulp.watch('./src/css/**/*.scss', stylesSCSS);
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./*.html', browserSync.reload);
}

function clean() {
    return del(['build/*']);
}

gulp.task('stylesSCSS', stylesSCSS);
gulp.task('styles', styles);
gulp.task('scripts',scripts);
gulp.task('watch', watch);
// gulp.task('clean', clean);
gulp.task('build', gulp.series(clean, 
                        gulp.series(stylesSCSS,
                            gulp.parallel(styles, scripts)
                        )
                    ));

gulp.task('dev', gulp.series('build', 'watch'));
