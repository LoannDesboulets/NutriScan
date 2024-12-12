// Function to toggle dark mode
export function toggleDarkMode() {
    const body = document.body;

    // Toggle dark mode class
    body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}
