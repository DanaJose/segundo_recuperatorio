// ===== Array con los datos curiosos (texto ya provisto en texto.txt) =====
const datosCuriosos = [
  "Laurie Anderson fue una de las primeras artistas en combinar performance, música experimental y tecnología en la escena del arte contemporáneo.",
  "Su tema O Superman se convirtió en un éxito inesperado en 1981 y llegó al segundo puesto en los rankings del Reino Unido.",
  "Diseñó su propio violín eléctrico que le permitía tocar sonidos digitales y activar efectos con sensores.",
  "Ha colaborado con artistas como Lou Reed, con quien estuvo casada hasta su fallecimiento en 2013.",
  "En 2002 fue nombrada la primera artista residente de la NASA, desarrollando obras inspiradas en la exploración espacial.",
  "Su instalación de realidad virtual Chalkroom recibió el premio a mejor experiencia inmersiva en el Festival de Cine de Venecia en 2017.",
  "Utiliza su propia voz alterada digitalmente como herramienta narrativa y estética en muchas de sus obras.",
  "Ha creado instalaciones multimedia que combinan texto, imagen y sonido en entornos sensoriales de gran escala.",
  "Su obra cruza permanentemente los límites entre arte, ciencia, política y poesía.",
  "Sigue siendo una figura activa e influyente en el arte digital y ha experimentado con inteligencia artificial en proyectos recientes."
];

// Referencias al DOM
const parrafoDato = document.getElementById("dato-curioso");
const btnDato = document.getElementById("btn-dato");

// Guardamos el índice mostrado para no repetir el mismo dato dos veces seguidas
let ultimoIndice = -1;

// ===== Elige y muestra un dato curioso al azar =====
function mostrarDatoAlAzar() {
  let indice = Math.floor(Math.random() * datosCuriosos.length);

  // Si el número elegido es el mismo que la vez anterior, volvemos a elegir
  while (indice === ultimoIndice) {
    indice = Math.floor(Math.random() * datosCuriosos.length);
  }

  ultimoIndice = indice;
  parrafoDato.textContent = datosCuriosos[indice];
}

// ===== Evento del botón =====
btnDato.addEventListener("click", mostrarDatoAlAzar);

mostrarDatoAlAzar(); // muestra un dato apenas carga la página