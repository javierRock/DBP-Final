// Tabs funcionales y scroll suave en contenido
function showTab(tabId) {
  // Oculta todos los tab panes
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => pane.classList.remove('active'));

  // Quita la clase activa de todos los botones
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));

  // Muestra el tab seleccionado
  document.getElementById(tabId).classList.add('active');

  // Activa el botón correspondiente
  // Busca el botón que disparó el evento
  tabButtons.forEach(btn => {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
      btn.classList.add('active');
    }
  });

  // Scroll suave al cambiar de tab
  const tabContent = document.querySelector('.tab-content');
  if (tabContent) {
    tabContent.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// FAQ funcionalidad
function toggleFAQ(index) {
  const faqItems = document.querySelectorAll('.faq-item');
  const currentItem = faqItems[index];
  // Cierra todos los FAQ menos el actual
  faqItems.forEach((item, i) => {
    if (i !== index) {
      item.classList.remove('active');
    }
  });
  // Alterna el actual
  currentItem.classList.toggle('active');
}

// Inicialización
window.addEventListener('DOMContentLoaded', function() {
  // Oculta todas las respuestas FAQ al inicio
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => item.classList.remove('active'));

  // Activa el primer tab por defecto
  showTab('que-es');
});