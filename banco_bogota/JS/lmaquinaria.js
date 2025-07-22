// Lógica para las pestañas de la sección de Información
function openTab(evt, tabName) {
    // Declaración de variables
    var i, tabcontent, tablinks;

    // Obtener todos los elementos con class="tab-content" y ocultarlos
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Obtener todos los elementos con class="tab-link" y remover la clase "active"
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la pestaña actual, y añadir una clase "active" al botón que abrió la pestaña
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Lógica para el acordeón de Preguntas Frecuentes
document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            // Alternar la clase 'active' en el header
            this.classList.toggle("active");

            // Obtener el contenido del acordeón
            const accordionContent = this.nextElementSibling;

            // Comprobar si el panel está abierto o cerrado
            if (accordionContent.style.display === "block") {
                accordionContent.style.display = "none";
            } else {
                accordionContent.style.display = "block";
            }
        });
    });
});