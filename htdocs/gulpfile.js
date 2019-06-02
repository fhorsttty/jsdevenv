// Gulp 4
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del');

// html
const prettify = require('gulp-prettify');
const ejs = require('gulp-ejs');

// styles(sass, postcss)
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const flexBugFixes = require('postcss-flexbugs-fixes');
const cssdeclsort = require('css-declaration-sorter');

// js
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// images
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

const paths = {
  root: './src',
  html: {
    src: './src/html/**/*.html',
    dest: './dist/',
  },
  ejs: {
    src: [
      './src/ejs/**/*.ejs',
      '!' + './src/ejs/**/_*.ejs',
    ],
    dest: './dist/',
  },
  styles: {
    src: './src/styles/style.scss',
    dest: './dist/styles',
    map: './dist/styles/maps',
  },
  scripts: {
    src: './src/js/**/*.js',
    dest: './dist/js',
    map: './dist/js/maps',
  },
  images: {
    src: './src/images/**/*.{jpg,jpeg,png,svg,gif}',
    dest: './dist/images',
  },
  vendor: {
    src: [
      './src/vendor/**/*.js',
      './src/vendor/**/*.css',
    ],
    dest: './dist/vendor',
  }
};
const errorMessage = 'Error: <%= error.message %>';

// html整形
const prettifyOption = {
  indent_char: ' ',
  indene_size: 2,
  unformatted: ['a', 'span', 'br'],
};

gulp.task('html', () => {
  return gulp
    .src(paths.html.src, { since: gulp.lastRun('html') })
    .pipe(prettify(prettifyOption))
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task('ejs', () => {
  return gulp
    .src(paths.ejs.src)
    .pipe(ejs())
    .pipe(rename({
      extname: ".html",
    }))
    .pipe(prettify(prettifyOption))
    .pipe(gulp.dest(paths.ejs.dest));
});

// sassのコンパイル
gulp.task('styles', () => {
  const postcssOption = [
    assets({
      baseUrl: '/',
      basePath: 'src/',
      loadPaths: ['images'],    // 画像のパスを解決する。
      cachebuster: true,
    }),
    // mqpacker(),                 // メディアクエリを集約する。
    cssdeclsort({               // cssの順番を整列する。
      order: 'smacss',
    }),
    flexBugFixes,
    autoprefixer({              // ベンダープレフィックスを追加する。
      browsers: ['last 1 versions'],
      // browsers: ['last 1 versions, ie 10'],
      grid: true,
    }),
  ];

  return gulp
    .src(paths.styles.src, { sourcemaps: true })
    .pipe(plumber({
      errorHandler: notify.onError(errorMessage),
    }))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'expanded',
      // outputStyle: 'compressed',
    }))
    .pipe(postcss(postcssOption))
    .pipe(gulp.dest(paths.styles.dest, { sourcemaps: './maps' }));
});

// jsコンパイル
gulp.task('scripts', () => gulp
  .src(paths.scripts.src, { sourcemaps: true })
  .pipe(plumber({
    errorHandler: notify.onError(errorMessage),
  }))
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: './maps' })),
);

// 画像最適化
gulp.task('images', () => {
  const imageminOption = [
    pngquant({
      quality: [0.7, 0.85],
    }),
    mozjpeg({
      quality: 85,
    }),
    imagemin.gifsicle(),
    imagemin.jpegtran(),
    imagemin.optipng(),
    imagemin.svgo({
      removeViewBox: false,
    }),
  ];

  return gulp
    .src(paths.images.src, {
      since: gulp.lastRun('images'),
    })
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('serve', (done) => {
  const browserSyncOption = {
    port: 3000,
    server: {
      baseDir: './dist/',
      index: 'index.html',
    },
    reloadOnRestart: true,
  };

  browserSync.init(browserSyncOption);
  done();
});

gulp.task('watch', () => {
  const browserReload = (done) => {
    browserSync.reload();
    done();
  };

  gulp.watch(paths.styles.src).on('change', gulp.series('styles', browserReload));
  gulp.watch(paths.scripts.src).on('change', gulp.series('scripts', browserReload));
  gulp.watch(paths.ejs.src).on('change', gulp.series('ejs', browserReload));
  gulp.watch(paths.html.src).on('change', gulp.series('html', browserReload));
});

gulp.task('vendor', () => gulp.src(paths.vendor.src).pipe(gulp.dest(paths.vendor.dest)));
gulp.task('clean', () => del([paths.styles.map, paths.scripts.map]));
gulp.task('default', gulp.series('serve', 'watch'));
