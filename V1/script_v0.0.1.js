window.onload = function() {
    cargarFechas();
    mostrarFechaActual();
  };
  
  function cargarFechas() {
    for (let i = 1; i <= 4; i++) {
      const fecha = localStorage.getItem('fecha' + i);
      if (fecha) {
        document.getElementById('fecha' + i).value = fecha;
        actualizarDiasRestantes(i, fecha);
      }
    }
  }
  
  function guardarFecha(depto) {
    const inputFecha = document.getElementById('fecha' + depto);
    const fechaOriginal = new Date(inputFecha.value);
    const fechaVencimiento = new Date(fechaOriginal.setMonth(fechaOriginal.getMonth() + 1));
    inputFecha.value = fechaVencimiento.toISOString().split('T')[0];
    localStorage.setItem('fecha' + depto, inputFecha.value);
    actualizarDiasRestantes(depto, inputFecha.value);
    alert('Fecha guardada y actualizada al próximo mes para el Departamento ' + depto);
  }
  
  function actualizarDiasRestantes(depto, fecha) {
    const fechaVencimiento = new Date(fecha);
    const hoy = new Date();
    const diferencia = fechaVencimiento - hoy;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    document.getElementById('restantes' + depto).textContent = `Días restantes: ${dias}`;
  }
  
  function mostrarFechaActual() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('currentDate').textContent = `Fecha actual: ${formattedDate}`;
  }
  