document.addEventListener('DOMContentLoaded', () => {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all tab items and hide all tab contents
            tabItems.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');

            // Add active class to the clicked tab item
            item.classList.add('active');

            // Display the corresponding tab content
            const targetTabId = item.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });

    // Optionally, set the first tab as active on load
    if (tabItems.length > 0) {
        tabItems[0].click();
    }
});