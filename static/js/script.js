// ==========================================
// LE.dev - PORTAFOLIO PERSONAL
// JavaScript principal
// ==========================================


// ==========================================
// 1. MENÚ DE NAVEGACIÓN
// ==========================================

const botonMenu = document.getElementById("botonMenu");
const menu = document.getElementById("menu");
const enlacesMenu = document.querySelectorAll(".enlace-menu");

function cerrarMenu() {
    if (menu) {
        menu.classList.remove("abierto");
    }

    if (botonMenu) {
        botonMenu.setAttribute("aria-expanded", "false");
        botonMenu.setAttribute("aria-label", "Abrir menú");
    }
}

if (botonMenu && menu) {
    botonMenu.addEventListener("click", function() {
        menu.classList.toggle("abierto");

        const abierto = menu.classList.contains("abierto");

        botonMenu.setAttribute("aria-expanded", abierto);
        botonMenu.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú" : "Abrir menú"
        );
    });
}

enlacesMenu.forEach(function(enlace) {
    enlace.addEventListener("click", cerrarMenu);
});

document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        cerrarMenu();
    }
});


// ==========================================
// 2. CAMBIO DE TEMA
// ==========================================

const botonTema = document.getElementById("botonTema");

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
    document.body.classList.add("oscuro");
}

function actualizarIconoTema() {
    if (!botonTema) return;

    const temaOscuro = document.body.classList.contains("oscuro");

    botonTema.textContent = temaOscuro ? "☀️" : "🌙";

    botonTema.setAttribute(
        "aria-label",
        temaOscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
}

actualizarIconoTema();

if (botonTema) {
    botonTema.addEventListener("click", function() {
        document.body.classList.toggle("oscuro");

        const temaOscuro = document.body.classList.contains("oscuro");

        localStorage.setItem(
            "tema",
            temaOscuro ? "oscuro" : "claro"
        );

        actualizarIconoTema();
    });
}


// ==========================================
// 3. TEXTO ANIMADO DE INICIO
// ==========================================

const textoRol = document.getElementById("textoRol");

if (textoRol) {
    const roles = [
        "estudiante de desarrollo web",
        "desarrollador en formación",
        "estudiante de programación"
    ];

    let indiceRol = 0;
    let indiceLetra = 0;
    let borrando = false;

    function escribirTexto() {
        const textoActual = roles[indiceRol];

        if (!borrando) {
            textoRol.textContent = textoActual.substring(
                0,
                indiceLetra + 1
            );

            indiceLetra++;

            if (indiceLetra === textoActual.length) {
                borrando = true;
                setTimeout(escribirTexto, 1800);
                return;
            }
        } else {
            textoRol.textContent = textoActual.substring(
                0,
                indiceLetra - 1
            );

            indiceLetra--;

            if (indiceLetra === 0) {
                borrando = false;
                indiceRol = (indiceRol + 1) % roles.length;
            }
        }

        setTimeout(escribirTexto, borrando ? 45 : 85);
    }

    escribirTexto();
}


// ==========================================
// 4. SCROLL Y BARRA DE PROGRESO
// ==========================================

const encabezado = document.getElementById("encabezado");
const progreso = document.getElementById("progreso");
const botonSubir = document.getElementById("subir");

function actualizarScroll() {
    const scrollActual = window.scrollY;

    const alturaDocumento =
        document.documentElement.scrollHeight - window.innerHeight;

    if (progreso) {
        const porcentaje = alturaDocumento > 0 ?
            (scrollActual / alturaDocumento) * 100 :
            0;

        progreso.style.width = porcentaje + "%";
    }

    if (encabezado) {
        encabezado.classList.toggle(
            "desplazado",
            scrollActual > 30
        );
    }

    if (botonSubir) {
        botonSubir.classList.toggle(
            "visible",
            scrollActual > 400
        );
    }

    actualizarEnlaceActivo();
}

window.addEventListener("scroll", actualizarScroll);
actualizarScroll();


// ==========================================
// 5. BOTÓN VOLVER ARRIBA
// ==========================================

if (botonSubir) {
    botonSubir.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ==========================================
// 6. ENLACE ACTIVO DE NAVEGACIÓN
// ==========================================

function actualizarEnlaceActivo() {
    const secciones = document.querySelectorAll("main section[id]");

    let seccionActual = "";

    secciones.forEach(function(seccion) {
        const posicion = seccion.offsetTop - 180;

        if (window.scrollY >= posicion) {
            seccionActual = seccion.id;
        }
    });

    enlacesMenu.forEach(function(enlace) {
        enlace.classList.remove("activo");

        if (enlace.getAttribute("href") === "#" + seccionActual) {
            enlace.classList.add("activo");
        }
    });
}


// ==========================================
// 7. ANIMACIONES AL APARECER
// ==========================================

const elementosRevelar = document.querySelectorAll(".revelar");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        function(entradas, observador) {
            entradas.forEach(function(entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        }
    );

    elementosRevelar.forEach(function(elemento) {
        observador.observe(elemento);
    });
} else {
    elementosRevelar.forEach(function(elemento) {
        elemento.classList.add("visible");
    });
}


// ==========================================
// 8. CONTADORES ANIMADOS
// ==========================================

const contadores = document.querySelectorAll("[data-meta]");

function animarContador(contador) {
    const objetivo = Number(contador.dataset.meta);

    if (!Number.isFinite(objetivo) || objetivo < 0) return;

    let numero = 0;

    const incremento = Math.max(
        1,
        Math.ceil(objetivo / 40)
    );

    const intervalo = setInterval(function() {
        numero += incremento;

        if (numero >= objetivo) {
            numero = objetivo;
            clearInterval(intervalo);
        }

        contador.textContent = numero;
    }, 40);
}

if ("IntersectionObserver" in window) {
    const observadorContadores = new IntersectionObserver(
        function(entradas, observador) {
            entradas.forEach(function(entrada) {
                if (entrada.isIntersecting) {
                    animarContador(entrada.target);
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.5
        }
    );

    contadores.forEach(function(contador) {
        observadorContadores.observe(contador);
    });
} else {
    contadores.forEach(function(contador) {
        contador.textContent = contador.dataset.meta;
    });
}


// ==========================================
// 9. INFORMACIÓN DE TECNOLOGÍAS
// ==========================================

const tarjetasTecnologias = document.querySelectorAll(".tecnologia-card");
const tecnologiaInfo = document.getElementById("tecnologiaInfo");

tarjetasTecnologias.forEach(function(tarjeta) {
    tarjeta.addEventListener("click", function() {
        tarjetasTecnologias.forEach(function(elemento) {
            elemento.classList.remove("seleccionada");
        });

        tarjeta.classList.add("seleccionada");

        if (tecnologiaInfo) {
            tecnologiaInfo.textContent =
                tarjeta.dataset.info || "Información no disponible.";
        }
    });
});


// ==========================================
// 10. FILTROS DE PROYECTOS
// ==========================================

const botonesFiltro = document.querySelectorAll(".filtro");
const proyectos = document.querySelectorAll(".proyecto");

botonesFiltro.forEach(function(boton) {
    boton.addEventListener("click", function() {
        botonesFiltro.forEach(function(elemento) {
            elemento.classList.remove("activo");
        });

        boton.classList.add("activo");

        const categoria = boton.dataset.filtro;

        proyectos.forEach(function(proyecto) {
            const categoriaProyecto = proyecto.dataset.categoria;

            const coincide =
                categoria === "todos" ||
                categoria === categoriaProyecto;

            proyecto.style.display = coincide ? "" : "none";
        });

        if (carrusel) {
            carrusel.scrollTo({
                left: 0,
                behavior: "auto"
            });

            requestAnimationFrame(function() {
                actualizarIndicadores();
                actualizarCarrusel();
            });
        }
    });
});


// ==========================================
// 11. MODAL DE DETALLES DE PROYECTOS
// ==========================================

const modal = document.getElementById("modal");
const modalCerrar = document.getElementById("modalCerrar");

const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");
const modalTecnologias = document.getElementById("modalTecnologias");

const modalDemo = document.getElementById("modalDemo");
const modalRepo = document.getElementById("modalRepo");

let elementoAnterior = null;

function abrirModal(proyecto) {
    if (!modal ||
        !modalTitulo ||
        !modalDescripcion ||
        !modalTecnologias ||
        !modalDemo ||
        !modalRepo
    ) {
        console.error("No se encontraron los elementos del modal.");
        return;
    }

    elementoAnterior = document.activeElement;

    modalTitulo.textContent =
        proyecto.dataset.titulo || "Proyecto";

    modalDescripcion.textContent =
        proyecto.dataset.descripcion || "Sin descripción disponible.";

    modalTecnologias.textContent =
        proyecto.dataset.tecnologias || "No especificadas.";

    modalDemo.href = proyecto.dataset.demo || "#";
    modalRepo.href = proyecto.dataset.repo || "#";

    modal.classList.add("abierto");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    modalCerrar.focus();
}

document.querySelectorAll(".boton-detalle").forEach(function(boton) {
    boton.addEventListener("click", function() {
        const proyecto = boton.closest(".proyecto");

        if (proyecto) {
            abrirModal(proyecto);
        }
    });
});

function cerrarModal() {
    if (!modal) return;

    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (elementoAnterior) {
        elementoAnterior.focus();
        elementoAnterior = null;
    }
}

if (modalCerrar) {
    modalCerrar.addEventListener("click", cerrarModal);
}

if (modal) {
    modal.addEventListener("click", function(evento) {
        if (evento.target === modal) {
            cerrarModal();
        }
    });
}

document.addEventListener("keydown", function(evento) {
    if (
        evento.key === "Escape" &&
        modal &&
        modal.classList.contains("abierto")
    ) {
        cerrarModal();
    }
});

[modalDemo, modalRepo].forEach(function(enlace) {
    if (!enlace) return;

    enlace.addEventListener("click", function(evento) {
        if (!enlace.getAttribute("href") ||
            enlace.getAttribute("href") === "#"
        ) {
            evento.preventDefault();
            alert("Todavía falta configurar este enlace.");
        }
    });
});


// ==========================================
// 12. FORMULARIO DE CONTACTO
// ==========================================

const formulario = document.getElementById("formulario");
const campoNombre = document.getElementById("nombre");
const campoMensaje = document.getElementById("mensaje");
const mensajeError = document.getElementById("error");

if (formulario) {
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nombre = campoNombre ?
            campoNombre.value.trim() :
            "";

        const mensaje = campoMensaje ?
            campoMensaje.value.trim() :
            "";

        if (!nombre || !mensaje) {
            if (mensajeError) {
                mensajeError.textContent =
                    "Completa todos los campos antes de continuar.";
            }

            return;
        }

        // Correo configurado para recibir los mensajes
        const correoDestino = "luisecheverria3101@gmail.com";

        const asunto = encodeURIComponent(
            "Contacto desde el portafolio de Luis Echeverria"
        );

        const cuerpo = encodeURIComponent(
            "Nombre: " + nombre +
            "\n\nMensaje:\n" + mensaje
        );

        const enlaceCorreo =
            "mailto:" + correoDestino +
            "?subject=" + asunto +
            "&body=" + cuerpo;

        if (mensajeError) {
            mensajeError.textContent = "";
        }

        window.location.href = enlaceCorreo;
    });
}


// ==========================================
// 13. CARRUSEL DE PROYECTOS
// ==========================================

const carrusel = document.querySelector(".proyectos");
const anterior = document.getElementById("proyectoAnterior");
const siguiente = document.getElementById("proyectoSiguiente");
const indicadores = document.getElementById("carruselIndicadores");


// Obtener los proyectos visibles
function proyectosVisibles() {
    if (!carrusel) return [];

    return Array.from(carrusel.querySelectorAll(".proyecto"))
        .filter(function(proyecto) {
            return getComputedStyle(proyecto).display !== "none";
        });
}


// Calcular las posiciones de las páginas
function obtenerPaginasCarrusel() {
    if (!carrusel) return [];

    const maxScroll = Math.max(
        0,
        carrusel.scrollWidth - carrusel.clientWidth
    );

    if (maxScroll <= 2) {
        return [0];
    }

    const paginas = [];
    const anchoPagina = carrusel.clientWidth;

    let posicion = 0;

    while (posicion < maxScroll) {
        paginas.push(posicion);
        posicion += anchoPagina;
    }

    if (maxScroll - paginas[paginas.length - 1] > 2) {
        paginas.push(maxScroll);
    }

    return paginas;
}


// Crear los indicadores
function actualizarIndicadores() {
    if (!indicadores || !carrusel) return;

    indicadores.innerHTML = "";

    const paginas = obtenerPaginasCarrusel();

    paginas.forEach(function(posicion, indice) {
        const punto = document.createElement("button");

        punto.type = "button";
        punto.classList.add("indicador");

        punto.setAttribute(
            "aria-label",
            "Ir a la página " + (indice + 1)
        );

        punto.addEventListener("click", function() {
            carrusel.scrollTo({
                left: posicion,
                behavior: "smooth"
            });
        });

        indicadores.appendChild(punto);
    });

    actualizarIndicador();
}


// Resaltar el indicador actual
function actualizarIndicador() {
    if (!indicadores || !carrusel) return;

    const puntos = indicadores.querySelectorAll(".indicador");
    const paginas = obtenerPaginasCarrusel();

    if (!puntos.length || !paginas.length) return;

    let paginaActual = 0;
    let distanciaMinima = Infinity;

    paginas.forEach(function(posicion, indice) {
        const distancia = Math.abs(carrusel.scrollLeft - posicion);

        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            paginaActual = indice;
        }
    });

    puntos.forEach(function(punto, indice) {
        const activo = indice === paginaActual;

        punto.classList.toggle("activo", activo);

        if (activo) {
            punto.setAttribute("aria-current", "true");
        } else {
            punto.removeAttribute("aria-current");
        }
    });
}


// Actualizar flechas e indicadores
function actualizarCarrusel() {
    if (!carrusel) return;

    const maxScroll = Math.max(
        0,
        carrusel.scrollWidth - carrusel.clientWidth
    );

    const posicion = carrusel.scrollLeft;

    if (anterior) {
        anterior.style.display =
            posicion <= 2 ? "none" : "flex";
    }

    if (siguiente) {
        siguiente.style.display =
            maxScroll <= 2 || posicion >= maxScroll - 2 ?
            "none" :
            "flex";
    }

    actualizarIndicador();
}


// Desplazar el carrusel
function moverCarrusel(direccion) {
    if (!carrusel) return;

    const proyecto = proyectosVisibles()[0];

    if (!proyecto) return;

    const espacio = parseFloat(
        getComputedStyle(carrusel).columnGap
    ) || 0;

    const desplazamiento =
        proyecto.offsetWidth + espacio;

    carrusel.scrollBy({
        left: desplazamiento * direccion,
        behavior: "smooth"
    });
}


// Eventos del carrusel
if (carrusel) {
    if (anterior) {
        anterior.addEventListener("click", function() {
            moverCarrusel(-1);
        });
    }

    if (siguiente) {
        siguiente.addEventListener("click", function() {
            moverCarrusel(1);
        });
    }

    carrusel.addEventListener("scroll", actualizarCarrusel);

    window.addEventListener("resize", function() {
        actualizarIndicadores();
        actualizarCarrusel();
    });

    actualizarIndicadores();
    actualizarCarrusel();
}