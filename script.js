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
  let fechaNueva;

  if (inputFecha && inputFecha.value) {
    fechaNueva = inputFecha.value; // Usar el valor del input si existe y tiene un valor

    if (mesesMantenimiento !== undefined) {
      const fechaOriginal = new Date(inputFecha.value);
      const fechaVencimiento = new Date(fechaOriginal.setMonth(fechaOriginal.getMonth() + mesesMantenimiento));
      fechaNueva = fechaVencimiento.toISOString().split('T')[0];
      inputFecha.value = fechaNueva;
    }
  
    localStorage.setItem('fecha' + maquina, fechaNueva);
    actualizarDiasRestantes(maquina, fechaNueva);  // Llamar siempre con la fecha adecuada
  }

  guardarCaracteristicas(maquina);
  alert('Usuario guardado para la Máquina ' + maquina);
}

function guardarCaracteristicas(maquina) {
  const usuarioInput = document.getElementById('usuario' + maquina);
  const usuario = usuarioInput ? usuarioInput.value : 'Usuario por defecto';  // Usar valor por defecto si no hay input

  localStorage.setItem('usuario' + maquina, usuario);
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
      mostrarNotificacion(`Matenimineto ${maquina} Expiro Hace ${Math.abs(dias)} días.`);
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
// Login and key management code
const masterKey = localStorage.getItem('masterKey') || ''; // &3wE7R_P

function login() {
  const keyInput = document.getElementById('loginKey').value;
  if (keyInput === masterKey) {
    alert('Acceso Concedido');
    document.querySelector('.main-content').style.display = 'block';
    document.querySelector('.login-container').style.display = 'none';
  } else {
    alert('Clave Incorrecta');
  }
}

console.log("By: Rene Oke");
