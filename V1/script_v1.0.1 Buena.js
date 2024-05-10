window.onload = function() {
  cargarFechas();
  cargarCaracteristicas();
  mostrarFechaActual();
};

function cargarFechas() {
  for (let i = 1; i <= 150; i++) {
    const fecha = localStorage.getItem('fecha' + i);
    if (fecha) {
      document.getElementById('fecha' + i).value = fecha;
      actualizarDiasRestantes(i, fecha);
    }
  }
}

function cargarCaracteristicas() {
  for (let i = 1; i <= 150; i++) {
    ['usuario'].forEach(attr => {
      const value = localStorage.getItem(attr + i);
      if (value) {
        document.getElementById(attr + i).value = value;
      }
    });
  }
}

function guardarFecha(maquina, mesesMantenimiento) {
  const inputFecha = document.getElementById('fecha' + maquina);
  const fechaOriginal = new Date(inputFecha.value);
  const fechaVencimiento = new Date(fechaOriginal.setMonth(fechaOriginal.getMonth() + mesesMantenimiento));
  inputFecha.value = fechaVencimiento.toISOString().split('T')[0];
  localStorage.setItem('fecha' + maquina, inputFecha.value);
  actualizarDiasRestantes(maquina, inputFecha.value);
  guardarCaracteristicas(maquina);
  alert('Fecha y características guardadas para la Máquina ' + maquina);
}

function guardarCaracteristicas(maquina) {
  ['usuario'].forEach(attr => {
    const input = document.getElementById(attr + maquina);
    localStorage.setItem(attr + maquina, input.value);
  });
}

function actualizarDiasRestantes(maquina, fecha) {
  const fechaVencimiento = new Date(fecha);
  const hoy = new Date();
  const diferencia = fechaVencimiento - hoy;
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  document.getElementById('restantes' + maquina).textContent = `Días Restantes: ${dias}`;
}

function mostrarFechaActual() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('currentDate').textContent = `Fecha: ${formattedDate}`;
}
