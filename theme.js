(() => {
  const storageKey = "ieee-theme";
  const root = document.documentElement;

  function storedTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (error) {
      return null;
    }
  }

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const theme = storedTheme() || systemTheme;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();
