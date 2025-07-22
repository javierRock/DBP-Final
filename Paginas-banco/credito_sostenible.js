// Funcionalidad de las pestañas de información
document.addEventListener('DOMContentLoaded', function() {
    // Manejo de pestañas
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
            }
        });
    });

    // Animaciones al hacer scroll
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

    // Observar todas las secciones para animaciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animaciones para las tarjetas de información
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });

    // Animaciones para las tarjetas de uso
    const useItems = document.querySelectorAll('.use-item');
    useItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        const useObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        useObserver.observe(item);
    });

    // Animaciones para las tarjetas de productos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        
        const productObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, observerOptions);
        
        productObserver.observe(card);
    });

    // Animaciones para las características destacadas
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        const featureObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);
        
        featureObserver.observe(item);
    });

    // Efecto hover para las tarjetas de información
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Efecto hover para las tarjetas de uso
    useItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Efecto hover para las tarjetas de productos
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Smooth scroll para navegación (si hay enlaces internos)
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

    // Función para manejar el scroll suave de las características destacadas
    const featuresList = document.querySelector('.features-list');
    if (featuresList) {
        // Agregar indicador de scroll si es necesario
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '↓ Desliza para ver más';
        scrollIndicator.style.cssText = `
            position: absolute;
            bottom: 10px;
            right: 20px;
            font-size: 12px;
            color: #666;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        
        const featuresSection = document.querySelector('.features-section');
        if (featuresSection) {
            featuresSection.style.position = 'relative';
            featuresSection.appendChild(scrollIndicator);
        }
        
        // Ocultar el indicador cuando se haga scroll
        featuresList.addEventListener('scroll', function() {
            if (this.scrollTop > 50) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }

    // Función para manejar clicks en los botones CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .portal-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Agregar efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            const rippleCSS = document.createElement('style');
            rippleCSS.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
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
            
            if (!document.querySelector('style[data-ripple]')) {
                rippleCSS.setAttribute('data-ripple', 'true');
                document.head.appendChild(rippleCSS);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Lazy loading para imágenes (si se implementa)
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
    
    images.forEach(img => imageObserver.observe(img));

    // Función para manejar el redimensionamiento de ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalcular animaciones si es necesario
            const windowWidth = window.innerWidth;
            if (windowWidth < 768) {
                // Ajustes para móvil
                document.body.classList.add('mobile-view');
            } else {
                document.body.classList.remove('mobile-view');
            }
        }, 250);
    });

    // Inicializar vista móvil si es necesario
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile-view');
    }
});

// Función de utilidad para formatear números
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Función para validar formularios (si se implementa)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

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
