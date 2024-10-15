// Función para inicializar las tarjetas con ajuste en la posición Y (solo en pantallas pequeñas)
function initializeCards() {
  let cards = Array.from(document.querySelectorAll(".card"));
  if (window.innerWidth < 840) {
    gsap.to(cards, {
      y: (i) => -15 + 10 * i + "%", // Ajuste para pantallas pequeñas
      z: (i) => 15 * i,
      opacity: 1,
      duration: 1,
      ease: "cubic",
      stagger: -0.1,
    });
  } else {
    // Configuración original para pantallas grandes
    gsap.to(cards, {
      y: (i) => -15 + 15 * i + "%", // Configuración original
      z: (i) => 15 * i,
      opacity: 1,
      duration: 1,
      ease: "cubic",
      stagger: -0.1,
    });
  }
}

// Función para avanzar a la siguiente tarjeta (ajuste para pantallas pequeñas)
function nextCard() {
  if (isAnimating) return;
  isAnimating = true;

  let slider = document.querySelector(".slider");
  let cards = Array.from(slider.querySelectorAll(".card"));
  let lastCard = cards.pop();
  let nextCard = cards[cards.length - 1];

  gsap.to(lastCard.querySelectorAll("h1 span"), {
    y: 200,
    duration: 0.75,
    ease: "cubic",
  });

  if (window.innerWidth < 840) {
    // Ajuste para pantallas pequeñas
    gsap.to(lastCard, {
      y: "+=130%",
      duration: 0.75,
      ease: "cubic",
      onComplete: () => {
        slider.prepend(lastCard);
        initializeCards();
        gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });

        setTimeout(() => {
          isAnimating = false;
        }, 1000);
      },
    });
  } else {
    // Configuración original para pantallas grandes
    gsap.to(lastCard, {
      y: "+=150%",
      duration: 0.75,
      ease: "cubic",
      onComplete: () => {
        slider.prepend(lastCard);
        initializeCards();
        gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });

        setTimeout(() => {
          isAnimating = false;
        }, 1000);
      },
    });
  }

  gsap.to(nextCard.querySelectorAll("h1 span"), {
    y: 0,
    duration: 1,
    ease: "cubic",
    stagger: 0.05,
  });
}

// Función para manejar el evento de scroll con throttling (solo avanzamos hacia adelante)
function handleScroll(event) {
  if (!canScroll) return;

  console.log("Evento de scroll detectado:", event.deltaY);

  if (event.deltaY > 0) {
    nextCard();
  }

  canScroll = false; // Deshabilitar el scroll temporalmente

  setTimeout(() => {
    canScroll = true; // Rehabilitar el scroll después de 1 segundo
  }, 1000); // Debe coincidir con el tiempo de animación
}

document.addEventListener("DOMContentLoaded", function () {
  splitTextIntoSpans(".copy h1");
  initializeCards();
  gsap.set("h1 span", { y: -200 });
  gsap.set(".slider .card:last-child h1 span", { y: 0 });

  // Añadir evento al botón para avanzar
  document.querySelector(".next-btn").addEventListener("click", nextCard);

  // Añadir evento de scroll al window
  window.addEventListener("wheel", handleScroll, { passive: true });

  // Recalcular las posiciones al redimensionar la ventana
  window.addEventListener("resize", initializeCards);
});
