// Funcionalidad de pestañas
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidad de pestañas
    initTabs();
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Inicializar efectos de hover para tarjetas de servicio
    initServiceCardEffects();
    
    // Inicializar smooth scrolling para enlaces
    initSmoothScrolling();
});

// Funcionalidad de pestañas
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón clickeado y su contenido correspondiente
            this.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Agregar animación de fade in
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    });
}

// Animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animateElements = document.querySelectorAll(
        '.hero-content, .info-content, .business-content, .services-grid, .service-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Agregar estilos CSS dinámicamente para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        .hero-content,
        .info-content,
        .business-content,
        .services-grid,
        .service-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .service-card {
            transition-delay: 0.1s;
        }
        
        .service-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .service-card:nth-child(4) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
}

// Efectos de hover para tarjetas de servicio
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
        });
    });
}

// Smooth scrolling para enlaces
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

// Funcionalidad para botones con efectos de ripple
function addRippleEffect() {
    const buttons = document.querySelectorAll('.rates-button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Agregar estilos para el efecto ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .rates-button,
        .cta-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Funcionalidad de lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Funcionalidad para mostrar/ocultar información adicional
function initToggleFunctionality() {
    const toggleButtons = document.querySelectorAll('[data-toggle]');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-toggle');
            const target = document.getElementById(targetId);
            
            if (target) {
                target.classList.toggle('expanded');
                this.textContent = target.classList.contains('expanded') 
                    ? 'Mostrar menos' 
                    : 'Mostrar más';
            }
        });
    });
}

// Funcionalidad de validación de formularios (si se agregan formularios)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
            }
        });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Agregar estilos para las notificaciones si no existen
    if (!document.getElementById('notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 6px;
                color: white;
                font-weight: 600;
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            
            .notification-info {
                background: #17a2b8;
            }
            
            .notification-success {
                background: #28a745;
            }
            
            .notification-error {
                background: #dc3545;
            }
            
            .notification-warning {
                background: #ffc107;
                color: #212529;
            }
            
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Ocultar después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
    
    // Permitir cerrar haciendo clic
    notification.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Funcionalidad de búsqueda en tiempo real (para contenido de pestañas)
function initSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchableContent = document.querySelectorAll('.tab-content p, .tab-content li');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        searchableContent.forEach(element => {
            const text = element.textContent.toLowerCase();
            const parent = element.closest('.tab-content');
            
            if (searchTerm === '' || text.includes(searchTerm)) {
                element.style.display = '';
                element.style.backgroundColor = '';
                
                // Resaltar término de búsqueda
                if (searchTerm !== '') {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    const highlightedText = element.textContent.replace(regex, '<mark>$1</mark>');
                    element.innerHTML = highlightedText;
                }
            } else {
                element.style.display = 'none';
            }
        });
    });
}

// Funcionalidad para copiar enlaces de documentos
function initCopyLinkFunctionality() {
    const documentLinks = document.querySelectorAll('.document-link');
    
    documentLinks.forEach(link => {
        // Agregar botón de copiar
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋';
        copyButton.className = 'copy-link-btn';
        copyButton.title = 'Copiar enlace';
        copyButton.style.cssText = `
            margin-left: 10px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 14px;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        
        copyButton.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        copyButton.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0.7';
        });
        
        copyButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simular copia del enlace (en una implementación real, sería la URL real)
            const linkText = link.textContent;
            navigator.clipboard.writeText(`Enlace a: ${linkText}`).then(() => {
                showNotification('Enlace copiado al portapapeles', 'success');
            }).catch(() => {
                showNotification('Error al copiar el enlace', 'error');
            });
        });
        
        link.parentNode.insertBefore(copyButton, link.nextSibling);
    });
}

// Funcionalidad de contador animado para estadísticas (si se agregan)
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-counter'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Funcionalidad de tema oscuro/claro (toggle)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        showNotification(`Tema ${newTheme === 'light' ? 'claro' : 'oscuro'} activado`, 'info');
    });
}

// Funcionalidad para modal de información adicional
function initModalFunctionality() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            showModal(modalId);
        });
    });
    
    // Cerrar modal al hacer clic fuera o en botón cerrar
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showModal(modalId) {
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalContent = getModalContent(modalId);
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            ${modalContent}
        </div>
    `;
    
    // Agregar estilos del modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #333;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px) scale(0.9); }
            to { transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(modalStyles);
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function getModalContent(modalId) {
    // Contenido de ejemplo para diferentes modales
    const modalContents = {
        'rates': `
            <h3>Tasas y Tarifas PSE</h3>
            <p>Consulta nuestras tarifas competitivas para el servicio de botón de pagos PSE.</p>
            <ul>
                <li>Comisión por transacción: Variable según el monto</li>
                <li>Tarifa mensual: Desde $50.000</li>
                <li>Configuración inicial: Sin costo</li>
            </ul>
            <p><small>*Tarifas sujetas a cambios. Consulta con tu ejecutivo comercial.</small></p>
        `,
        'requirements': `
            <h3>Requisitos Detallados</h3>
            <p>Para implementar el botón PSE necesitas cumplir con los siguientes requisitos técnicos y comerciales.</p>
            <h4>Requisitos Técnicos:</h4>
            <ul>
                <li>Sitio web con certificado SSL</li>
                <li>Integración API REST</li>
                <li>Servidor con PHP 7.4 o superior</li>
            </ul>
            <h4>Requisitos Comerciales:</h4>
            <ul>
                <li>RUT vigente</li>
                <li>Cuenta bancaria empresarial</li>
                <li>Referencias comerciales</li>
            </ul>
        `
    };
    
    return modalContents[modalId] || '<p>Contenido no disponible</p>';
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidades principales
    initTabs();
    initScrollAnimations();
    initServiceCardEffects();
    initSmoothScrolling();
    
    // Funcionalidades adicionales
    addRippleEffect();
    initLazyLoading();
    initToggleFunctionality();
    initFormValidation();
    initSearchFunctionality();
    initCopyLinkFunctionality();
    initAnimatedCounters();
    initThemeToggle();
    initModalFunctionality();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido! Explora nuestros servicios PSE', 'info');
    }, 1000);
});

// Funcionalidad adicional para mejorar la experiencia del usuario
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Detectar si el usuario está inactivo y mostrar ayuda
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (document.visibilityState === 'visible') {
            showNotification('¿Necesitas ayuda? Usa las pestañas para obtener más información', 'info');
        }
    }, 30000); // 30 segundos de inactividad
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

/**
 * Banco de Bogotá - Header & Footer Integration
 * Maneja la funcionalidad completa del header y footer
 */

// Header Class
class BancoBogotaHeader {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.dropdownMenu = document.querySelector('.dropdown-menu');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.customerService = document.querySelector('.customer-service');
        this.menuContents = document.querySelectorAll('.menu-content');
        
        this.currentActiveMenu = 'empresas';
        this.lastScrollTop = 0;
        this.scrollThreshold = 5;
        this.hoverTimeout = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.showMenuContent(this.currentActiveMenu);
        this.initScrollBehavior();
    }
    
    initScrollBehavior() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScrollDirection();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    handleScrollDirection() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScrollTop < 0) return;
        if (Math.abs(currentScrollTop - this.lastScrollTop) < this.scrollThreshold) return;
        
        if (currentScrollTop > this.lastScrollTop && currentScrollTop > 80) {
            this.hideHeader();
        } else {
            this.showHeader();
        }
        
        this.lastScrollTop = currentScrollTop;
    }
    
    hideHeader() {
        this.header.classList.add('hidden');
        this.dropdownMenu.classList.remove('visible');
    }
    
    showHeader() {
        this.header.classList.remove('hidden');
    }
    
    bindEvents() {
        this.header.addEventListener('mouseenter', () => {
            this.showDropdown();
        });
        
        this.header.addEventListener('mouseleave', () => {
            this.hideDropdown();
        });
        
        this.menuItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const menuType = e.target.getAttribute('data-menu');
                this.handleMenuHover(menuType, e.target);
            });
        });
        
        this.customerService.addEventListener('mouseenter', () => {
            this.handleMenuHover('atencion', this.customerService);
        });
        
        this.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const menuType = e.target.getAttribute('data-menu');
                this.setActiveMenuItem(menuType, e.target);
            });
        });
    }
    
    showDropdown() {
        if (!this.header.classList.contains('hidden')) {
            this.dropdownMenu.classList.add('visible');
        }
    }
    
    hideDropdown() {
        this.dropdownMenu.classList.remove('visible');
    }
    
    handleMenuHover(menuType, element) {
        if (!menuType) return;
        
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
        
        this.hoverTimeout = setTimeout(() => {
            this.showMenuContent(menuType);
            this.updateActiveStates(menuType, element);
        }, 100);
    }
    
    showMenuContent(menuType) {
        this.menuContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.querySelector(`[data-content="${menuType}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
            this.currentActiveMenu = menuType;
        }
    }
    
    updateActiveStates(menuType, hoveredElement) {
        this.menuItems.forEach(item => {
            item.classList.remove('hover-active');
        });
        this.customerService.classList.remove('hover-active');
        
        if (hoveredElement) {
            hoveredElement.classList.add('hover-active');
        }
    }
    
    setActiveMenuItem(menuType, element) {
        this.menuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        if (element) {
            element.classList.add('active');
        }
        
        this.currentActiveMenu = menuType;
        this.showMenuContent(menuType);
    }
}

// Footer Class
class BancoBogotaFooter {
    constructor() {
        this.dropdownBtn = document.getElementById('filialesBtn');
        this.dropdownContent = document.getElementById('filialesDropdown');
        this.dropdownTimeout = null;
        
        this.init();
    }
    
    init() {
        this.initDropdown();
        this.initSmoothScrolling();
        this.initAnimationsOnScroll();
        this.initSocialIconsEffects();
        this.initAccessibility();
        this.handleResponsiveDropdown();
        this.trackFooterClicks();
        
        // Handle window resize
        this.handleResize();
    }
    
    initDropdown() {
        if (!this.dropdownBtn || !this.dropdownContent) return;
        
        // Mouse events
        this.dropdownBtn.addEventListener('mouseenter', () => this.showDropdown());
        this.dropdownBtn.addEventListener('mouseleave', () => this.hideDropdown());
        this.dropdownContent.addEventListener('mouseenter', () => this.clearHideTimeout());
        this.dropdownContent.addEventListener('mouseleave', () => this.hideDropdown());
        
        // Click events
        this.dropdownBtn.addEventListener('click', (e) => this.toggleDropdown(e));
        this.dropdownContent.addEventListener('click', (e) => e.stopPropagation());
    }
    
    showDropdown() {
        if (this.dropdownTimeout) {
            clearTimeout(this.dropdownTimeout);
        }
        
        this.dropdownBtn.classList.add('active');
        this.dropdownContent.classList.add('show');
        this.dropdownBtn.setAttribute('aria-expanded', 'true');
        
        document.addEventListener('click', (e) => this.handleClickOutside(e));
    }
    
    hideDropdown() {
        this.dropdownTimeout = setTimeout(() => {
            this.dropdownBtn.classList.remove('active');
            this.dropdownContent.classList.remove('show');
            this.dropdownBtn.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', this.handleClickOutside);
        }, 200);
    }
    
    hideDropdownImmediate() {
        this.dropdownBtn.classList.remove('active');
        this.dropdownContent.classList.remove('show');
        this.dropdownBtn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', this.handleClickOutside);
        
        if (this.dropdownTimeout) {
            clearTimeout(this.dropdownTimeout);
        }
    }
    
    clearHideTimeout() {
        if (this.dropdownTimeout) {
            clearTimeout(this.dropdownTimeout);
        }
    }
    
    toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.dropdownContent.classList.contains('show')) {
            this.hideDropdownImmediate();
        } else {
            this.showDropdown();
        }
    }
    
    handleClickOutside(event) {
        if (!this.dropdownBtn.contains(event.target) && !this.dropdownContent.contains(event.target)) {
            this.hideDropdownImmediate();
        }
    }
    
    initSmoothScrolling() {
        const footerLinks = document.querySelectorAll('.banco-footer a[href^="#"]');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initAnimationsOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const footerElements = document.querySelectorAll('.footer-column, .app-content, .social-content, .bank-name');
        
        footerElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    initSocialIconsEffects() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    initAccessibility() {
        if (!this.dropdownBtn) return;
        
        this.dropdownBtn.setAttribute('aria-expanded', 'false');
        this.dropdownBtn.setAttribute('aria-haspopup', 'true');
        this.dropdownContent.setAttribute('role', 'menu');
        
        this.dropdownBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleDropdown(e);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.dropdownContent.classList.contains('show')) {
                this.hideDropdownImmediate();
                this.dropdownBtn.focus();
            }
        });
    }
    
    handleResponsiveDropdown() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // En mobile solo funciona por click
            this.dropdownBtn.removeEventListener('mouseenter', () => this.showDropdown());
            this.dropdownBtn.removeEventListener('mouseleave', () => this.hideDropdown());
        }
    }
    
    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResponsiveDropdown();
            }, 250);
        });
    }
    
    trackFooterClicks() {
        const footerLinks = document.querySelectorAll('.banco-footer a');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', function() {
                const linkText = this.textContent.trim();
                const section = this.closest('.footer-column')?.querySelector('h4')?.textContent || 'Unknown';
                
                console.log('Footer link clicked:', {
                    text: linkText,
                    section: section,
                    url: this.href
                });
            });
        });
    }
}

// Utility Classes
class ScrollOptimizer {
    constructor() {
        this.isScrolling = false;
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Utility functions
const BancoBogotaUtils = {
    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop;
    },
    
    isScrollingDown(currentScrollTop, lastScrollTop) {
        return currentScrollTop > lastScrollTop;
    },
    
    smoothTransition(element, property, value, duration = 300) {
        element.style.transition = `${property} ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        element.style[property] = value;
    },
    
    isElementVisible(element) {
        return element.offsetHeight > 0 && element.offsetWidth > 0;
    }
};

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Header
    const header = new BancoBogotaHeader();
    
    // Initialize Footer
    const footer = new BancoBogotaFooter();
    
    // Initialize utilities
    const scrollOptimizer = new ScrollOptimizer();
    
    // Add interactive effects
    const addInteractiveEffects = () => {
        // Header menu item effects
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-1px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Product link effects
        const productLinks = document.querySelectorAll('.product-category a');
        productLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    };
    
    // Add smooth scrolling behavior
    const addSmoothScrolling = () => {
        document.documentElement.style.scrollBehavior = 'smooth';
    };
    
    // Apply effects with delay
    setTimeout(() => {
        addInteractiveEffects();
        addSmoothScrolling();
    }, 100);
    
    console.log('Banco de Bogotá - Header & Footer inicializados correctamente');
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        BancoBogotaHeader, 
        BancoBogotaFooter, 
        ScrollOptimizer, 
        BancoBogotaUtils 
    };
}