CustomEase.create("cubic", "0.83, 0, 0.17, 1");
let isAnimating = false;
let canScroll = true;

// Función para dividir el texto en spans
function splitTextIntoSpans(selector) {
  let elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    let text = element.innerText;
    let splitText = text
      .split("")
      .map(function (char) {
        return `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
      })
      .join("");
    element.innerHTML = splitText;
  });
}

// Función para inicializar las tarjetas
function initializeCards() {
  let cards = Array.from(document.querySelectorAll(".card"));
  gsap.to(cards, {
    y: (i) => -15 + 15 * i + "%",
    z: (i) => 15 * i,
    opacity: 1,
    duration: 1,
    ease: "cubic",
    stagger: -0.1,
  });
}

// Función para avanzar a la siguiente tarjeta
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

  gsap.to(nextCard.querySelectorAll("h1 span"), {
    y: 0,
    duration: 1,
    ease: "cubic",
    stagger: 0.05,
  });
}

// Función para retroceder a la tarjeta anterior
function prevCard() {
  if (isAnimating) return;
  isAnimating = true;

  let slider = document.querySelector(".slider");
  let cards = Array.from(slider.querySelectorAll(".card"));
  let firstCard = cards.shift();
  let prevCard = cards[0];

  gsap.to(firstCard.querySelectorAll("h1 span"), {
    y: -200,
    duration: 0.75,
    ease: "cubic",
  });

  gsap.to(firstCard, {
    y: "-=150%",
    duration: 0.75,
    ease: "cubic",
    onComplete: () => {
      slider.append(firstCard);
      initializeCards();
      gsap.set(firstCard.querySelectorAll("h1 span"), { y: 200 });

      setTimeout(() => {
        isAnimating = false;
      }, 1000);
    },
  });

  gsap.to(prevCard.querySelectorAll("h1 span"), {
    y: 0,
    duration: 1,
    ease: "cubic",
    stagger: 0.05,
  });
}

// Función para manejar el evento de scroll con throttling
function handleScroll(event) {
  if (!canScroll) return;

  console.log("Evento de scroll detectado:", event.deltaY);

  if (event.deltaY > 0) {
    nextCard();
  } else {
    prevCard();
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

  // Añadir eventos a los botones
  document.querySelector(".next-btn").addEventListener("click", nextCard);
  document.querySelector(".prev-btn").addEventListener("click", prevCard);

  // Añadir evento de scroll al window
  window.addEventListener("wheel", handleScroll, { passive: true });
});
