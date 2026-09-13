// ===== Datos de las obras para la galería =====
// Array de objetos: cada obra tiene nombre, año e imagen
const obras = [
  { nombre: "Big Science", anio: 1982, imagen: "img/big_esence.jpg" },
  { nombre: "Mister Heartbreak", anio: 1984, imagen: "img/mister.jpg" },
  { nombre: "United States Live", anio: 1984, imagen: "img/united.png" },
  { nombre: "Home of the Brave", anio: 1986, imagen: "img/anderson.jpg" },
  { nombre: "Strange Angels", anio: 1989, imagen: "img/anderson_3.jpg" },
  { nombre: "Bright Red", anio: 1994, imagen: "img/red.jpg" }
];

// Referencias a los elementos del DOM que vamos a usar
const contenedorGaleria = document.getElementById("galeria");
const btnCambiarDiseno = document.getElementById("btn-cambiar-diseno");

// ===== Genera el HTML de la galería a partir del array de obras =====
function mostrarGaleria() {
  let html = "";

  for (let i = 0; i < obras.length; i++) {
    const obra = obras[i];
    html += `
      <div class="obra">
        <img src="${obra.imagen}" alt="Tapa del álbum ${obra.nombre}">
        <div class="info-obra">
          <h4>${obra.nombre}</h4>
          <p class="anio">${obra.anio}</p>
        </div>
      </div>
    `;
  }

  contenedorGaleria.innerHTML = html;
}

// ===== Cambia el diseño de la galería (compacto / normal) =====
function cambiarDiseno() {
  contenedorGaleria.classList.toggle("galeria-compacta");
}

// ===== Inicialización =====
mostrarGaleria();
btnCambiarDiseno.addEventListener("click", cambiarDiseno);
