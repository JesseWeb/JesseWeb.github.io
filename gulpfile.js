let gulp = require('gulp')
let babel = require("gulp-babel")
let pump = require('pump')
let uglify = require('gulp-uglify')
let sourcemaps = require('gulp-sourcemaps');
let plumber = require("gulp-plumber")
let browserSync = require('browser-sync')
let reload = browserSync.reload;
let cleanCSS = require('gulp-clean-css')
let gulpSequence = require('gulp-sequence')
const autoprefixer = require('gulp-autoprefixer');
const path = require('path')

gulp.task('jsUglify', function () {
    pump([
        gulp.src('./js/main.js'),
        plumber(),
        sourcemaps.init(),
        babel({
            presets: ['env']
        }),
        uglify(),
        sourcemaps.write('./maps'),
        gulp.dest('./static'),
        reload({
            stream: true
        }),
    ])
})
gulp.task('cssMinify', function () {
    pump([
        gulp.src('./style/main.css'),
        plumber(),
        sourcemaps.init(),
        autoprefixer(),
        cleanCSS({
            // compatibility: 'ie8'
        }),
        sourcemaps.write('./maps'),
        gulp.dest('./static'),
        reload({
            stream: true
        })
    ])

});

function jsUglify(src) {
    let dist = path.relative(__dirname,'./static')
    pump([
        gulp.src(src),
        plumber({
            errorHandler(err, callback) {
                console.log(err)
            }
        }),
        sourcemaps.init(),
        babel({
            presets: ["env"],
            plugins: ["syntax-async-functions"]
        }),
        uglify(),
        sourcemaps.write('maps'),
        gulp.dest(dist),
        reload({
            stream: true
        }),
    ])
}

function cssMinify(src) {
    let dist = path.relative(__dirname,'./static')
    pump([
        gulp.src(src),
        plumber({
            errorHandler(err, callback) {
                console.log(err)
            }
        }),
        sourcemaps.init(),
        cleanCSS({
            compatibility: 'ie8'
        }),
        sourcemaps.write('maps'),
        gulp.dest(dist),
        reload({
            stream: true
        }),
    ])
}
gulp.task('default', function (cb) {
    gulpSequence('jsUglify', 'cssMinify', () => {
        browserSync.init({
            port: 80,
            server: {
                baseDir: "./",
            },
        });
        gulp.watch('./js/main.js').on('change', function (e) {
            jsUglify(e.path)
        })
        gulp.watch(['./js/main.js','./index.html']).on('change', reload);
        gulp.watch('./style/main.css').on('change', function (e) {
            cssMinify(e.path)
        })
    })
})