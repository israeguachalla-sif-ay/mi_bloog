// ============================================
// FUNCIONALIDAD GENERAL
// ============================================

// Variables globales
const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');

// ============================================
// MENU MÓVIL
// ============================================
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

// ============================================
// SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HEADER STICKY CON EFECTO
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// ANIMACIÓN AL HACER SCROLL (REVEAL)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos con clase 'service-card'
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

document.querySelectorAll('.benefits-list li').forEach(item => {
    observer.observe(item);
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();

        // Validación simple
        if (!name || !email || !message) {
            showAlert('Por favor completa todos los campos', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showAlert('Por favor ingresa un email válido', 'error');
            return;
        }

        // Simulación de envío
        showAlert('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        contactForm.reset();
    });
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar alertas
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background-color: #10b981; color: white;' : 'background-color: #ef4444; color: white;'}
    `;

    document.body.appendChild(alertDiv);

    // Remover alerta después de 4 segundos
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 4000);
}

// ============================================
// CONTADOR DE ESTADÍSTICAS
// ============================================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// ============================================
// EFECTO DE ESCRITURA EN EL HERO
// ============================================
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Aplicar efecto de escritura si existe
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Comentado para no afectar el contenido inicial
    // typeWriter(heroTitle, originalText, 30);
}

// ============================================
// EFECTO PARALLAX
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ============================================
// CARGAR PROYECTOS DINÁMICAMENTE
// ============================================
const projects = [
    { title: 'E-commerce Moderno', category: 'Web Design', image: '🛍️' },
    { title: 'App de Gestión', category: 'Full Stack', image: '📱' },
    { title: 'Portal Empresarial', category: 'Web Design', image: '🏢' },
    { title: 'Red Social', category: 'Full Stack', image: '👥' },
];

function loadProjects() {
    const portfolioSection = document.querySelector('.portfolio .container');
    const projectsHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px;">
            ${projects.map(project => `
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center; cursor: pointer; transition: all 0.3s ease;" 
                     class="project-card"
                     onmouseover="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(-5px)'"
                     onmouseout="this.style.background='rgba(255,255,255,0.1)'; this.style.transform='translateY(0)'">
                    <div style="font-size: 40px; margin-bottom: 10px;">${project.image}</div>
                    <h4 style="color: white; margin-bottom: 5px;">${project.title}</h4>
                    <p style="color: rgba(255,255,255,0.7); font-size: 12px;">${project.category}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    const existingProjects = portfolioSection.querySelector('[style*="display: grid"]');
    if (!existingProjects) {
        portfolioSection.insertAdjacentHTML('beforeend', projectsHTML);
    }
}

// Cargar proyectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadProjects);

// ============================================
// EFECTO DE BOTONES CON RIPPLE
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// DETECCIÓN DE ELEMENTOS EN VIEWPORT
// ============================================
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Página de Israel Guachalla Fernandez cargada correctamente');
    
    // Animaciones iniciales
    handleScrollAnimation();
});

// ============================================
// ANIMACIONES CSS DINÁMICAS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .reveal {
        animation: revealUp 0.6s ease-out !important;
    }

    @keyframes revealUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .scrolled {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(style);
