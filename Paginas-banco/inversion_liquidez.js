// ========== FUNCIONALIDAD DE PESTAÑAS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Agregar event listeners a todos los botones de pestañas
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar la clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener el ID del contenido correspondiente
            const targetTab = this.getAttribute('data-tab');
            
            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// ========== ANIMACIONES DE ENTRADA ==========
document.addEventListener('DOMContentLoaded', function() {
    // Crear observer para animaciones de entrada
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
    
    // Aplicar animaciones a las tarjetas
    const cards = document.querySelectorAll('.product-card, .solution-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ========== EFECTOS HOVER MEJORADOS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Efecto hover para tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover para tarjetas de soluciones
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ========== ANIMACIÓN DE BLOQUES DE CONSTRUCCIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    const blocks = document.querySelectorAll('.block');
    
    // Animación secuencial de los bloques
    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.style.animation = `buildUp 0.8s ease-out forwards`;
            block.style.animationDelay = `${index * 0.1}s`;
        }, 500);
    });
});

// Agregar animación CSS para los bloques
const style = document.createElement('style');
style.textContent = `
    @keyframes buildUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .block {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// ========== FUNCIONALIDAD DEL BOTÓN CERRAR ==========
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close-btn');
    const heroSection = document.querySelector('.hero-section');
    
    if (closeBtn && heroSection) {
        closeBtn.addEventListener('click', function() {
            heroSection.style.transform = 'translateY(-100%)';
            heroSection.style.opacity = '0';
            heroSection.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                heroSection.style.display = 'none';
            }, 500);
        });
    }
});

// ========== SMOOTH SCROLL PARA ENLACES ==========
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========== EFECTO PARALLAX LIGERO ==========
document.addEventListener('DOMContentLoaded', function() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
});

// ========== CONTADOR DE ANIMACIÓN PARA ESTADÍSTICAS ==========
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// ========== LAZY LOADING PARA IMÁGENES ==========
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ========== GESTIÓN DE EVENTOS PARA MOBILE ==========
document.addEventListener('DOMContentLoaded', function() {
    // Detectar dispositivos móviles
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mejorar experiencia táctil en móviles
        const touchElements = document.querySelectorAll('.product-card, .solution-card, .tab-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
});

// ========== ACCESIBILIDAD - NAVEGACIÓN CON TECLADO ==========
document.addEventListener('DOMContentLoaded', function() {
    // Mejorar navegación con teclado para las pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let newIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    newIndex = (index + 1) % tabButtons.length;
                    break;
                case 'ArrowLeft':
                    newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    break;
                case 'Home':
                    newIndex = 0;
                    break;
                case 'End':
                    newIndex = tabButtons.length - 1;
                    break;
                default:
                    return;
            }
            
            e.preventDefault();
            tabButtons[newIndex].focus();
            tabButtons[newIndex].click();
        });
    });
});

// ========== OPTIMIZACIÓN DE RENDIMIENTO ==========
document.addEventListener('DOMContentLoaded', function() {
    // Throttle para eventos de scroll
    let ticking = false;
    
    function updateScrollEffects() {
        // Aquí van los efectos de scroll
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
});

// ========== ANALYTICS Y TRACKING ==========
document.addEventListener('DOMContentLoaded', function() {
    // Tracking de clics en enlaces importantes
    const trackingLinks = document.querySelectorAll('.product-link, .solution-link, .portfolio-btn');
    
    trackingLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Aquí se puede agregar código de analytics
            console.log('Click tracked:', this.textContent.trim());
        });
    });
});

// ========== GESTIÓN DE ERRORES ==========
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    // Aquí se puede agregar lógica para reportar errores
});

// ========== INICIALIZACIÓN FINAL ==========
document.addEventListener('DOMContentLoaded', function() {
    // Marcar la página como completamente cargada
    document.body.classList.add('loaded');
    
    // Inicializar tooltips si existen
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        // Lógica para tooltips
    });
    
    console.log('Página completamente inicializada');
});
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