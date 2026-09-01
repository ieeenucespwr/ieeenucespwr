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

  let toggleCount = 0;

  function syncToggle(control) {
    const input = control.querySelector(".theme-switch__input");
    const theme = currentTheme();
    const next = theme === "dark" ? "light" : "dark";

    control.dataset.themeState = theme;
    if (input) {
      input.checked = theme === "dark";
      input.setAttribute("aria-label", "Switch to " + next + " theme");
      input.setAttribute("aria-checked", String(theme === "dark"));
    }
  }

  function syncToggles() {
    document.querySelectorAll(".theme-switch").forEach(syncToggle);
  }

  function createToggle() {
    toggleCount += 1;
    const control = document.createElement("div");
    const id = "theme-switch-" + toggleCount;
    control.className = "theme-switch";
    control.innerHTML = [
      '<input id="' + id + '" class="theme-switch__input" name="theme-switch" type="checkbox" role="switch">',
      '<label class="theme-switch__label" for="' + id + '"><span class="sr-only">Toggle dark mode</span></label>'
    ].join('');

    const input = control.querySelector(".theme-switch__input");
    input.addEventListener("change", () => {
      const next = input.checked ? "dark" : "light";
      applyTheme(next);
      saveTheme(next);
      syncToggles();
    });

    ["pointerdown", "pointerup", "pointerleave", "blur"].forEach((eventName) => {
      input.addEventListener(eventName, () => {
        control.classList.toggle("is-pressed", eventName === "pointerdown");
      });
    });

    syncToggle(control);
    return control;
  }

  function mountToggle(target) {
    if (!target || target.querySelector(".theme-switch")) return;
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
