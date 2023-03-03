const miBoton = document.getElementById('miBoton');
const miContenedor = document.getElementById('miContenedor');

miBoton.addEventListener('click', function() {
    miContenedor.classList.toggle('oculto');
  });