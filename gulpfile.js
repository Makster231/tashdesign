'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cleanCSS = require('gulp-clean-css'),
    rigger = require('gulp-rigger'),
    del = require('del'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    htmlmin = require('gulp-htmlmin'),
    replace = require('gulp-replace'),
    purgecss = require('gulp-purgecss'),
    version = require('gulp-version-number');

const versionConfig = {
    'value': '%DT%',
    'append': {
        'cover': 1,
        'key': 'v',
        'to' : [
            {
            'type': 'css',
            'files': ['style.css']
            },
            {
            'type': 'js',
            'files': ['custom.js']
            },
        ],
    },
};

const path = {
    dist: {
        root: './dist/',
        js: './dist/js/',
        jsmain: './dist/js',
        css: './dist/css/',
        images: './dist/images/',
        font: './dist/font/'
    },

    app: {
        root: './app/',
        htmlViews: './app/views/pages/*.html',
        style: './app/css/',
        scss: './app/scss/site.scss',
        js: './app/js/',
        jsComponents: './app/js/component/',
        images: './app/images/',
        font: './app/font/**/*'
    },

    watch: {
        html: './app/views/**/*.html',
        style: './app/scss/',
        js: './app/js/component/**/*.js'
    }
};

const js_plugins = [
	path.app.jsComponents + 'check-webp.js',
	path.app.jsComponents + 'benefits.js',
	path.app.jsComponents + 'disable-select.js',
	path.app.jsComponents + 'form.js',
	path.app.jsComponents + 'forms-mirroring.js',
	path.app.jsComponents + 'gallery.js',
	path.app.jsComponents + 'instagram.js',
	path.app.jsComponents + 'popup.js',
	path.app.jsComponents + 'preload-images.js',
	path.app.jsComponents + 'scroll.js',
	path.app.jsComponents + 'sequence.js',
	path.app.jsComponents + 'services.js',
	path.app.jsComponents + 'slick-slider.js',
	path.app.jsComponents + 'video.js',
	path.app.jsComponents + 'map.js',
	path.app.jsComponents + 'after-reload.js',
	path.app.jsComponents + 'custom.js',
];

gulp.task('browser-sync', () => { //local host for development
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        //tunnel: true,
        host: 'localhost',
        open: 'external',
        port: 3000,
        logPrefix: "server"
    });
});

//Task for Dev:
gulp.task('html:dev', (done) => { //compile .html pages in ./app (root);
    gulp.src(path.app.htmlViews)
        .pipe(rigger())
        .pipe(replace(/{{var_path_env}}/g, path.app.root))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}));

    done();
});

gulp.task('style:dev', (done) => { //build .css from .scss
    gulp.src(path.app.scss)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.app.style))
        .pipe(browserSync.reload({stream: true}));

    done();
});

gulp.task('js:dev', (done) => {
    gulp.src(js_plugins)
        .pipe(sourcemaps.init())
        .pipe(concat('custom.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.app.js))
        .pipe(browserSync.reload({stream: true}));

    done();
});

gulp.task('watch', () => {
    gulp.watch(path.watch.html, gulp.series('html:dev')); // watch for .html components -> compile to ./app (.html pages);
    gulp.watch(path.watch.style, gulp.series('style:dev')); // watch .scss in dir scss  -> compile to ./app/css (.css styles);
    gulp.watch(path.watch.js, gulp.series('js:dev'));   // watch .js files in dir js -> compile to ./app/js (custom.js);
});

gulp.task('build:dev', //build for DEV env
    gulp.series(
        'html:dev',
        'style:dev',
        'js:dev'), (done) => {

        done();
    });


//Task for Prod:
gulp.task('clean:dist', (done) => {
    del.sync('dist'); // remove 'dist' dir before build:prod

    done();
});

gulp.task('html:prod', (done) => { //copy pages from ./app/*.html
    gulp.src(path.app.htmlViews)
        .pipe(rigger())
        .pipe(replace(/{{var_path_env}}/g, path.dist.root))
        .pipe(htmlmin({
            collapseWhitespace: true,
            // minifyJS: true,
            minifyCSS: true,
            removeComments: true
        }))
		.pipe(version(versionConfig))
        .pipe(gulp.dest('./'));

    done();
});

gulp.task('style:prod', (done) => { //recompile styles from ./app/scss
    gulp.src(path.app.scss)
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], {cascade: true}))
        .pipe(purgecss({
            content: ['**/*.html']
        }))
        .pipe(cleanCSS({level: {1: {specialComments: 0}, 2: {},},}))
        .pipe(gulp.dest(path.dist.css));

    done();
});

gulp.task('font:prod', (done) => { //recompile fonts from ./font
    gulp.src(path.app.font)
        .pipe(gulp.dest(path.dist.font));
    done();
});

gulp.task('js:prod', (done) => { //recompile scripts from ./app/js/components 
    gulp.src(js_plugins)
        .pipe(concat('custom.js'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js));

    done();
});

gulp.task('clear', (callback) => {
    return cache.clearAll();
})

gulp.task('build:prod', //build for PROD env
    gulp.series(
        'clean:dist',
        'html:prod',
        'style:prod',
        'font:prod',
        'js:prod'), (done) => {

        done();
    });

gulp.task('default', gulp.parallel('browser-sync', 'watch', 'build:dev'));