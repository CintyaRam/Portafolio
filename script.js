/* ============================================================
   PRELOADER (EVITA QUE BLOQUEE LOS BOTONES DEL HERO)
   ============================================================ */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.remove(); // El preloader desaparece por completo
  }
});

/* ============================================================
   SCROLL SUAVE PARA CUALQUIER LINK QUE USE #
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const destino = document.querySelector(this.getAttribute("href"));

    if (!destino) return;

    e.preventDefault();

    destino.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* ============================================================
   SCROLLSPY (RESALTA LA SECCIÓN ACTUAL)
   ============================================================ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function scrollSpy() {
  let scrollPos = window.pageYOffset;

  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => link.classList.remove("active"));
      document.querySelector(`a[href="#${id}"]`)?.classList.add("active");
    }
  });
}

window.addEventListener("scroll", scrollSpy);

/* ============================================================
   ANIMACIÓN TYPEWRITER (TEXTO DINÁMICO EN HERO)
   ============================================================ */
const frases = [
  "Desarrollo aplicaciones web con Python y Django.",
  "Me gusta transformar ideas en soluciones reales.",
  "Sigo aprendiendo cada día para mejorar mis proyectos."
];

let indiceFrase = 0;
let indiceCaracter = 0;
const velocidad = 70;
const pausa = 1500;

const heroDynamic = document.getElementById("hero-dynamic");

function escribir() {
  if (!heroDynamic) return;

  let textoActual = frases[indiceFrase];
  heroDynamic.textContent = textoActual.slice(0, indiceCaracter);
  indiceCaracter++;

  if (indiceCaracter <= textoActual.length) {
    setTimeout(escribir, velocidad);
  } else {
    setTimeout(borrar, pausa);
  }
}

function borrar() {
  if (!heroDynamic) return;

  let textoActual = frases[indiceFrase];
  heroDynamic.textContent = textoActual.slice(0, indiceCaracter);
  indiceCaracter--;

  if (indiceCaracter >= 0) {
    setTimeout(borrar, 40);
  } else {
    indiceFrase = (indiceFrase + 1) % frases.length;
    setTimeout(escribir, 400);
  }
}

escribir();

/* ============================================================
   FORMULARIO REAL (FORMSPREE)
   ============================================================ */
const form = document.getElementById("contactForm");
const mensajeBox = document.getElementById("mensajeFormulario");
const mensajeTexto = document.getElementById("mensajeTexto");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        mostrarMensaje("¡Mensaje enviado correctamente! Te responderé pronto.", "success");
        form.reset();
      } else {
        mostrarMensaje("Hubo un error al enviar el mensaje. Inténtalo nuevamente.", "error");
      }
    } catch (error) {
      mostrarMensaje("Error inesperado. Inténtalo más tarde.", "error");
    }
  });
}

/* ============================================================
   FUNCIÓN PARA MOSTRAR ALERTAS
   ============================================================ */
function mostrarMensaje(texto, tipo) {
  if (!mensajeBox || !mensajeTexto) return;

  mensajeTexto.textContent = texto;

  mensajeBox.classList.remove("hidden");
  mensajeBox.classList.remove("success", "error");

  mensajeBox.classList.add(tipo === "success" ? "success" : "error");
}

/* ============================================================
   CERRAR ALERTA
   ============================================================ */
function cerrarAlerta() {
  mensajeBox.classList.add("hidden");
}
