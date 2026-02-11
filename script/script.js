const planetas = {
    "Mercurio": { 
        color: "#8c8c8c", size: 6, dist: 60, speed: 3, 
        desc: "El planeta más pequeño y cercano al Sol.", 
        dato: "No tiene atmósfera y sus temperaturas oscilan entre -180°C y 430°C.",
        distReal: "57.9 millones de km" 
    },
    "Venus": { 
        color: "#e3bb76", size: 10, dist: 90, speed: 5, 
        desc: "El objeto más brillante en el cielo después de la Luna.", 
        dato: "Su atmósfera de CO2 atrapa el calor, siendo el planeta más caliente.",
        distReal: "108.2 millones de km" 
    },
    "Tierra": { 
        color: "#2271b3", size: 11, dist: 125, speed: 8, 
        desc: "Nuestro hogar, el único mundo conocido con vida líquida.", 
        dato: "Es el único planeta que no tiene nombre de un dios griego o romano.",
        distReal: "149.6 millones de km" 
    },
    "Marte": { 
        color: "#e27b58", size: 8, dist: 160, speed: 12, 
        desc: "El planeta rojo, desértico y helado.", 
        dato: "Tiene el Monte Olimpo, el volcán más alto del sistema solar (22 km).",
        distReal: "227.9 millones de km" 
    },
    "Júpiter": { 
        color: "#d39c7e", size: 24, dist: 220, speed: 20, 
        desc: "El gigante gaseoso, más grande que todos los demás planetas juntos.", 
        dato: "Su 'Gran Mancha Roja' es una tormenta que lleva activa cientos de años.",
        distReal: "778.5 millones de km" 
    },
    "Saturno": { 
        color: "#c2ae80", size: 20, dist: 280, speed: 25, 
        desc: "Famoso por su deslumbrante y complejo sistema de anillos.", 
        dato: "Es tan poco denso que, si hubiera un océano gigante, Saturno flotaría.",
        distReal: "1,434 millones de km", 
        anillos: true 
    },
    "Urano": { 
        color: "#b5e3e3", size: 14, dist: 330, speed: 35, 
        desc: "Un gigante de hielo con una rotación única.", 
        dato: "Gira de lado, casi en un ángulo de 90 grados respecto a su órbita.",
        distReal: "2,871 millones de km" 
    },
    "Neptuno": { 
        color: "#4b70dd", size: 14, dist: 370, speed: 45, 
        desc: "El planeta más lejano, oscuro, frío y azotado por vientos.", 
        dato: "Fue el primer planeta descubierto mediante cálculos matemáticos.",
        distReal: "4,495 millones de km" 
    }
};

let planetaEnfocado = null;
const escena = document.getElementById('escena');
const contenedorPlanetas = document.getElementById('sistema-solar');

function init() {
    Object.keys(planetas).forEach(nombre => {
        const p = planetas[nombre];
        const orb = document.createElement('div');
        orb.className = 'orbita';
        orb.style.width = `${p.dist * 2}px`;
        orb.style.height = `${p.dist * 2}px`;
        orb.style.animationDuration = `${p.speed}s`;

        const plan = document.createElement('div');
        plan.className = 'planeta';
        plan.id = `planeta-${nombre}`;
        plan.style.width = `${p.size}px`;
        plan.style.height = `${p.size}px`;
        plan.style.backgroundColor = p.color;
        plan.style.left = `calc(100% - ${p.size/2}px)`;
        plan.style.top = `calc(50% - ${p.size/2}px)`;

        if (p.anillos) {
            const anillo = document.createElement('div');
            anillo.className = 'anillos-saturno';
            anillo.style.width = `${p.size * 2.5}px`;
            anillo.style.height = `${p.size * 2.5}px`;
            plan.appendChild(anillo);
        }

        plan.onclick = (e) => { e.stopPropagation(); enfocar(nombre); };
        orb.appendChild(plan);
        contenedorPlanetas.appendChild(orb);
    });
    actualizarCamara();
}

function enfocar(nombre) {
    planetaEnfocado = nombre;
    const p = planetas[nombre];
    
    // Si es el Sol, ponemos datos genéricos
    if (nombre === 'Sol') {
        document.getElementById('p-nombre').innerText = "El Sol";
        document.getElementById('p-descripcion').innerText = "Estrella de tipo espectral G2V que contiene el 99.8% de la masa del sistema.";
        document.getElementById('p-distancia').innerText = "Centro";
        document.getElementById('p-dato').innerText = "Su luz tarda 8 minutos y 20 segundos en llegar a la Tierra.";
    } else {
        document.getElementById('p-nombre').innerText = nombre;
        document.getElementById('p-descripcion').innerText = p.desc;
        document.getElementById('p-distancia').innerText = p.distReal;
        document.getElementById('p-dato').innerText = p.dato;
    }
}

function actualizarCamara() {
    if (planetaEnfocado) {
        if (planetaEnfocado === 'Sol') {
            escena.style.transform = `scale(1.5) translate(0, 0)`;
        } else {
            const pElement = document.getElementById(`planeta-${planetaEnfocado}`);
            
            // Obtenemos la rotación actual de la órbita para calcular la posición X e Y
            // En lugar de usar getBoundingClientRect que falla con el zoom,
            // calculamos la posición teórica usando el tiempo y la velocidad.
            const p = planetas[planetaEnfocado];
            const estiloOrbita = window.getComputedStyle(pElement.parentElement);
            const matrix = new WebKitCSSMatrix(estiloOrbita.transform);
            
            // Ángulo actual de rotación
            const angle = Math.atan2(matrix.m12, matrix.m11);
            
            // Coordenadas del planeta respecto al Sol (0,0)
            const posX = Math.cos(angle) * p.dist;
            const posY = Math.sin(angle) * p.dist;

            // Movemos la escena al inverso de la posición del planeta para centrarlo
            // Usamos un scale alto (4) para el zoom
            escena.style.transform = `scale(4) translate(${-posX}px, ${-posY}px)`;
        }
    }
    requestAnimationFrame(actualizarCamara);
}

function resetView() {
    planetaEnfocado = null;
    escena.style.transform = `scale(0.8) translate(0, 0)`;
    document.getElementById('p-nombre').innerText = "Sistema Solar";
}

init();