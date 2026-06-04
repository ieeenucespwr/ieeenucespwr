const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/leadership", label: "Leadership" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/courses", label: "Courses" },
  { href: "/open-source", label: "Open Source" },
  { href: "/contact", label: "Contact" }
];

const footerNavigation = [
  { href: "/about", label: "About" },
  { href: "/members", label: "Members" },
  { href: "/events", label: "Events" },
  { href: "/open-source", label: "Open Source" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

function assetPath(relativePath) {
  return relativePath.startsWith("/") ? relativePath : "/" + relativePath;
}

function renderPrimaryNavigation() {
  return primaryNavigation.map((item) => '<a href="' + item.href + '">' + item.label + '</a>').join('');
}

function renderFooterNavigation() {
  return footerNavigation.map((item) => '<a href="' + item.href + '">' + item.label + '</a>').join('');
}

function renderSiteHeader() {
  return [
    '<header class="site-header" data-header>',
    '  <nav class="nav container" aria-label="Primary navigation">',
    '    <a class="brand" href="/" aria-label="IEEE NUCES Peshawar home">',
    '      <img class="brand-logo" src="' + assetPath('assets/ieee-nuces-peshawar-campus-logo.webp') + '" alt="IEEE NUCES Peshawar logo" width="1024" height="849">',
    '    </a>',
    '    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" data-nav-toggle>',
    '      <span></span>',
    '      <span></span>',
    '      <span></span>',
    '      <span class="sr-only">Open menu</span>',
    '    </button>',
    '    <div class="nav-menu" id="nav-menu" data-nav-menu>' + renderPrimaryNavigation() + '</div>',
    '  </nav>',
    '</header>'
  ].join('');
}

function renderSiteFooter() {
  return [
    '<footer class="site-footer">',
    '  <div class="container footer-grid">',
    '    <div>',
    '      <img class="footer-logo" src="' + assetPath('assets/ieee-nuces-peshawar-campus-logo.webp') + '" alt="IEEE NUCES Peshawar logo" width="1024" height="849">',
    '      <p>Advancing technology for humanity at FAST NUCES Peshawar.</p>',
    '    </div>',
    '    <nav aria-label="Footer navigation">' + renderFooterNavigation() + '</nav>',
    '    <div class="footer-meta">',
    '      <p>Copyright <span data-year></span> IEEE NUCES PWR Student Branch.</p>',
    '      <p>Built by Rayyan Shaheer. Maintained by the IEEE NUCES PWR Student Branch community.</p>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('');
}

function renderSiteShell() {
  document.querySelectorAll('[data-site-header]').forEach((target) => {
    target.outerHTML = renderSiteHeader();
  });

  document.querySelectorAll('[data-site-footer]').forEach((target) => {
    target.outerHTML = renderSiteFooter();
  });
}
