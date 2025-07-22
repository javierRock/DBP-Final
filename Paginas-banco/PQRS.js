// PQRS Page JavaScript - Funcionalidades interactivas

document.addEventListener('DOMContentLoaded', function() {
    
    // ================== INICIALIZACIÓN ==================
    initializeVideoPlayer();
    initializeTabs();
    initializeButtons();
    initializeAnimations();
    initializeScrollEffects();
    
    // ================== REPRODUCTOR DE VIDEO ==================
    function initializeVideoPlayer() {
        const playButton = document.querySelector('.play-button');
        const videoThumbnail = document.querySelector('.video-thumbnail');
        const videoReplayBtns = document.querySelectorAll('.video-replay-btn');
        const serviceButtons = document.querySelectorAll('.service-button');
        
        // Función para simular reproducción de video
        function playVideo(title = 'Video') {
            // Crear overlay de video modal
            const videoModal = createVideoModal(title);
            document.body.appendChild(videoModal);
            
            // Mostrar modal con animación
            setTimeout(() => {
                videoModal.classList.add('active');
            }, 10);
            
            // Cerrar modal al hacer clic fuera
            videoModal.addEventListener('click', function(e) {
                if (e.target === videoModal) {
                    closeVideoModal(videoModal);
                }
            });
            
            // Cerrar modal con botón X
            const closeBtn = videoModal.querySelector('.close-video');
            closeBtn.addEventListener('click', () => {
                closeVideoModal(videoModal);
            });
            
            // Cerrar con tecla ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                    closeVideoModal(videoModal);
                }
            });
        }
        
        // Botón play principal
        if (playButton) {
            playButton.addEventListener('click', function() {
                playVideo('¿Qué puedes hacer con PQRS?');
                // Agregar efecto de clic
                this.style.transform = 'translate(-50%, -50%) scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translate(-50%, -50%) scale(1.1)';
                }, 150);
            });
        }
        
        // Botones de reproducir video
        videoReplayBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                playVideo('Tutorial PQRS');
                addClickEffect(this);
            });
        });
        
        // Botones de servicios
        serviceButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
                playVideo(`Video: ${serviceTitle}`);
                addClickEffect(this);
            });
        });
        
        // Crear modal de video
        function createVideoModal(title) {
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-content">
                    <button class="close-video">&times;</button>
                    <div class="video-player-container">
                        <div class="video-placeholder">
                            <div class="video-loading">
                                <div class="loading-spinner"></div>
                                <p>Cargando video...</p>
                            </div>
                            <h3>${title}</h3>
                        </div>
                    </div>
                </div>
            `;
            return modal;
        }
        
        // Cerrar modal de video
        function closeVideoModal(modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    }
    
    // ================== SISTEMA DE PESTAÑAS ==================
    function initializeTabs() {
        const tabs = document.querySelectorAll('.help-tab');
        const tabContents = document.querySelectorAll('#canales-content, #puntos-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.dataset.tab;
                
                // Remover clase active de todas las pestañas
                tabs.forEach(t => t.classList.remove('active'));
                
                // Agregar clase active a la pestaña seleccionada
                this.classList.add('active');
                
                // Ocultar todos los contenidos
                tabContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // Mostrar el contenido correspondiente
                const targetContent = document.getElementById(`${tabName}-content`);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    // Animación de aparición
                    targetContent.style.opacity = '0';
                    setTimeout(() => {
                        targetContent.style.opacity = '1';
                        targetContent.style.transition = 'opacity 0.3s ease';
                    }, 50);
                }
                
                // Efecto de clic
                addClickEffect(this);
            });
        });
    }
    
    // ================== BOTONES INTERACTIVOS ==================
    function initializeButtons() {
        const heroButton = document.querySelector('.hero-button');
        const channelButtons = document.querySelectorAll('.channel-button');
        
        // Botón principal del hero
        if (heroButton) {
            heroButton.addEventListener('click', function() {
                // Simulación de redirección o acción
                showNotification('Redirigiendo a crear petición...', 'info');
                addClickEffect(this);
                
                // Simular carga
                this.textContent = 'Cargando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Crear petición';
                    this.disabled = false;
                    showNotification('Funcionalidad en desarrollo', 'warning');
                }, 2000);
            });
        }
        
        // Botones de canales
        channelButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const channelName = this.closest('.channel-card').querySelector('.channel-title').textContent;
                showNotification(`Abriendo ${channelName}...`, 'info');
                addClickEffect(this);
            });
        });
    }
    
    // ================== ANIMACIONES Y EFECTOS ==================
    function initializeAnimations() {
        // Animación de aparición al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animación
        const elementsToAnimate = document.querySelectorAll('.step-card, .service-card, .channel-card');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
        
        // Animación de contadores para los pasos
        animateStepNumbers();
    }
    
    // Animar números de pasos
    function animateStepNumbers() {
        const stepNumbers = document.querySelectorAll('.step-number');
        
        stepNumbers.forEach((stepNumber, index) => {
            setTimeout(() => {
                stepNumber.style.transform = 'scale(1.2)';
                stepNumber.style.background = '#fbbf24';
                
                setTimeout(() => {
                    stepNumber.style.transform = 'scale(1)';
                    stepNumber.style.background = '#1e40af';
                }, 300);
            }, index * 200);
        });
    }
    
    // ================== EFECTOS DE SCROLL ==================
    function initializeScrollEffects() {
        // Efecto parallax suave en el hero
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
        
        // Botón scroll to top (si es necesario)
        createScrollToTop();
    }
    
    // Crear botón scroll to top
    function createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.title = 'Volver arriba';
        document.body.appendChild(scrollBtn);
        
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        // Función de scroll suave
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ================== FUNCIONES UTILITARIAS ==================
    
    // Efecto de clic en botones
    function addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Validación de formularios (si se agregan en el futuro)
    function validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showFieldError(input, 'Este campo es requerido');
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        return isValid;
    }
    
    // Mostrar error en campo
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
        field.classList.add('error');
    }
    
    // Limpiar error en campo
    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
    }
    
    // ================== ACCESIBILIDAD ==================
    
    // Mejorar navegación por teclado
    document.addEventListener('keydown', function(e) {
        // Navegación con Enter en elementos clickeables
        if (e.key === 'Enter') {
            const focused = document.activeElement;
            if (focused && (focused.classList.contains('step-card') || 
                           focused.classList.contains('service-card') || 
                           focused.classList.contains('channel-card'))) {
                focused.click();
            }
        }
    });
    
    // Hacer elementos focusables
    const interactiveElements = document.querySelectorAll('.step-card, .service-card, .channel-card');
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // ================== PERFORMANCE ==================
    
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    console.log('PQRS Page: Todas las funcionalidades inicializadas correctamente');
});

// ================== ESTILOS CSS DINÁMICOS ==================

// Agregar estilos CSS para funcionalidades JavaScript
const dynamicStyles = `
    <style>
        /* Modal de video */
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .video-modal.active {
            opacity: 1;
        }
        
        .video-modal-content {
            background: white;
            border-radius: 15px;
            padding: 20px;
            max-width: 800px;
            width: 90%;
            position: relative;
        }
        
        .close-video {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .video-player-container {
            margin-top: 20px;
        }
        
        .video-placeholder {
            background: #f0f0f0;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
        }
        
        .video-loading {
            text-align: center;
            color: #666;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #1e40af;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Notificaciones */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-info {
            background: #1e40af;
        }
        
        .notification-warning {
            background: #f59e0b;
        }
        
        .notification-error {
            background: #ef4444;
        }
        
        .notification-success {
            background: #10b981;
        }
        
        /* Scroll to top */
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1e40af;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: #1e3a8a;
            transform: translateY(-2px);
        }
        
        /* Animaciones de entrada */
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
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
        
        /* Errores de campo */
        .field-error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 5px;
        }
        
        .error {
            border-color: #ef4444 !important;
        }
        
        /* Elementos lazy loading */
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        /* Mejoras de accesibilidad */
        .step-card:focus,
        .service-card:focus,
        .channel-card:focus {
            outline: 2px solid #1e40af;
            outline-offset: 2px;
        }
    </style>
`;

// Insertar estilos dinámicos
document.head.insertAdjacentHTML('beforeend', dynamicStyles);

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