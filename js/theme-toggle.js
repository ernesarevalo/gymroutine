document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themes = ['pink-theme', 'red-theme', 'blue-theme'];
    let currentThemeIndex = 0;

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        currentThemeIndex = themes.indexOf(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        // Remove current theme
        document.body.classList.remove(themes[currentThemeIndex]);

        // Cycle to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;

        // Add new theme
        document.body.classList.add(themes[currentThemeIndex]);

        // Save selected theme
        localStorage.setItem('selectedTheme', themes[currentThemeIndex]);
    });
});
