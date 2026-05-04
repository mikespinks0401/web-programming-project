/**
 * site.js — Custom scripts for the SJC Philosophy Club website
 *
 * Responsibilities:
 *   1. Theme toggle — reads/writes localStorage and applies light/dark mode
 *      to the <html> data-bs-theme attribute across all pages.
 *   2. Philosopher spotlight — updates the spotlight panel on library.html
 *      when a thinker button is clicked.
 */

// Wrap everything in an IIFE to avoid polluting the global scope
;(function () {
  const root = document.documentElement
  // Read the saved theme preference from localStorage; default to 'light'
  const storedTheme = localStorage.getItem('sjc-theme')
  const initialTheme = storedTheme || 'light'

  /**
   * applyTheme - Sets the data-bs-theme attribute on <html> and syncs
   * every theme toggle checkbox and label on the current page.
   * @param {string} theme - 'light' or 'dark'
   */
  function applyTheme(theme) {
    root.setAttribute('data-bs-theme', theme)
    document.querySelectorAll('[data-theme-toggle]').forEach(function (toggle) {
      toggle.checked = theme === 'dark'
      toggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
      )
    })
    document.querySelectorAll('[data-theme-label]').forEach(function (label) {
      label.textContent = theme === 'dark' ? 'Dark mode' : 'Light mode'
    })
  }

  // Apply the initial theme immediately so the page renders correctly on load
  applyTheme(initialTheme)

  // Listen for changes on any theme-toggle checkbox and persist the selection
  document.addEventListener('change', function (event) {
    if (!event.target.matches('[data-theme-toggle]')) return
    const theme = event.target.checked ? 'dark' : 'light'
    localStorage.setItem('sjc-theme', theme)
    applyTheme(theme)
  })

  // --- PHILOSOPHER SPOTLIGHT (library.html only) ---
  // Select all thinker buttons and the spotlight panel elements
  const thinkers = document.querySelectorAll('[data-thinker-button]')
  const spotlightImage = document.querySelector('[data-thinker-image]')
  const spotlightTitle = document.querySelector('[data-thinker-title]')
  const spotlightCopy = document.querySelector('[data-thinker-copy]')

  // Only run spotlight logic if the required elements are present on the page
  if (thinkers.length && spotlightImage && spotlightTitle && spotlightCopy) {
    thinkers.forEach(function (button) {
      button.addEventListener('click', function () {
        // Remove 'active' from all buttons, then mark the clicked one active
        thinkers.forEach(function (item) {
          item.classList.remove('active')
        })
        button.classList.add('active')
        spotlightImage.src = button.dataset.image
        spotlightImage.alt = button.dataset.alt
        spotlightTitle.textContent = button.dataset.title
        spotlightCopy.textContent = button.dataset.copy
      })
    })
  }
})()
