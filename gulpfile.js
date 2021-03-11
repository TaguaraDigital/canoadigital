/*----------------------------------------------------------
  Creado en mayo 2020
------------------------------------------------------------*/
const gulp         = require('gulp');
const babel        = require('gulp-babel');
const concat       = require('gulp-concat');
const terser       = require('gulp-terser');
const htmlmin      = require('gulp-htmlmin');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const postcss      = require('gulp-postcss');
const cssnano      = require('cssnano');
const autoprefixer = require('autoprefixer');
const del          = require('del');
const imagemin     = require('gulp-imagemin');
const browserSync  = require('browser-sync').create();

sass.compiler = require('node-sass');

// Paths
const paths = {
   root: {
      www: 'docs',
   },
   src: {
      root:    'src',
      pug:     'src/pug/index.pug',
      html:    'src/html/**/*.html',
      css:     'src/css/*.css',
      scss:    'src/scss/**/*.scss',
      js:      'src/js/**/*.js',
      vendors: 'src/assets/vendors/**/*.*',
      imgs:    'src/assets/img/**/*.+(png|jpg|gif|svg)',
   },
   dist: {
      root:    'docs',
      php:     'docs/php',
      pug:     'docs',
      html:    'docs',
      css:     'docs/css',
      js:      'docs/js',
      imgs:    'docs/assets/img',
      vendors: 'docs/assets/vendors',
   },
};

// delTask 
gulp.task('delTask', ()=> {
   del(paths.src.css);
	return del(paths.dist.root);
});

// htmlTask 
gulp.task('htmlTask', ()=>{
   return gulp
      .src(paths.src.html)
      .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(gulp.dest(paths.dist.html));
})

// imgTask
gulp.task('imgTask', ()=> {
   return gulp
      .src(paths.src.imgs)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.dist.imgs));
});

// Compile SCSS
gulp.task('sassTask', () => {
   return gulp
      .src(paths.src.scss)
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError),)
      // .pipe(autoprefixer())
      .pipe(gulp.dest(paths.src.root + '/css'))
      .pipe(browserSync.stream());
});

// Minify + Combine CSS
gulp.task('cssTask', ()=> {
   return gulp
      .src(paths.src.css)
      .pipe(cleanCSS({compatibility: 'ie8',}))
      .pipe(postcss([cssnano(),autoprefixer()]))
      .pipe(gulp.dest(paths.dist.css));
});

// Minify + Combine JS
gulp.task('jsTask', ()=>{
   return gulp
      .src(paths.src.js)
      .pipe(babel({presets: ['@babel/preset-env'],}))
      .pipe(terser())
      .pipe(gulp.dest(paths.dist.js))
      .pipe(browserSync.stream());
})

// copy vendors to dist
gulp.task('vendors', () => {
	return gulp.src(paths.src.vendors).pipe(gulp.dest(paths.dist.vendors));
});


// Star project
gulp.task('start', gulp.series('delTask', 'htmlTask', 'imgTask', 'sassTask', 'cssTask','jsTask'));

// Prepare all assets for production
// gulp.task('build', gulp.series('sass', 'css', 'js', 'img'));


// Verifica si hay cambios y llama a la funcion correspondientes
gulp.task('default', ()=>{
   browserSync.init({
      server: {
         baseDir: paths.root.www ,
         // baseDir: 'docs',
         // proxy: "localhost/portfolio/docs",
      },

   });
   
	gulp.watch(paths.src.html, gulp.series('htmlTask'));
	gulp.watch(paths.src.imgs, gulp.series('imgTask'));
   gulp.watch(paths.src.scss, gulp.series('sassTask','cssTask'));
	gulp.watch(paths.src.js, gulp.series('jsTask'));
	gulp.watch(paths.dist.html).on('change', browserSync.reload);
})