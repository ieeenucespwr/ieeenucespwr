const siteData = window.IEEE_SITE_DATA || {};

const bySelector = (selector, parent = document) => parent.querySelector(selector);
const allBySelector = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function externalLinkAttributes(url) {
  return url.startsWith("http") ? " target=\"_blank\" rel=\"noreferrer\"" : "";
}

function linkList(links = []) {
  if (!links.length) return "";
  const items = links.map((link) => {
    return "<a href=\"" + link.url + "\"" + externalLinkAttributes(link.url) + ">" + link.label + "</a>";
  }).join("");
  return "<div class=\"link-row\">" + items + "</div>";
}

function limitItems(items, target) {
  const count = Number(target?.dataset.previewCount || 0);
  return count > 0 ? items.slice(0, count) : items;
}

function renderFaculty() {
  const target = bySelector("#faculty-panel");
  if (!target || !siteData.faculty) return;

  const faculty = siteData.faculty;
  target.innerHTML = [
    "<img src=\"" + faculty.image + "\" alt=\"" + faculty.name + "\" loading=\"lazy\" width=\"560\" height=\"620\">",
    "<div class=\"faculty-body\">",
    "<p class=\"role\">" + faculty.role + "</p>",
    "<h3>" + faculty.name + "</h3>",
    "<p>" + faculty.detail + "</p>",
    linkList(faculty.links),
    "</div>"
  ].join("");
}

function renderLeaders() {
  const target = bySelector("#leadership-grid");
  if (!target || !siteData.leaders) return;

  target.innerHTML = limitItems(siteData.leaders, target).map((leader) => {
    return [
      "<article class=\"leader-card\">",
      "<img src=\"" + leader.image + "\" alt=\"" + leader.name + "\" loading=\"lazy\" width=\"640\" height=\"480\">",
      "<div class=\"leader-card-body\">",
      "<p class=\"role\">" + leader.role + "</p>",
      "<h3>" + leader.name + "</h3>",
      "<p>" + leader.department + "</p>",
      "<p>" + leader.summary + "</p>",
      linkList(leader.links),
      "</div>",
      "</article>"
    ].join("");
  }).join("");
}

function renderTeams() {
  const target = bySelector("#team-rail");
  if (!target || !siteData.teams) return;

  target.innerHTML = siteData.teams.map((team) => {
    return [
      "<article class=\"team-card\">",
      "<img src=\"" + team.image + "\" alt=\"" + team.name + " team lead\" loading=\"lazy\" width=\"420\" height=\"260\">",
      "<div>",
      "<h3>" + team.name + "</h3>",
      "<p>" + team.focus + "</p>",
      "</div>",
      "</article>"
    ].join("");
  }).join("");
}

function eventMeta(event) {
  return [
    "<div class=\"event-meta\">",
    "<span>" + event.date + "</span>",
    "<span>" + event.type + "</span>",
    "</div>"
  ].join("");
}

function renderEvents() {
  const feature = bySelector("#event-feature");
  const grid = bySelector("#events-grid");
  if (!feature || !grid || !siteData.events?.length) return;

  const [primary, ...events] = siteData.events;
  feature.innerHTML = [
    "<div class=\"event-feature-body\">",
    eventMeta(primary),
    "<h3>" + primary.title + "</h3>",
    "<p>" + primary.summary + "</p>",
    "<a class=\"button button-secondary\" href=\"" + primary.href + "\">Read event report</a>",
    "</div>",
    "<img src=\"" + primary.image + "\" alt=\"" + primary.title + "\" loading=\"lazy\" width=\"720\" height=\"540\">"
  ].join("");

  grid.innerHTML = limitItems(events, grid).map((event) => {
    return [
      "<article class=\"event-card\" data-event-year=\"" + event.year + "\">",
      "<img src=\"" + event.image + "\" alt=\"" + event.title + "\" loading=\"lazy\" width=\"640\" height=\"360\">",
      "<div class=\"event-card-body\">",
      eventMeta(event),
      "<h3>" + event.title + "</h3>",
      "<p>" + event.summary + "</p>",
      "<a class=\"text-link\" href=\"" + event.href + "\">View details</a>",
      "</div>",
      "</article>"
    ].join("");
  }).join("");
}

function renderCourses() {
  const target = bySelector("#course-list");
  if (!target || !siteData.courses) return;

  target.innerHTML = limitItems(siteData.courses, target).map((course) => {
    return [
      "<article class=\"course-card\">",
      "<img src=\"" + course.image + "\" alt=\"" + course.title + "\" loading=\"lazy\" width=\"360\" height=\"300\">",
      "<div>",
      "<h3>" + course.title + "</h3>",
      "<p>" + course.summary + "</p>",
      "</div>",
      "</article>"
    ].join("");
  }).join("");
}

function setupNavigation() {
  const header = bySelector("[data-header]");
  const toggle = bySelector("[data-nav-toggle]");
  const menu = bySelector("[data-nav-menu]");
  const links = allBySelector(".nav-menu a");
  const current = location.pathname.split("/").pop() || "index.html";

  function closeMenu() {
    menu?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
  }

  toggle?.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    const target = link.getAttribute("href") || "";
    link.classList.toggle("is-active", target === current);
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 8);
    },
    { passive: true }
  );
}

function setupMotion() {
  document.body.classList.add("motion-ready");

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    document.documentElement.style.setProperty("--scroll-progress", progressValue + "%");
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  const revealTargets = allBySelector([
    ".mission-grid",
    ".section-heading",
    ".faculty-panel",
    ".leader-card",
    ".operating-steps article",
    ".team-card",
    ".event-feature",
    ".event-card",
    ".course-card",
    ".opensource-grid",
    ".contribution-board article",
    ".simple-card",
    ".join-grid"
  ].join(","));

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal-item");
    target.dataset.revealIndex = String(index % 6);
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

function setupPressFeedback() {
  allBySelector(".button, .filter-button").forEach((control) => {
    control.addEventListener("pointerdown", () => control.classList.add("is-pressed"));
    ["pointerup", "pointerleave", "blur"].forEach((eventName) => {
      control.addEventListener(eventName, () => control.classList.remove("is-pressed"));
    });
  });
}

function setupEventFilters() {
  const buttons = allBySelector("[data-event-filter]");
  const cards = allBySelector("[data-event-year]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.eventFilter;
      const grid = bySelector("#events-grid");

      grid?.classList.add("is-filtering");
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));

      window.setTimeout(() => {
        cards.forEach((card) => {
          card.hidden = filter !== "all" && card.dataset.eventYear !== filter;
        });
        grid?.classList.remove("is-filtering");
      }, 140);
    });
  });
}

function setupContactForm() {
  const form = bySelector("[data-contact-form]");
  const status = bySelector("[data-form-status]");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    status.classList.remove("is-error");
    form.classList.remove("is-invalid");
    if (!name || !email || !message || !isValidEmail) {
      status.textContent = "Enter your name, a valid email, and a short message.";
      status.classList.add("is-error");
      form.classList.add("is-invalid");
      window.setTimeout(() => form.classList.remove("is-invalid"), 280);
      return;
    }

    const subject = encodeURIComponent("IEEE NUCES PWR inquiry from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + name + "\nEmail: " + email);

    status.textContent = "Opening your email client with a drafted message.";
    window.location.href = "mailto:info@ieeenucespwr.org?subject=" + subject + "&body=" + body;
  });
}

function setYear() {
  allBySelector("[data-year]").forEach((target) => {
    target.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFaculty();
  renderLeaders();
  renderTeams();
  renderEvents();
  renderCourses();
  setupNavigation();
  setupMotion();
  setupPressFeedback();
  setupEventFilters();
  setupContactForm();
  setYear();
});
