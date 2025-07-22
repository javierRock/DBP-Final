// Funcionalidad para las pestañas de Merchant ID
document.addEventListener('DOMContentLoaded', function() {
    
    // PESTAÑAS DE MERCHANT ID
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Función para cambiar pestañas de Merchant ID
    function switchTab(targetTab) {
        // Remover clase active de todos los botones y paneles
        tabButtons.forEach(button => button.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Agregar clase active al botón clickeado y su panel correspondiente
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const activePane = document.getElementById(targetTab);
        
        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
        }
    }
    
    // Event listeners para las pestañas de Merchant ID
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // PESTAÑAS DE AYUDA
    const helpTabButtons = document.querySelectorAll('.help-tab-button');
    const helpTabPanes = document.querySelectorAll('.help-tab-pane');
    
    // Función para cambiar pestañas de ayuda
    function switchHelpTab(targetTab) {
        // Remover clase active de todos los botones y paneles de ayuda
        helpTabButtons.forEach(button => button.classList.remove('active'));
        helpTabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Agregar clase active al botón clickeado y su panel correspondiente
        const activeButton = document.querySelector(`[data-help-tab="${targetTab}"]`);
        const activePane = document.getElementById(targetTab);
        
        if (activeButton && activePane) {
            activeButton.classList.add('active');
            activePane.classList.add('active');
        }
    }
    
    // Event listeners para las pestañas de ayuda
    helpTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-help-tab');
            switchHelpTab(targetTab);
        });
    });
    
    // ANIMACIONES DE SCROLL
    // Función para detectar cuando un elemento entra en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Función para animar elementos cuando entran en viewport
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.key-card, .benefit-card, .help-channel-card');
        
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Preparar elementos para animación
    const animatedElements = document.querySelectorAll('.key-card, .benefit-card, .help-channel-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Ejecutar animaciones en scroll
    window.addEventListener('scroll', animateOnScroll);
    // Ejecutar una vez al cargar la página
    animateOnScroll();
    
    // EFECTOS HOVER MEJORADOS
    // Efecto hover para las tarjetas de llaves
    const keyCards = document.querySelectorAll('.key-card');
    keyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 102, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efecto hover para las tarjetas de beneficios
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 255, 136, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // ANIMACIÓN DE ICONOS FLOTANTES
    // Agregar movimiento aleatorio a los iconos flotantes
    function animateFloatingIcons() {
        const floatingIcons = document.querySelectorAll('.floating-icons .icon, .floating-elements .element, .card-elements .element, .card-decorations .decoration');
        
        floatingIcons.forEach((icon, index) => {
            // Generar valores aleatorios para la animación
            const randomDelay = Math.random() * 2;
            const randomDuration = 3 + Math.random() * 2;
            const randomDistance = 15 + Math.random() * 10;
            
            icon.style.animationDelay = `${randomDelay}s`;
            icon.style.animationDuration = `${randomDuration}s`;
            
            // Crear keyframes personalizados para cada icono
            const keyframeName = `float-${index}`;
            const keyframes = `
                @keyframes ${keyframeName} {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                    }
                    25% { 
                        transform: translateY(-${randomDistance}px) rotate(5deg); 
                    }
                    50% { 
                        transform: translateY(-${randomDistance * 0.7}px) rotate(-3deg); 
                    }
                    75% { 
                        transform: translateY(-${randomDistance * 0.3}px) rotate(2deg); 
                    }
                }
            `;
            
            // Agregar los keyframes al documento
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            // Aplicar la animación personalizada
            icon.style.animationName = keyframeName;
        });
    }
    
    // Ejecutar animación de iconos flotantes
    animateFloatingIcons();
    
    // SMOOTH SCROLLING PARA ENLACES INTERNOS
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
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
    
    // EFECTO PARALLAX LIGERO PARA HERO SECTION
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }
    
    // Aplicar efecto parallax en scroll (solo en dispositivos no móviles)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // LOADING ANIMATION PARA BOTONES
    const buttons = document.querySelectorAll('.search-button, .help-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Solo para botones que no sean enlaces internos
            if (!this.getAttribute('href') || this.getAttribute('href').startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            const originalText = this.textContent;
            
            // Mostrar estado de carga
            this.textContent = 'Cargando...';
            this.disabled = true;
            this.style.opacity = '0.7';
            
            // Simular carga (en una aplicación real, esto sería una llamada a API)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                this.style.opacity = '1';
            }, 2000);
        });
    });
    
    // RESPONSIVE BEHAVIOR
    function handleResize() {
        const windowWidth = window.innerWidth;
        
        // Desactivar parallax en móviles
        if (windowWidth <= 768) {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = 'none';
            }
        }
        
        // Ajustar tamaño de fuente dinámicamente
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            if (windowWidth <= 480) {
                heroTitle.style.fontSize = '28px';
            } else if (windowWidth <= 768) {
                heroTitle.style.fontSize = '36px';
            } else {
                heroTitle.style.fontSize = '48px';
            }
        }
    }
    
    // Ejecutar en resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar una vez al cargar
    
    // ACCESSIBILITY IMPROVEMENTS
    // Manejo de teclado para pestañas
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % tabButtons.length;
                tabButtons[nextIndex].focus();
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = index === 0 ? tabButtons.length - 1 : index - 1;
                tabButtons[prevIndex].focus();
            }
        });
    });
    
    // Manejo de teclado para pestañas de ayuda
    helpTabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % helpTabButtons.length;
                helpTabButtons[nextIndex].focus();
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = index === 0 ? helpTabButtons.length - 1 : index - 1;
                helpTabButtons[prevIndex].focus();
            }
        });
    });
    
    // INTERSECTION OBSERVER PARA MEJORES ANIMACIONES
    // Crear observer para animaciones más eficientes
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const elementsToAnimate = document.querySelectorAll('.key-card, .benefit-card, .help-channel-card, .info-content, .merchant-content');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // CSS class para animaciones
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
    
    console.log('Página Bre-B cargada correctamente con todas las funcionalidades activas');
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