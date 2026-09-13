// ===== Estado del ejercicio (variables que van cambiando mientras se usa) =====
let cantidadObras = 0;
const listaObras = []; // array de objetos: { nombre, duracion, peso }
let tiempoTransferencia = 0; // ms por MB
let costoMB = 0; // costo mensual de almacenamiento por MB
let parametrosGuardados = false;

// ===== Referencias al DOM =====
const formCantidad = document.getElementById("form-cantidad");
const inputCantidad = document.getElementById("cantidad-obras");

const formObra = document.getElementById("form-obra");
const inputNombre = document.getElementById("nombre-obra");
const inputDuracion = document.getElementById("duracion-obra");
const inputPeso = document.getElementById("peso-obra");

const contadorObras = document.getElementById("contador-obras");

const formParametros = document.getElementById("form-parametros");
const inputTiempoTransferencia = document.getElementById("tiempo-transferencia");
const inputCostoMB = document.getElementById("costo-mb");

const btnCalcular = document.getElementById("btn-calcular");
const divResultados = document.getElementById("resultados");
const btnReiniciar = document.getElementById("btn-reiniciar");

// ===== Funciones auxiliares para habilitar/deshabilitar formularios completos =====
function deshabilitarFormulario(form) {
  const campos = form.querySelectorAll("input, button");
  for (let i = 0; i < campos.length; i++) {
    campos[i].disabled = true;
  }
}

function habilitarFormulario(form) {
  const campos = form.querySelectorAll("input, button");
  for (let i = 0; i < campos.length; i++) {
    campos[i].disabled = false;
  }
}

// Al arrancar, los formularios de carga están deshabilitados
deshabilitarFormulario(formObra);
deshabilitarFormulario(formParametros);

formCantidad.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la página se recargue al enviar el form

  const valor = parseInt(inputCantidad.value);

  // Validación: tiene que ser un número entero mayor a 0
  if (isNaN(valor) || valor < 1) {
    alert("Ingresá una cantidad válida de obras (mínimo 1).");
    return;
  }

  cantidadObras = valor;
  actualizarContador();

  deshabilitarFormulario(formCantidad); // ya no se puede cambiar la cantidad
  habilitarFormulario(formObra); // ahora sí se puede empezar a cargar obras
  habilitarFormulario(formParametros); // los parámetros se pueden cargar en paralelo
});

function actualizarContador() {
  if (cantidadObras === 0) {
    contadorObras.textContent = "";
  } else {
    contadorObras.textContent = "Obras cargadas: " + listaObras.length + " de " + cantidadObras;
  }
}

formObra.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = inputNombre.value.trim();
  const duracion = parseFloat(inputDuracion.value);
  const peso = parseFloat(inputPeso.value);

  // Validación de los tres campos
  if (nombre === "" || isNaN(duracion) || duracion <= 0 || isNaN(peso) || peso <= 0) {
    alert("Completá todos los campos de la obra con valores válidos.");
    return;
  }

  listaObras.push({ nombre: nombre, duracion: duracion, peso: peso });

  formObra.reset(); // limpia los campos para la próxima carga
  actualizarContador();

  // Si ya se completó la cantidad pedida, se deshabilita el formulario
  if (listaObras.length >= cantidadObras) {
    deshabilitarFormulario(formObra);
  }

  intentarHabilitarCalculo();
});

formParametros.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const tiempo = parseFloat(inputTiempoTransferencia.value);
  const costo = parseFloat(inputCostoMB.value);

  if (isNaN(tiempo) || tiempo < 0 || isNaN(costo) || costo < 0) {
    alert("Ingresá valores válidos para los parámetros (no negativos).");
    return;
  }

  tiempoTransferencia = tiempo;
  costoMB = costo;
  parametrosGuardados = true;

  deshabilitarFormulario(formParametros);
  intentarHabilitarCalculo();
});

// Habilita "Calcular resultados" solo cuando están TODOS los datos necesarios
function intentarHabilitarCalculo() {
  if (listaObras.length === cantidadObras && cantidadObras > 0 && parametrosGuardados) {
    btnCalcular.disabled = false;
  }
}

btnCalcular.addEventListener("click", function () {
  let duracionTotal = 0;
  let pesoTotal = 0;
  let obraMasLarga = listaObras[0];

  for (let i = 0; i < listaObras.length; i++) {
    const obra = listaObras[i];
    duracionTotal += obra.duracion;
    pesoTotal += obra.peso;

    if (obra.duracion > obraMasLarga.duracion) {
      obraMasLarga = obra;
    }
  }

  const duracionPromedio = duracionTotal / listaObras.length;
  const tiempoDescargaMasLarga = obraMasLarga.peso * tiempoTransferencia; // en ms
  const presupuestoAnual = pesoTotal * costoMB * 12; // 12 meses

  mostrarResultados(duracionTotal, duracionPromedio, obraMasLarga, tiempoDescargaMasLarga, presupuestoAnual);

  btnCalcular.disabled = true; // evita recalcular sin reiniciar
});

function mostrarResultados(duracionTotal, duracionPromedio, obraMasLarga, tiempoDescarga, presupuesto) {
  divResultados.innerHTML = `
    <h3>Resultados</h3>
    <p>Duración total: ${duracionTotal.toFixed(2)} minutos</p>
    <p>Duración promedio: ${duracionPromedio.toFixed(2)} minutos</p>
    <p>Obra de mayor duración: ${obraMasLarga.nombre} (${obraMasLarga.duracion} min)</p>
    <p>Tiempo de transferencia de esa obra: ${tiempoDescarga.toFixed(2)} ms</p>
    <p>Presupuesto anual estimado: $${presupuesto.toFixed(2)}</p>
  `;
}

btnReiniciar.addEventListener("click", function () {
  cantidadObras = 0;
  listaObras.length = 0; // vacía el array sin crear uno nuevo
  tiempoTransferencia = 0;
  costoMB = 0;
  parametrosGuardados = false;

  formCantidad.reset();
  formObra.reset();
  formParametros.reset();

  habilitarFormulario(formCantidad);
  deshabilitarFormulario(formObra);
  deshabilitarFormulario(formParametros);

  btnCalcular.disabled = true;
  divResultados.innerHTML = "";
  contadorObras.textContent = "";
});

