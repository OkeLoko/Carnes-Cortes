window.onload = function() {
  cargarFechas();
  cargarCaracteristicas();
  mostrarFechaActual();
  
};

function cargarFechas() {
  for (let i = 1; i <= 50; i++) {
    const fecha = localStorage.getItem('fecha' + i);
    if (fecha) {
      document.getElementById('fecha' + i).value = fecha;
      actualizarDiasRestantes(i, fecha);
    }
  }
}

function cargarCaracteristicas() {
  for (let i = 1; i <= 50; i++) {
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

  // Llamar a mostrarNotificacion si quedan 7 días o menos
  if (dias <= 7){
    if (dias <=7 && dias > 0){
      mostrarNotificacion(`Matenimineto ${maquina} Expira en ${dias} días.`);  
    }else if (dias < 0){
      mostrarNotificacion(`Matenimineto ${maquina} Expiro Hace ${(dias)*(-1)} días.`);
    }else if (dias == 0){
      mostrarNotificacion(`Matenimineto ${maquina} Expira Hoy.`);
    }
  }
}

function mostrarNotificacion(mensaje) {
  const contenedorNotificaciones = document.getElementById('notificaciones');
  const notificacion = document.createElement('div');
  notificacion.className = 'alerta';
  notificacion.textContent = mensaje;
  contenedorNotificaciones.appendChild(notificacion);
}

function mostrarFechaActual() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('currentDate').textContent = `Fecha: ${formattedDate}`;
}

console.log("By: Rene Oke");