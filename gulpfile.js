const { series, src, dest, watch, parallel} = require('gulp');
//parallel ejecuta las funciones simultaneamente
//series las ejecuta en orden en el que son llamadas
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

const paths = {
   imagenes: 'src/img/**/*',
   scss: 'src/scss/**/*.scss',
   js: 'src/js/**/*.js'// todos los archivos con esta estension seran compilados
}

function css(){

  return src(paths.scss)
          .pipe( sass({
            outputStyle: 'expanded' // muestra el archivo css en forma de lista y espacios
          }) )
          .pipe( dest('./build/css'))
}

// function minificar
function minificarCss(){
  return src(paths.scss)
          .pipe( sass({
            outputStyle: 'compressed' // comprime el archivo quitando todos los espacios
          }) )
          .pipe( dest('./build/css'))
}
// javascript function

function javascript() {
    return src(paths.js)
        .pipe( concat('bundle.js') )
        .pipe( dest('./build/js') )
}
//aligerar tamaño imagenes
function imagenes(){
  return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest('./build/img' ));
        //.pipe( notify({message: 'imagen Minificada'}));
}
function versionWebp(){
  return src(paths.imagenes)
  .pipe(webp())
  .pipe( dest('./build/img'))
  .pipe( notify({message: 'Version webp creada'}));

}
function watchArchivos(){
  watch(paths.scss, css); //compila los archivos con esa extension y que esten dentro de esa carpeta
   // * = la carpeta actuañ
   //** = todos los archivos con esa extension
   watch(paths.js, javascript);
}
exports.css = css;
exports.javascript = javascript;
exports.minificar = minificarCss;
exports.imagenes = imagenes;
exports.watchArc = watchArchivos;
exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);
