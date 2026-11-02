// ===== 1. MENÚ PARA CELULAR =====
const botonMenu = document.getElementById("botonMenu");
const menu = document.getElementById("menu");
const enlacesMenu = document.querySelectorAll(".enlace-menu");

botonMenu.addEventListener("click", function() {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", abierto);
});

enlacesMenu.forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        menu.classList.remove("abierto");
        botonMenu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
    });
});


// ===== 2. CAMBIO DE TEMA =====
const botonTema = document.getElementById("botonTema");

if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("oscuro");
    botonTema.textContent = "☀️";
}

botonTema.addEventListener("click", function() {
    document.body.classList.toggle("oscuro");
    const esOscuro = document.body.classList.contains("oscuro");
    botonTema.textContent = esOscuro ? "☀️" : "🌙";
    localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
});


// ===== 3. TEXTO QUE SE ESCRIBE SOLO EN EL INICIO =====
const textoRol = document.getElementById("textoRol");
const roles = [
    "estudiante de desarrollo web",
    "programador en formación",
    "buscando mi práctica profesional"
];
let numeroRol = 0;
let letra = roles[0].length;
let borrando = true;

function escribir() {
    const rol = roles[numeroRol];

    if (borrando) {
        letra = letra - 1;
    } else {
        letra = letra + 1;
    }
    textoRol.textContent = rol.substring(0, letra);

    let espera = borrando ? 40 : 80;

    if (!borrando && letra === rol.length) {
        borrando = true;
        espera = 1800;
    } else if (borrando && letra === 0) {
        borrando = false;
        numeroRol = (numeroRol + 1) % roles.length;
    }
    setTimeout(escribir, espera);
}
setTimeout(escribir, 1800);


// ===== 4. SCROLL: BARRA DE PROGRESO, SOMBRA, ENLACE ACTIVO Y BOTÓN SUBIR =====
const progreso = document.getElementById("progreso");
const encabezado = document.getElementById("encabezado");
const botonSubir = document.getElementById("subir");
const secciones = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", function() {
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    progreso.style.width = (window.scrollY / alturaTotal) * 100 + "%";

    encabezado.classList.toggle("con-sombra", window.scrollY > 20);
    botonSubir.classList.toggle("visible", window.scrollY > 500);

    let actual = "";
    secciones.forEach(function(seccion) {
        if (window.scrollY >= seccion.offsetTop - 140) {
            actual = seccion.id;
        }
    });

    enlacesMenu.forEach(function(enlace) {
        enlace.classList.toggle("activo", enlace.getAttribute("href") === "#" + actual);
    });
});

botonSubir.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ===== 5. ANIMACIÓN AL APARECER Y CONTADORES =====
const elementos = document.querySelectorAll(".revelar");

function contar(numero) {
    const meta = Number(numero.dataset.meta);
    let valor = 0;
    const intervalo = setInterval(function() {
        valor = valor + 1;
        numero.textContent = valor;
        if (valor >= meta) {
            clearInterval(intervalo);
        }
    }, 350);
}

const observador = new IntersectionObserver(function(entradas) {
    entradas.forEach(function(entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");

            // si es la zona de contadores, los hacemos subir
            entrada.target.querySelectorAll("[data-meta]").forEach(contar);

            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

elementos.forEach(function(elemento) {
    observador.observe(elemento);
});


// ===== 6. INFORMACIÓN DE LAS TECNOLOGÍAS =====
const botonesTecnologia = document.querySelectorAll(".tecnologia");
const infoTecnologia = document.getElementById("infoTecnologia");

botonesTecnologia.forEach(function(boton) {
    boton.addEventListener("click", function() {
        botonesTecnologia.forEach(function(otro) {
            otro.classList.remove("activo");
        });
        boton.classList.add("activo");
        infoTecnologia.textContent = boton.textContent + ": " + boton.dataset.info;
    });
});


// ===== 7. FILTROS DE PROYECTOS =====
const botonesFiltro = document.querySelectorAll(".filtro");
const proyectos = document.querySelectorAll(".proyecto");

botonesFiltro.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const filtro = boton.dataset.filtro;

        botonesFiltro.forEach(function(otro) {
            otro.classList.remove("activo");
        });
        boton.classList.add("activo");

        proyectos.forEach(function(proyecto) {
            const coincide = filtro === "todos" || proyecto.dataset.categoria.includes(filtro);
            proyecto.classList.toggle("oculto", !coincide);
        });
    });
});


// ===== 8. VENTANA EMERGENTE (MODAL) =====
const modal = document.getElementById("modal");
const modalCerrar = document.getElementById("modalCerrar");
const modalDemo = document.getElementById("modalDemo");

function abrirModal(proyecto) {
    document.getElementById("modalTitulo").textContent = proyecto.dataset.titulo;
    document.getElementById("modalDescripcion").textContent = proyecto.dataset.descripcion;
    document.getElementById("modalTecnologias").textContent = proyecto.dataset.tecnologias;
    document.getElementById("modalRepo").href = proyecto.dataset.repo;

    if (proyecto.dataset.demo) {
        modalDemo.href = proyecto.dataset.demo;
        modalDemo.style.display = "inline-block";
    } else {
        modalDemo.style.display = "none";
    }

    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");
    modalCerrar.focus();
}

function cerrarModal() {
    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".boton-detalle").forEach(function(boton) {
    boton.addEventListener("click", function() {
        abrirModal(boton.closest(".proyecto"));
    });
});

modalCerrar.addEventListener("click", cerrarModal);

modal.addEventListener("click", function(evento) {
    if (evento.target === modal) {
        cerrarModal();
    }
});

document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        cerrarModal();
    }
});


// ===== 9. FORMULARIO DE CONTACTO =====
const formulario = document.getElementById("formulario");
const error = document.getElementById("error");

// IMPORTANTE: cambia este correo por el tuyo
const miCorreo = "TU_CORREO@gmail.com";

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || mensaje === "") {
        error.textContent = "Escribe tu nombre y tu mensaje antes de enviar.";
        return;
    }

    error.textContent = "";

    const asunto = encodeURIComponent("Contacto desde tu portafolio - " + nombre);
    const cuerpo = encodeURIComponent(mensaje);
    window.location.href = "mailto:" + miCorreo + "?subject=" + asunto + "&body=" + cuerpo;

    formulario.reset();
});