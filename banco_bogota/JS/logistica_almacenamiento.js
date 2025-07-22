document.addEventListener('DOMContentLoaded', () => {
    const tabItems = document.querySelectorAll('.informacion-almacenamiento .tab-item');
    const tabContents = document.querySelectorAll('.informacion-almacenamiento .tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // Eliminar la clase activa de todos los elementos de pestaña
            tabItems.forEach(t => t.classList.remove('active'));
            // Ocultar todos los contenidos de pestaña
            tabContents.forEach(c => c.style.display = 'none');

            // Añadir la clase activa al elemento de pestaña clicado
            item.classList.add('active');

            // Mostrar el contenido de pestaña correspondiente
            const targetId = item.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });

    // Activar la primera pestaña por defecto al cargar la página
    if (tabItems.length > 0) {
        // Simular un clic en la primera pestaña activa o en la primera si no hay activa
        let activeTabFound = false;
        tabItems.forEach(item => {
            if (item.classList.contains('active')) {
                item.click();
                activeTabFound = true;
            }
        });
        if (!activeTabFound) {
            tabItems[0].click(); // Si ninguna está marcada como activa, activa la primera
        }
    }
});