document.addEventListener('DOMContentLoaded', function(){
  crearGaleria();
});
 function crearGaleria(){
   const galeria = document.querySelector('.galeria-imagenes');
   for(let i= 1; i<= 12; i++){
      const imagen = document.createElement('IMG');// crea un elemento del tipo especificado
      imagen.src =  `build/img/thumb/${i}.webp`;
      imagen.dataset.imagenId = i ; // NOTE: dataset.imagenId atributos perzonalizados de html5 para beneficio propio
      // le agrega a l etiqueta imagen un pseudo atributo id
      // añadir funcion mostrarImagen
      imagen.onclick = mostrarImagen;


      const lista = document.createElement('LI');

      lista.appendChild(imagen);
      galeria.appendChild(lista);

 }
}
function mostrarImagen(e){

  const id = parseInt(e.target.dataset.imagenId)
  const imagen = document.createElement('IMG');
  //generar imagen
  imagen.src =  `build/img/grande/${id}.webp`;

  const overlay = document.createElement('DIV');
  overlay.appendChild(imagen);
  overlay.classList.add('overlay');
  overlay.onclick= function(){
    overlay.remove();
  }
  //boton para cerrar la imagenes
  const cerrarImagen = document.createElement('P');
  cerrarImagen.textContent = 'X';
  cerrarImagen.classList.add('btn-cerrar');
  cerrarImagen.onclick= function(){
    overlay.remove();
  }
  overlay.appendChild(cerrarImagen);
  //mostrar en html
  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('fijar-body');

}
