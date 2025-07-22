// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = {
        '¿Qué es?': 'Es un tipo de crédito especializado con plazo de hasta 12 meses para el pago de cesantías. Aplica únicamente para empresas que tengan a sus empleados afiliados o se afilien al fondo de cesantías administrado por Porvenir S.A.',
        'Características': 'Este producto cuenta con tasas preferenciales, aprobación rápida, y facilidades de pago adaptadas a las necesidades de tu empresa. El desembolso se realiza directamente a Porvenir S.A.',
        'Requisitos': 'Tu empresa debe estar afiliada al fondo de cesantías Porvenir S.A. o comprometerse a afiliarse. Además, debe cumplir con los requisitos crediticios del banco y presentar la documentación requerida.',
        'Seguridad': 'Contamos con los más altos estándares de seguridad bancaria y protocolos de protección de datos. Todas las transacciones están respaldadas por certificados de seguridad internacionales.'
    };
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update tab content
            const tabContent = document.querySelector('.tab-content p');
            const buttonText = this.textContent.trim();
            
            if (tabContents[buttonText]) {
                tabContent.textContent = tabContents[buttonText];
            }
        });
    });
});

//