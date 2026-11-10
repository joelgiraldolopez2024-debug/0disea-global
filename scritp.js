// --- JAVASCRIPT DE FUNCIONALIDADES Y BLOQUEO CON LÍMITES ESTRICTOS ---

let tipoViajeActual = 'Vuelo + Hotel';
let paqueteSeleccionado = '';
let precioSeleccionado = '';
let tamanoActual = 1;

document.addEventListener('DOMContentLoaded', () => {
    const camposSoloLetras = ['reg-nombre', 'cliente-nombre'];
    const camposSoloNumeros = ['reg-tel', 'cliente-tel'];

    // 1. BLOQUEO PARA NOMBRES (Solo letras, máximo 40 caracteres)
    camposSoloLetras.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.setAttribute('maxlength', '40'); // Límite para nombres

            el.addEventListener('keydown', (e) => {
                const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', ' '];
                if (teclasPermitidas.includes(e.key)) return;
                
                if (/[0-9]/.test(e.key)) {
                    e.preventDefault();
                }
            });

            el.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            });
        }
    });

    // 2. BLOQUEO Y LÍMITE ESTRICTO PARA TELÉFONOS (Exactamente máximo 10 dígitos)
    camposSoloNumeros.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.setAttribute('maxlength', '10'); // Límite físico en HTML para el teléfono

            el.addEventListener('keydown', (e) => {
                const teclasPermitidas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                if (teclasPermitidas.includes(e.key)) return;

                if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                }
            });

            el.addEventListener('input', (e) => {
                let valor = e.target.value.replace(/[^0-9]/g, '');
                if (valor.length > 10) {
                    valor = valor.slice(0, 10); // Corta cualquier intento de pasar de 10
                }
                e.target.value = valor;
            });
        }
    });
});

// ⚡ FUNCIÓN DE INGRESO (Muro de inicio)
function terminarEIngresar() {
    const nombreInput = document.getElementById('reg-nombre');
    const telInput = document.getElementById('reg-tel');

    if (!nombreInput || !telInput) return;

    const nombre = nombreInput.value.trim();
    const tel = telInput.value.trim();

    if (!nombre || !tel) {
        alert('Por favor completa tu nombre y número de teléfono.');
        return;
    }

    if (nombre.length < 3) {
        alert('Por favor ingresa un nombre válido (mínimo 3 letras).');
        return;
    }

    if (tel.length !== 10) {
        alert('El número de celular debe tener exactamente 10 dígitos.');
        return;
    }

    // Ocultar muro de acceso y revelar la web
    const muro = document.getElementById('muro-registro');
    const contenido = document.getElementById('contenido-web');

    if (muro) muro.style.display = 'none';
    if (contenido) contenido.style.display = 'block';

    const mensaje = encodeURIComponent(`¡Nuevo registro en Odisea Global!\n\n👤 *Nombre:* ${nombre}\n📱 *Teléfono:* ${tel}\n\nHa completado el formulario de acceso.`);
    window.open(`https://wa.me/573113924038?text=${mensaje}`, '_blank');
}

// 📌 CAMBIO DE PESTAÑAS EN EL BUSCADOR
function cambiarTab(btn, tipo) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    if (tipo === 'vuelohotel') tipoViajeActual = 'Vuelo + Hotel';
    if (tipo === 'hotel') tipoViajeActual = 'Solo Hotel';
    if (tipo === 'tour') tipoViajeActual = 'Tour & Experiencia';
}

// 🔍 BUSCADOR DE VIAJES
function buscarViaje() {
    const origenEl = document.getElementById('origen-select');
    const destinoEl = document.getElementById('destino-select');
    const fechaEl = document.getElementById('fecha-salida');
    const pasajerosEl = document.getElementById('pasajeros-select');

    if (!origenEl || !destinoEl || !fechaEl || !pasajerosEl) return;

    paqueteSeleccionado = `Cotización (${tipoViajeActual}): ${origenEl.value} ➔ ${destinoEl.value}`;
    precioSeleccionado = `Fecha: ${fechaEl.value} | ${pasajerosEl.value}`;
    
    abrirModal(paqueteSeleccionado, precioSeleccionado);
}

// 💬 MODAL DE COTIZACIÓN
function abrirModal(titulo, precio) {
    paqueteSeleccionado = titulo;
    precioSeleccionado = precio;
    
    const tituloEl = document.getElementById('modal-titulo');
    const precioEl = document.getElementById('modal-precio');
    const modalEl = document.getElementById('modal-reserva');

    if (tituloEl) tituloEl.innerText = titulo;
    if (precioEl) precioEl.innerText = precio;
    if (modalEl) modalEl.classList.add('active');
}

function cerrarModal() {
    const modalEl = document.getElementById('modal-reserva');
    if (modalEl) modalEl.classList.remove('active');
}

function enviarWhatsAppModal() {
    const nombreInput = document.getElementById('cliente-nombre');
    const telInput = document.getElementById('cliente-tel');

    if (!nombreInput || !telInput) return;

    const nombre = nombreInput.value.trim();
    const tel = telInput.value.trim();

    if (!nombre || !tel) {
        alert('Por favor completa tu nombre y número de teléfono.');
        return;
    }

    if (tel.length !== 10) {
        alert('El número de celular debe tener exactamente 10 dígitos.');
        return;
    }

    const mensaje = encodeURIComponent(`¡Hola Odisea Global! Deseo cotizar el paquete:\n📌 *${paqueteSeleccionado}*\n💰 *${precioSeleccionado}*\n\n👤 *Nombre:* ${nombre}\n📱 *Teléfono:* ${tel}`);
    window.open(`https://wa.me/573113924038?text=${mensaje}`, '_blank');
    cerrarModal();
}

// ♿ ACCESIBILIDAD
function toggleMenuAccesibilidad() {
    const menu = document.getElementById('accessibility-menu');
    if (menu) menu.classList.toggle('active');
}

function cambiarTamanoTexto(factor) {
    tamanoActual *= factor;
    if (tamanoActual < 0.8) tamanoActual = 0.8;
    if (tamanoActual > 1.4) tamanoActual = 1.4;
    document.body.style.zoom = tamanoActual;
}

function toggleAltoContraste() {
    document.body.classList.toggle('alto-contraste');
}

function resetAccesibilidad() {
    tamanoActual = 1;
    document.body.style.zoom = "100%";
    document.body.classList.remove('alto-contraste');
}