document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMain = document.querySelector('.nav-main');

    if (menuToggle && navMain) {
        menuToggle.addEventListener('click', () => {
            navMain.classList.toggle('active');
        });
    }

    // 2. Info Section Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Show the corresponding tab content
            const targetTabId = button.dataset.tab;
            const targetTabContent = document.getElementById(targetTabId);
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            }
        });
    });

    // 3. FAQ / Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentNode;
            const accordionContent = header.nextElementSibling;
            const accordionIcon = header.querySelector('.accordion-icon');

            accordionItem.classList.toggle('active');

            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
                accordionIcon.innerHTML = '&#9650;';
            } else {
                accordionContent.style.maxHeight = "0";
                accordionIcon.innerHTML = '&#9660;';
            }

            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherAccordionItem = otherHeader.parentNode;
                    const otherAccordionContent = otherHeader.nextElementSibling;
                    const otherAccordionIcon = otherHeader.querySelector('.accordion-icon');

                    if (otherAccordionItem.classList.contains('active')) {
                        otherAccordionItem.classList.remove('active');
                        otherAccordionContent.style.maxHeight = "0";
                        otherAccordionIcon.innerHTML = '&#9660;';
                    }
                }
            });
        });
    });

    // 4. Navbar Scroll Effect
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    let ticking = false;

    if (navbar) {
        function updateNavbar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 80) {
                navbar.classList.remove('visible');
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
                navbar.classList.add('visible');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
        
        // Show navbar on load
        navbar.classList.add('visible');
    }
});