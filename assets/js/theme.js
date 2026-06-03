(() => {
  const storageKey = "ieee-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function storedTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Storage can be blocked in private browsing; the visible theme still changes.
    }
  }

  function systemTheme() {
    return media.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function syncToggle(control) {
    const label = control.querySelector(".theme-toggle-label");
    const theme = currentTheme();
    const next = theme === "dark" ? "light" : "dark";

    if (label) label.textContent = next === "dark" ? "Dark" : "Light";
    control.setAttribute("aria-label", "Switch to " + next + " theme");
    control.setAttribute("aria-pressed", String(theme === "dark"));
  }

  function syncToggles() {
    document.querySelectorAll(".theme-toggle").forEach(syncToggle);
  }

  function createToggle() {
    const control = document.createElement("button");
    control.className = "theme-toggle";
    control.type = "button";
    control.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-label"></span>';
    control.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      saveTheme(next);
      syncToggles();
    });
    ["pointerdown", "pointerup", "pointerleave", "blur"].forEach((eventName) => {
      control.addEventListener(eventName, () => {
        control.classList.toggle("is-pressed", eventName === "pointerdown");
      });
    });
    syncToggle(control);
    return control;
  }

  function mountToggle(target) {
    if (!target || target.querySelector(".theme-toggle")) return;
    target.append(createToggle());
  }

  function handleSystemThemeChange(event) {
    if (storedTheme()) return;
    applyTheme(event.matches ? "dark" : "light");
    syncToggles();
  }

  applyTheme(storedTheme() || systemTheme());

  if (media.addEventListener) {
    media.addEventListener("change", handleSystemThemeChange);
  } else {
    media.addListener(handleSystemThemeChange);
  }

  window.IEEETheme = {
    applyTheme,
    currentTheme,
    mountToggle,
    syncToggles
  };
})();
