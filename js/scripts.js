const logos = document.querySelectorAll('.logo-wrapper');
gsap.set(logos, {
    autoAlpha: 1
})

logos.forEach((logo, i) => {
    gsap.set(logo, {
        xPercent: 100 * i
    });
});

// since the grid is 5 across, you want any amount more than 5 to enable animation
if (logos.length > 5) {
    // wrap function for looping
    const logosWrap = gsap.utils.wrap(-100, ((logos.length - 1) * 100));

    // how long it takes for each logo to move 100%;  
    const duration = logos.length * 2.5;

    gsap.to(logos, {
        xPercent: `-=${logos.length * 100}`,
        duration,
        repeat: -1,
        ease: 'none',
        modifiers: {
            // run xPercent through the wrap function
            xPercent: xPercent => logosWrap(parseFloat(xPercent))
        }
    });

}


const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".intro", // Elemento que disparará la animación
        start: "top 80%", // Cuando el top del elemento .intro llegue al 80% de la altura del viewport
        end: "bottom 20%", // Puedes especificar un final si lo deseas
        toggleActions: "play none none none", // Reproduce la animación al entrar en el viewport
        markers: false // Cambia a true para ver los puntos de inicio y fin (opcional)
    }
});

// Define la animación
tl.from(".intro h1, .intro p, .intro button", {
    y: 3000,
    ease: "power4.out",
    duration: 1.5,
    skewY: 7,
    stagger: {
        amount: 0.3
    }
});



gsap.to(".box", {
    y: "-100%",
    duration: 1.4,
    ease: "expo.inOut",
    delay: 1
});

gsap.from(".img", {
    scale: 2,
    duration: 3,
    ease: "expo.inOut",
    delay: 0
});

gsap.to(".wrapper-img", {
    width: 500,
    height: 700,
    duration: 1.4,
    ease: "expo.inOut",
    delay: 1
});

gsap.from(".images", {
    opacity: 0,
    duration: 1,
    ease: "expo.inOut",
    widht: "10px",
    delay: 2
});

gsap.to(".menu > div, .hero-container > div", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "expo.inOut",
    delay: 4.2,
    stagger: 0.1
});

function animateElements() {
    // Verifica si el ancho de la pantalla es menor a 750px
    if (window.innerWidth < 750) {
        // Para pantallas menores de 750px
        gsap.to(".left", {
            x: -60,
            rotation: -10,
            duration: 2,
            ease: "expo.inOut",
            delay: 2
        });

        gsap.to(".right", {
            x: 60,
            rotation: 10,
            duration: 2,
            ease: "expo.inOut",
            delay: 2
        });
    } else {
        // Para pantallas mayores o iguales a 750px
        gsap.to(".left", {
            x: -300,
            rotation: -10,
            duration: 2,
            ease: "expo.inOut",
            delay: 2
        });

        gsap.to(".right", {
            x: 300,
            rotation: 10,
            duration: 2,
            ease: "expo.inOut",
            delay: 2
        });
    }
}

// Llama a la función cuando cargue la página
animateElements();

// Vuelve a ejecutar la función si la ventana cambia de tamaño
window.addEventListener("resize", animateElements);









// NAV
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".burger");

    if (!toggleButton) {
        console.error("Elemento .burger no encontrado");
        return;
    }

    let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
    let isOpen = false;

    gsap.set(".menu-item p", {
        y: 225
    });

    const timeline = gsap.timeline({
        paused: true
    });

    timeline.to(".overlay", {
        duration: 0.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut"
    });

    timeline.to(".menu-item p", {
        duration: 0.5,
        y: 0,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=1");

    timeline.to(activeItemIndicator, {
        width: "100%",
        duration: 1,
        ease: "power4.out",
        delay: 0.5
    }, "<");

    toggleButton.addEventListener("click", function () {
        if (isOpen) {
            timeline.reverse();
        } else {
            timeline.play();
        }
        isOpen = !isOpen;
    });
});


CustomEase.create("cubic", "0.83, 0, 0.17, 1");
let isAnimating = false;

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

document.addEventListener("DOMContentLoaded", function () {
    splitTextIntoSpans(".copy h1");
    initializeCards();
    gsap.set("h1 span", {
        y: -200
    });
    gsap.set(".slider .card:last-child h1 span", {
        y: 0
    });
});

document.addEventListener("click", function () {
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
            gsap.set(lastCard.querySelectorAll("h1 span"), {
                y: -200
            });

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
});



document.body.onmousemove = function (e) {
    let x = e.clientX + window.scrollX;
    let y = e.clientY + window.scrollY;

    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
};

// Utiliza requestAnimationFrame para un rendimiento más fluido
document.body.onmousemove = (function() {
    let mouseX = 0;
    let mouseY = 0;

    const updateCursor = () => {
        document.documentElement.style.setProperty('--x', `${mouseX}px`);
        document.documentElement.style.setProperty('--y', `${mouseY}px`);
        requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return function (e) {
        mouseX = e.clientX + window.scrollX;
        mouseY = e.clientY + window.scrollY;
    };
});






