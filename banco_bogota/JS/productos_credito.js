document.addEventListener('DOMContentLoaded', () => {
    // --- Fixed Navigation Bar functionality ---
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero'); // Or any element after which the nav should become fixed

    if (navbar && heroSection) {
        // Get the initial offset of the navbar from the top of the viewport
        const stickyOffset = navbar.offsetTop;

        function handleScroll() {
            // If the current scroll position is greater than the stickyOffset, add the 'fixed-navbar' class
            if (window.scrollY > stickyOffset) {
                navbar.classList.add('fixed-navbar');
            } else {
                // Otherwise, remove the 'fixed-navbar' class
                navbar.classList.remove('fixed-navbar');
            }
        }

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Call it once on load to check initial position
        handleScroll();
    }


    // --- Tab Functionality ---
    const tabs = document.querySelectorAll('.tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs and tab contents
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked tab
            tab.classList.add('active');

            // Get the ID of the content to show from the data-tab attribute
            const targetTabContentId = tab.dataset.tab;
            const targetTabContent = document.getElementById(targetTabContentId);

            // Add 'active' class to the corresponding tab content
            if (targetTabContent) {
                targetTabContent.classList.add('active');
            }
        });
    });

    // Optionally, activate the first tab by default on load
    // This ensures content is visible even before interaction
    if (tabs.length > 0 && tabContents.length > 0) {
        tabs[0].click(); // Simulate a click on the first tab
    }
});