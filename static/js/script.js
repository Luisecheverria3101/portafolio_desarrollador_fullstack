// ===== 1. Menú para móvil =====
const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function() {
    const abierto = menu.classList.toggle("abierto");
    btnMenu.setAttribute("aria-expanded", abierto);
});

// al elegir una sección, se cierra el menú
menu.querySelectorAll("a").forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        menu.classList.remove("abierto");
        btnMenu.setAttribute("aria-expanded", false);
    });
});

// ===== 2. Cambio de tema (claro / oscuro) =====
const btnTema = document.getElementById("btnTema");

function aplicarTema(tema) {
    document.body.classList.toggle("claro", tema === "claro");
    btnTema.textContent = tema === "oscuro" ? "☀️" : "🌙";
}

// se recuerda la elección usando localStorage
let temaGuardado = null;
try { temaGuardado = localStorage.getItem("tema"); } catch (e) {}
aplicarTema(temaGuardado || "oscuro");

btnTema.addEventListener("click", function() {
    const nuevoTema = document.body.classList.contains("claro") ? "oscuro" : "claro";
    aplicarTema(nuevoTema);
    try { localStorage.setItem("tema", nuevoTema); } catch (e) {}
});

// ===== 3. Saludo que se escribe solo =====
const saludo = document.getElementById("saludo");
const textoSaludo = "Hola, soy Luis";
let letra = 0;
saludo.textContent = "";

function escribir() {
    if (letra < textoSaludo.length) {
        saludo.textContent += textoSaludo[letra];
        letra++;
        setTimeout(escribir, 90);
    }
}
escribir();

// ===== 4. Filtros de proyectos =====
const botonesFiltro = document.querySelectorAll(".filtro");
const tarjetas = document.querySelectorAll(".tarjeta");

botonesFiltro.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const filtro = boton.dataset.filtro;

        botonesFiltro.forEach(function(b) { b.classList.remove("activo"); });
        boton.classList.add("activo");

        tarjetas.forEach(function(tarjeta) {
            const coincide = filtro === "todos" || tarjeta.dataset.categoria === filtro;
            tarjeta.classList.toggle("oculta", !coincide);
        });
    });
});

// ===== 5. Ventana emergente con el detalle del proyecto =====
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modalTitulo");
const modalDetalle = document.getElementById("modalDetalle");
const modalTecnologias = document.getElementById("modalTecnologias");
const modalDemo = document.getElementById("modalDemo");
const modalRepo = document.getElementById("modalRepo");

document.querySelectorAll(".boton-detalle").forEach(function(boton) {
    boton.addEventListener("click", function() {
        const datos = boton.closest(".tarjeta").dataset;

        modalTitulo.textContent = datos.titulo;
        modalDetalle.textContent = datos.detalle;
        modalTecnologias.textContent = datos.tecnologias;
        modalRepo.href = datos.repo;

        // si el proyecto no tiene enlace en línea, se oculta ese botón
        if (datos.demo) {
            modalDemo.href = datos.demo;
            modalDemo.hidden = false;
        } else {
            modalDemo.hidden = true;
        }

        modal.hidden = false;
    });
});

function cerrarModal() { modal.hidden = true; }

document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
modal.addEventListener("click", function(evento) {
    if (evento.target === modal) cerrarModal(); // clic en el fondo
});
document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") cerrarModal();
});

// ===== 6. Barras de habilidades y contador al hacer scroll =====
const rellenos = document.querySelectorAll(".relleno");
const contador = document.getElementById("contador");

function animarContador() {
    const meta = Number(contador.dataset.meta);
    let numero = 0;
    const intervalo = setInterval(function() {
        numero++;
        contador.textContent = numero;
        if (numero >= meta) clearInterval(intervalo);
    }, 300);
}

const observador = new IntersectionObserver(function(entradas) {
    entradas.forEach(function(entrada) {
        if (!entrada.isIntersecting) return;

        if (entrada.target.id === "habilidades") {
            rellenos.forEach(function(relleno) {
                relleno.style.width = relleno.dataset.nivel + "%";
            });
        }
        if (entrada.target.id === "sobre-mi") {
            animarContador();
        }
        observador.unobserve(entrada.target); // solo la primera vez
    });
}, { threshold: 0.3 });

observador.observe(document.getElementById("habilidades"));
observador.observe(document.getElementById("sobre-mi"));

// ===== 7. Formulario de contacto con validación =====
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    let todoBien = true;

    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorMensaje").textContent = "";
    document.getElementById("exito").textContent = "";

    if (nombre.length < 2) {
        document.getElementById("errorNombre").textContent = "Escribe tu nombre.";
        todoBien = false;
    }
    if (!correo.includes("@") || !correo.includes(".")) {
        document.getElementById("errorCorreo").textContent = "Escribe un correo válido.";
        todoBien = false;
    }
    if (mensaje.length < 10) {
        document.getElementById("errorMensaje").textContent = "El mensaje debe tener al menos 10 letras.";
        todoBien = false;
    }

    if (todoBien) {
        // abre el programa de correo con el mensaje listo para enviar
        const asunto = encodeURIComponent("Contacto desde tu portafolio: " + nombre);
        const cuerpo = encodeURIComponent(mensaje + "\n\nMi correo: " + correo);
        window.location.href = "mailto:tu-correo@gmail.com?subject=" + asunto + "&body=" + cuerpo;
        document.getElementById("exito").textContent = "Se abrió tu programa de correo para enviar el mensaje.";
        formulario.reset();
    }
});

// ===== 8. Año en el pie de página =====
document.getElementById("anio").textContent = new Date().getFullYear();