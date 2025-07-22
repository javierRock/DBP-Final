document.addEventListener('DOMContentLoaded', () => {
    const ingresarBtn = document.querySelector('.ingresar-btn');
    if (ingresarBtn) {
        ingresarBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la navegación predeterminada
            // Aquí iría la lógica para mostrar/ocultar un menú desplegable
            console.log('Botón Ingresar clicado');
        });
    }

    const dropdownBtn = document.querySelector('.dropdown-btn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (event) => {
            event.preventDefault();
            // Lógica para el dropdown del footer
            console.log('Botón de Filiales y Agencias clicado');
        });
    }
});