// Funcionalidad principal para la página de Banca Empresas

document.addEventListener('DOMContentLoaded', function() {
    
    // Manejo de errores globales
    window.addEventListener('error', function(e) {
        console.log('Error capturado:', e.error);
        showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
    });
    
    // Funcionalidad adicional para enlaces de contacto
    const contactLinks = document.querySelectorAll('.premium-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto visual de click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simular apertura de modal de contacto
            showContactModal();
        });
    });
    
    // Modal de contacto simulado
    function showContactModal() {
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h3>Contactar Gerente de Relación</h3>
                    <p>Te conectaremos con tu gerente de relación para brindarte más información sobre Premium Family.</p>
                    <div class="modal-buttons">
                        <button class="btn-primary">Contactar Ahora</button>
                        <button class="btn-secondary" onclick="closeModal()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
        
        // Estilos del modal
        const style = document.createElement('style');
        style.textContent = `
            .contact-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background: white;
                padding: 30px;
                border-radius: 15px;
                max-width: 400px;
                width: 100%;
                text-align: center;
                animation: slideUp 0.3s ease;
            }
            
            .modal-content h3 {
                color: #1f2937;
                margin-bottom: 15px;
                font-size: 24px;
            }
            
            .modal-content p {
                color: #6b7280;
                margin-bottom: 25px;
                line-height: 1.6;
            }
            
            .modal-buttons {
                display: flex;
                gap: 10px;
                justify-content: center;
            }
            
            .btn-primary, .btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-primary {
                background: #3b82f6;
                color: white;
            }
            
            .btn-primary:hover {
                background: #1e40af;
            }
            
            .btn-secondary {
                background: #f3f4f6;
                color: #374151;
            }
            
            .btn-secondary:hover {
                background: #e5e7eb;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Cerrar modal al hacer click en overlay
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Funcionalidad de botones
        modal.querySelector('.btn-primary').addEventListener('click', function() {
            showNotification('Solicitud enviada. Te contactaremos pronto.', 'success');
            closeModal();
        });
        
        modal.querySelector('.btn-secondary').addEventListener('click', closeModal);
    }
    
    // Función global para cerrar modal
    window.closeModal = function() {
        const modal = document.querySelector('.contact-modal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };
    
    // Agregar animación de fadeOut
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);
    
    // Funcionalidad de búsqueda rápida (opcional)
    function initQuickSearch() {
        // Crear buscador rápido
        const searchContainer = document.createElement('div');
        searchContainer.className = 'quick-search';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Buscar servicios bancarios..." class="search-input">
            <div class="search-results"></div>
        `;
        
        const servicesSection = document.querySelector('.services-section');
        if (servicesSection) {
            servicesSection.insertBefore(searchContainer, servicesSection.firstChild);
        }
        
        const searchInput = searchContainer.querySelector('.search-input');
        const searchResults = searchContainer.querySelector('.search-results');
        const serviceCards = document.querySelectorAll('.service-card');
        
        // Array de servicios para búsqueda
        const services = Array.from(serviceCards).map(card => ({
            title: card.querySelector('.service-title').textContent,
            description: card.querySelector('.service-description').textContent,
            element: card
        }));
        
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length > 0) {
                const filteredServices = services.filter(service => 
                    service.title.toLowerCase().includes(query) ||
                    service.description.toLowerCase().includes(query)
                );
                
                // Mostrar/ocultar tarjetas basado en búsqueda
                serviceCards.forEach(card => {
                    const isMatch = filteredServices.some(service => service.element === card);
                    card.style.display = isMatch ? 'block' : 'none';
                });
                
                // Mostrar mensaje si no hay resultados
                if (filteredServices.length === 0) {
                    searchResults.innerHTML = '<p class="no-results">No se encontraron servicios que coincidan con tu búsqueda.</p>';
                    searchResults.style.display = 'block';
                } else {
                    searchResults.style.display = 'none';
                }
            } else {
                // Mostrar todas las tarjetas
                serviceCards.forEach(card => {
                    card.style.display = 'block';
                });
                searchResults.style.display = 'none';
            }
        });
    }
    
    // Funcionalidad de accesibilidad mejorada
    function initAccessibilityFeatures() {
        // Navegación por teclado mejorada
        const focusableElements = document.querySelectorAll('a, button, .service-card');
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.classList.contains('service-card')) {
                        const link = element.querySelector('.service-link');
                        if (link) {
                            link.click();
                        }
                    } else {
                        element.click();
                    }
                }
            });
            
            // Mejorar indicadores de foco
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #3b82f6';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
    
    // Inicializar funcionalidades opcionales
    // initQuickSearch(); // Descomenta para habilitar búsqueda
    initAccessibilityFeatures();
    
    console.log('Página Banca Empresas cargada exitosamente');
}); 
    initServiceCardAnimations();
    initPremiumSectionInteractions();
    initSmoothScrolling();
    initLoadingAnimations();
    
    // Funcionalidad para las tarjetas de servicios
    function initServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        // Animación de entrada con Intersection Observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150); // Animación escalonada
                }
            });
        }, observerOptions);
        
        serviceCards.forEach((card, index) => {
            // Estado inicial para animación
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            cardObserver.observe(card);
            
            // Efecto hover mejorado
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
                
                // Animar el ícono
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                
                // Resetear ícono
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
            
            // Efecto click para links
            const serviceLink = card.querySelector('.service-link');
            if (serviceLink) {
                serviceLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Efecto de click
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                    
                    // Simular navegación (aquí puedes agregar tu lógica de navegación real)
                    console.log(`Navegando a: ${this.textContent}`);
                    
                    // Mostrar feedback visual
                    showNotification(`Cargando información de ${card.querySelector('.service-title').textContent}...`);
                });
            }
        });
    }
    
    // Funcionalidad para la sección Premium Family
    function initPremiumSectionInteractions() {
        const premiumSection = document.querySelector('.premium-section');
        const closeBtn = document.querySelector('.close-btn');
        const premiumImage = document.querySelector('.premium-image');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                // Animación de cierre
                premiumImage.style.transform = 'scale(0.8)';
                premiumImage.style.opacity = '0.5';
                
                setTimeout(() => {
                    premiumImage.style.transform = 'scale(1)';
                    premiumImage.style.opacity = '1';
                    showNotification('Sección minimizada temporalmente');
                }, 300);
            });
        }
        
        // Animación de entrada para la sección Premium
        const premiumObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const content = entry.target.querySelector('.premium-content');
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        if (premiumSection) {
            const content = premiumSection.querySelector('.premium-content');
            content.style.opacity = '0';
            content.style.transform = 'translateY(50px)';
            content.style.transition = 'all 0.8s ease';
            
            premiumObserver.observe(premiumSection);
        }
        
        // Efecto hover en la imagen Premium
        if (premiumImage) {
            premiumImage.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            premiumImage.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    }
    
    // Smooth scrolling para enlaces internos
    function initSmoothScrolling() {
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
    }
    
    // Animaciones de carga inicial
    function initLoadingAnimations() {
        const heroSection = document.querySelector('.hero-section');
        const servicesSection = document.querySelector('.services-section');
        
        // Animación hero
        if (heroSection) {
            const heroText = heroSection.querySelector('.hero-text');
            const heroImage = heroSection.querySelector('.hero-image');
            
            setTimeout(() => {
                if (heroText) {
                    heroText.style.opacity = '1';
                    heroText.style.transform = 'translateX(0)';
                }
            }, 300);
            
            setTimeout(() => {
                if (heroImage) {
                    heroImage.style.opacity = '1';
                    heroImage.style.transform = 'translateX(0)';
                }
            }, 600);
            
            // Estados iniciales
            if (heroText) {
                heroText.style.opacity = '0';
                heroText.style.transform = 'translateX(-50px)';
                heroText.style.transition = 'all 0.8s ease';
            }
            
            if (heroImage) {
                heroImage.style.opacity = '0';
                heroImage.style.transform = 'translateX(50px)';
                heroImage.style.transition = 'all 0.8s ease';
            }
        }
        
        // Animación del título de servicios
        if (servicesSection) {
            const servicesHeader = servicesSection.querySelector('.services-header');
            
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.5 });
            
            if (servicesHeader) {
                servicesHeader.style.opacity = '0';
                servicesHeader.style.transform = 'translateY(30px)';
                servicesHeader.style.transition = 'all 0.6s ease';
                
                headerObserver.observe(servicesHeader);
            }
        }
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'info' ? '#3b82f6' : '#10b981',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: '1000',
            fontSize: '14px',
            fontWeight: '500',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animación de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Optimización de performance para scroll
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        // Efecto parallax sutil en el hero
        if (heroSection && scrollY < window.innerHeight) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
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