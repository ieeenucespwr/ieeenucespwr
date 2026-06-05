let siteData = window.IEEE_SITE_DATA || {};
let currentRoutePath = "/";
let lightboxImages = [];
let currentImageIndex = 0;

const siteOrigin = "https://pwr.ieeenuces.org";
const bySelector = (selector, parent = document) => parent.querySelector(selector);
const allBySelector = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const coverImageLabel = "cover image";

const legacyRoutes = {
  "/index.html": "/",
  "/about.html": "/about",
  "/leadership.html": "/leadership",
  "/events.html": "/events",
  "/courses.html": "/courses",
  "/contact.html": "/contact",
  "/privacy.html": "/privacy",
  "/terms.html": "/terms"
};

const eventReports = {
  "linkedin-branding-nov2024": {
    subtitle: "Building a credible student profile and professional story.",
    accent: "linkedin-branding-nov2024",
    stats: ["November 2024", "Professional development", "Profile building", "Student career readiness"],
    sections: [
      {
        title: "Event overview",
        paragraphs: [
          "The LinkedIn Personal Branding Session helped students understand how a professional profile can document projects, coursework, leadership, and technical growth.",
          "The session focused on practical profile structure, writing concise experience entries, choosing evidence of work, and building a professional network with intention."
        ]
      },
      {
        title: "What students practiced",
        list: [
          "Writing stronger profile summaries around real projects and skills.",
          "Turning event participation, volunteer work, and coursework into credible experience.",
          "Using posts, project links, and recommendations without overstating credentials.",
          "Building connections with faculty, peers, alumni, and technical communities."
        ]
      }
    ],
    info: [
      ["Organized by", "IEEE NUCES PWR Student Branch"],
      ["Focus area", "Content, media, and professional development"],
      ["Published by", "IEEE NUCES PWR Student Branch"]
    ],
    gallery: ["assets/events/generated/linkedin-branding-nov2024.webp"]
  },
  "gender-equality-sep2024": {
    subtitle: "Empowering voices, ensuring equality.",
    accent: "gender-equality-sep2024",
    stats: ["September 27, 2024", "1 hour CPD", "65+ students", "Batches 2021-2024"],
    sections: [
      {
        title: "Event overview",
        paragraphs: [
          "The Gender Equality in Technology session addressed gender disparities in technology and helped students discuss more inclusive academic and professional spaces.",
          "Participants heard practical examples, shared perspectives, and discussed how students can support respectful collaboration in STEM fields."
        ]
      },
      {
        title: "Key topics addressed",
        list: [
          "Representation gaps in technology education and employment.",
          "Bias, stereotypes, access to mentors, and confidence barriers.",
          "Inclusive work culture and practical allyship.",
          "Career support systems for women pursuing technology roles."
        ]
      },
      {
        title: "Impact and takeaways",
        paragraphs: [
          "The session encouraged students to recognize their role in building inclusive technical spaces and supporting peers across departments.",
          "The branch can reuse this record when planning future community sessions, mentorship discussions, and awareness activities."
        ]
      }
    ],
    info: [
      ["Theme", "Empowering voices, ensuring equality"],
      ["Organized by", "IEEE NUCES PWR Student Branch"],
      ["Faculty advisor", "Dr. Suleman Mir"],
      ["CPD points", "1 hour of continuous professional development credit"]
    ],
    gallery: ["assets/events/generated/gender-equality-sep2024.webp"]
  },
  "ieee-xtreme-oct2024": {
    subtitle: "Branch preparation and participation for IEEE Xtreme 18.0.",
    accent: "ieee-xtreme-oct2024",
    stats: ["October 2024", "Competition", "Programming", "IEEE Xtreme 18.0"],
    sections: [
      {
        title: "Event overview",
        paragraphs: [
          "IEEE Xtreme participation gave students a structured way to practice algorithmic thinking, teamwork, and time-boxed problem solving.",
          "The report keeps the competition visible for future teams that want to prepare earlier and document outcomes clearly."
        ]
      },
      {
        title: "Preparation notes",
        list: [
          "Document team names, practice resources, and result summaries when they are ready.",
          "Share official photos, posters, and participation highlights for future teams.",
          "Keep preparation lessons visible so new participants can start earlier."
        ]
      }
    ],
    info: [["Organized by", "IEEE NUCES PWR Student Branch"], ["Archive status", "Ready for branch updates"]],
    gallery: ["assets/events/generated/ieee-xtreme-oct2024.webp"]
  }
};

const staticRoutes = {
  "/": {
    title: "IEEE NUCES PWR Student Branch",
    description: "IEEE NUCES PWR Student Branch at FAST NUCES Peshawar. Events, technical training, leadership, and student-led engineering community.",
    render: renderHome
  },
  "/about": {
    title: "About | IEEE NUCES PWR",
    description: "Learn about IEEE NUCES PWR Student Branch, its mission, operating model, and working teams.",
    render: renderAbout
  },
  "/leadership": {
    title: "Leadership | IEEE NUCES PWR",
    description: "Meet the faculty advisor and executive body of IEEE NUCES PWR Student Branch.",
    render: renderLeadership
  },
  "/members": {
    title: "Members | IEEE NUCES PWR",
    description: "View the visible IEEE NUCES PWR society member directory, executive body, faculty advisor, and working team lanes.",
    render: renderMembersPage
  },
  "/events": {
    title: "Events | IEEE NUCES PWR",
    description: "Browse IEEE NUCES PWR Student Branch events, workshops, competitions, and reports.",
    render: renderEventsPage
  },
  "/courses": {
    title: "Courses | IEEE NUCES PWR",
    description: "Explore IEEE NUCES PWR learning tracks for web development, machine learning, robotics, embedded systems, mobile development, and leadership.",
    render: renderCoursesPage
  },
  "/contact": {
    title: "Contact | IEEE NUCES PWR",
    description: "Contact IEEE NUCES PWR Student Branch for membership, collaborations, events, website corrections, and authorized web team access.",
    render: renderContact
  },
  "/privacy": {
    title: "Privacy | IEEE NUCES PWR",
    description: "Privacy policy for the IEEE NUCES PWR Student Branch website.",
    render: renderPrivacy
  },
  "/terms": {
    title: "Terms | IEEE NUCES PWR",
    description: "Terms for using the IEEE NUCES PWR Student Branch website.",
    render: renderTerms
  }
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function externalLinkAttributes(url) {
  return /^(https?:)/i.test(url) ? " target=\"_blank\" rel=\"noreferrer\"" : "";
}

function assetUrl(url) {
  if (!url || /^(https?:|data:|mailto:|tel:|\/)/i.test(url)) return url;
  return "/" + url;
}

function linkList(links = []) {
  if (!links.length) return "";
  const items = links.map((link) => {
    const url = escapeAttribute(link.url);
    return "<a href=\"" + url + "\"" + externalLinkAttributes(link.url) + ">" + escapeHtml(link.label) + "</a>";
  }).join("");
  return "<div class=\"link-row\">" + items + "</div>";
}

function limitItems(items, target) {
  const count = Number(target?.dataset.previewCount || 0);
  return count > 0 ? items.slice(0, count) : items;
}

function normalizePath(pathname) {
  let path = pathname || "/";
  path = path.replace(/\/+/g, "/");
  if (path.length > 1) path = path.replace(/\/$/, "");
  if (legacyRoutes[path]) return legacyRoutes[path];

  const legacyEvent = path.match(/^\/events-details\/([^/]+)\.html$/);
  if (legacyEvent) return "/events/" + legacyEvent[1];

  const legacyEventNoExt = path.match(/^\/events-details\/([^/]+)$/);
  if (legacyEventNoExt) return "/events/" + legacyEventNoExt[1];

  return path || "/";
}

function eventSlug(event) {
  if (event.slug) return event.slug;
  const source = String(event.href || event.title || "event");
  const fileName = source.split("/").pop().replace(/\.html$/, "");
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function eventHref(event) {
  return "/events/" + eventSlug(event);
}

function findEventBySlug(slug) {
  return (siteData.events || []).find((event) => eventSlug(event) === slug);
}

function isGeneratedImagePath(path) {
  const normalized = String(path || "")
    .replace(window.location.origin, "")
    .replace(/^\/+/, "");
  return normalized.startsWith("assets/generated/") || normalized.startsWith("assets/events/generated/");
}

function imageCoverFrame(image) {
  const parent = image.parentElement;
  if (!parent) return null;

  if (image.classList.contains("hero-media")) return null;
  if (parent.classList.contains("page-hero")) return null;
  if (parent.matches(".event-feature-media, .event-row-media")) return null;

  if (
    parent.matches(".gallery-item, .lightbox-content") ||
    parent.children.length === 1
  ) {
    return parent;
  }

  const wrapper = document.createElement("span");
  wrapper.className = "cover-image-inline-frame";
  parent.insertBefore(wrapper, image);
  wrapper.append(image);
  return wrapper;
}

function setCoverImageLabel(frame, isVisible) {
  if (!frame) return;

  frame.classList.toggle("cover-image-frame", isVisible);

  let label = bySelector(":scope > .cover-image-label", frame);
  if (!isVisible) {
    label?.remove();
    return;
  }

  if (!label) {
    label = document.createElement("span");
    label.className = "cover-image-label";
    label.setAttribute("aria-hidden", "true");
    frame.append(label);
  }

  label.textContent = coverImageLabel;
}

function decorateGeneratedImages() {
  allBySelector("img").forEach((image) => {
    if (image.dataset.coverImageDecorated === "true") return;
    if (!isGeneratedImagePath(image.getAttribute("src"))) return;

    const frame = imageCoverFrame(image);
    setCoverImageLabel(frame, true);
    image.dataset.coverImageDecorated = "true";
  });
}

function canHandleRoute(path) {
  const normalized = normalizePath(path);
  if (staticRoutes[normalized]) return true;
  const eventMatch = normalized.match(/^\/events\/([a-z0-9-]+)$/);
  return Boolean(eventMatch && findEventBySlug(eventMatch[1]));
}

async function loadSiteData() {
  try {
    const response = await fetch("/data/site-data.json");
    if (!response.ok) throw new Error("Content data request failed with " + response.status);
    siteData = await response.json();
  } catch (error) {
    if (!Object.keys(siteData).length) {
      console.error("Unable to load CMS content data.", error);
      siteData = { faculty: null, leaders: [], teams: [], events: [], courses: [] };
    }
  }
}

function pageHero(kicker, title, copy, image, alt) {
  return [
    "<section class=\"page-hero\">",
    "<img src=\"" + escapeAttribute(assetUrl(image)) + "\" alt=\"" + escapeAttribute(alt) + "\" width=\"1400\" height=\"720\">",
    "<div class=\"page-hero-shade\"></div>",
    "<div class=\"signal-field page-signal\" aria-hidden=\"true\"><span></span><span></span><span></span></div>",
    "<div class=\"container page-hero-content\">",
    "<p class=\"section-kicker\">" + escapeHtml(kicker) + "</p>",
    "<h1>" + escapeHtml(title) + "</h1>",
    "<p>" + escapeHtml(copy) + "</p>",
    "</div>",
    "</section>"
  ].join("");
}

function renderHome() {
  return [
    "<section class=\"hero\" aria-labelledby=\"hero-title\">",
    "<img class=\"hero-media\" src=\"/assets/generated/hero-home.webp\" alt=\"Generated engineering lab visual for IEEE NUCES PWR Student Branch\">",
    "<div class=\"hero-shade\"></div>",
    "<div class=\"signal-field\" aria-hidden=\"true\"><span></span><span></span><span></span><span></span></div>",
    "<div class=\"container hero-content\">",
    "<p class=\"section-kicker\">FAST NUCES Peshawar student branch</p>",
    "<h1 id=\"hero-title\"><span>IEEE</span> NUCES PWR Student Branch</h1>",
    "<p class=\"hero-copy\">A student-led engineering community that turns technical curiosity into workshops, competitions, research conversations, and service for the campus.</p>",
    "<div class=\"hero-actions\" aria-label=\"Primary actions\">",
    "<a class=\"button button-primary\" href=\"/events\">Explore events</a>",
    "<a class=\"button button-secondary\" href=\"/contact\">Join the branch</a>",
    "</div>",
    "</div>",
    "<div class=\"container hero-ledger\" aria-label=\"Branch snapshot\">",
    "<div><small>records</small><strong>11</strong><span>documented events</span></div>",
    "<div><small>teams</small><strong>9</strong><span>operating groups</span></div>",
    "<div><small>term</small><strong>2025-26</strong><span>executive body</span></div>",
    "<div><small>network</small><strong>IEEE</strong><span>global student branch</span></div>",
    "</div>",
    "</section>",
    "<section class=\"section mission\">",
    "<div class=\"container mission-grid\">",
    "<div class=\"signal-card\"><span>01</span><p class=\"section-kicker\">Branch signal</p><h2>A student branch that documents its work and keeps members connected.</h2></div>",
    "<div class=\"mission-copy\"><p>IEEE NUCES PWR brings together students from computing and engineering programs at FAST NUCES Peshawar. The branch runs technical sessions, member-led teams, competition preparation, and collaboration opportunities with the wider IEEE community.</p><p>Members use this space to keep event reports, leadership updates, learning tracks, and branch activity visible for students, faculty, alumni, and collaborators.</p><a class=\"text-link\" href=\"/about\">Read about the branch</a></div>",
    "</div>",
    "<div class=\"container branch-strip\" aria-label=\"IEEE operating rhythm\"><span>Plan</span><span>Run</span><span>Document</span><span>Publish</span><span>Review</span></div>",
    "</section>",
    "<section class=\"section events-section\">",
    "<div class=\"container section-heading section-heading-row\"><div><p class=\"section-kicker\">Events archive</p><h2>Recent workshops, competitions, and branch sessions.</h2></div><a class=\"button button-primary\" href=\"/events\">View all events</a></div>",
    "<div class=\"container event-feature\" id=\"event-feature\"></div>",
    "<div class=\"container events-grid events-preview\" id=\"events-grid\" data-preview-count=\"3\" aria-live=\"polite\"></div>",
    "</section>",
    "<section class=\"section courses-section\">",
    "<div class=\"container courses-layout\"><div class=\"section-heading\"><p class=\"section-kicker\">Learning tracks</p><h2>Short, practical paths for technical growth.</h2><p>These tracks give members a clear place to start, teach, or mentor.</p><a class=\"text-link\" href=\"/courses\">Browse all tracks</a></div><div class=\"course-list\" id=\"course-list\" data-preview-count=\"3\"></div></div>",
    "</section>",
  ].join("");
}

function renderAbout() {
  return [
    pageHero("About the branch", "A campus home for people who want to build, teach, and ship.", "IEEE NUCES PWR supports technical learning, collaboration, leadership, and public documentation for the FAST NUCES Peshawar student community.", "assets/generated/hero-about.webp", "Generated campus workshop visual for IEEE NUCES PWR"),
    "<section class=\"section mission\"><div class=\"container mission-grid\"><div><p class=\"section-kicker\">Mission</p><h2>Turn student curiosity into visible technical work.</h2></div><div class=\"mission-copy\"><p>The branch creates space for students to learn by organizing workshops, joining competitions, preparing sessions, and documenting outcomes that future teams can build on.</p><p>Its work is practical: speaker coordination, event execution, media coverage, web publishing, member support, and technical mentoring.</p></div></div></section>",
    "<section class=\"section operating-section\"><div class=\"container operating-grid\"><div class=\"operating-intro\"><p class=\"section-kicker\">How work moves</p><h2>A practical operating model for student contributors.</h2><p>Each team owns a visible part of the branch. That keeps responsibilities clear and makes it easier for new members to find useful work quickly.</p></div><div class=\"operating-steps\" aria-label=\"Branch operating model\"><article><span>01</span><h3>Plan the session</h3><p>Pick a clear learning outcome, speaker, venue, and promotion window.</p></article><article><span>02</span><h3>Run the event</h3><p>Coordinate registrations, media, certificates, logistics, and attendee support.</p></article><article><span>03</span><h3>Publish the record</h3><p>Add photos, outcomes, and reports so future teams can reuse the work.</p></article></div></div></section>"
  ].join("");
}

function renderLeadership() {
  return [
    pageHero("Leadership", "Faculty guidance and student ownership.", "The executive body sets direction while working teams handle operations, media, events, development, and member engagement.", "assets/generated/hero-leadership.webp", "Generated leadership planning visual for IEEE NUCES PWR"),
    "<section class=\"section leadership-section\"><div class=\"container section-heading\"><p class=\"section-kicker\">Faculty advisor</p><h2>Branch guidance starts with academic mentorship.</h2></div><div class=\"container faculty-panel\" id=\"faculty-panel\"></div></section>",
    "<section class=\"section mission\"><div class=\"container section-heading\"><p class=\"section-kicker\">Executive body 2025-26</p><h2>Student leaders responsible for branch direction.</h2></div><div class=\"container leadership-grid\" id=\"leadership-grid\" aria-live=\"polite\"></div></section>"
  ].join("");
}

function renderMembersPage() {
  return [
    pageHero("Society members", "Every verified branch member should have a visible place.", "Team members are grouped under their own operating teams so each roster stays clear and easy to scan.", "assets/generated/hero-members.webp", "Generated society members visual for IEEE NUCES PWR"),
    "<section class=\"section members-section\"><div class=\"container member-roster-panel\"><div><p class=\"section-kicker\">Team directory</p><h2>Each team has its own member section.</h2><p>Web Development members appear under Web Development, Media members appear under Media, and every other operating team keeps its own roster.</p></div><div class=\"member-roster-stats\" aria-label=\"Roster totals\"><span><strong data-member-count>--</strong> named members</span><span><strong data-lane-count>--</strong> team sections</span></div></div></section>",
    "<section class=\"section member-lanes-section\"><div class=\"container section-heading\"><p class=\"section-kicker\">Team sections</p><h2>Members grouped by the team they work with.</h2><p>Each section shows one team lead and that team&apos;s members only. General Body is listed below the teams as a separate roster.</p></div><div class=\"container member-lane-grid\" id=\"member-team-lanes\" aria-live=\"polite\"></div><div class=\"container member-general-body\" id=\"member-general-body\" aria-live=\"polite\"></div></section>"
  ].join("");
}

function renderEventsPage() {
  return [
    pageHero("Events archive", "Workshops, competitions, and branch sessions.", "Browse documented IEEE NUCES PWR activities and event reports from 2023 onward.", "assets/generated/hero-events.webp", "Generated event archive visual for IEEE NUCES PWR"),
    "<section class=\"section events-section\"><div class=\"container section-heading section-heading-row\"><div><p class=\"section-kicker\">Archive</p><h2>Event records from workshops, competitions, and branch sessions.</h2></div><div class=\"filter-group\" aria-label=\"Filter events\"><button type=\"button\" class=\"filter-button is-active\" data-event-filter=\"all\">All</button><button type=\"button\" class=\"filter-button\" data-event-filter=\"2024\">2024</button><button type=\"button\" class=\"filter-button\" data-event-filter=\"2023\">2023</button></div></div><div class=\"container event-feature\" id=\"event-feature\"></div><div class=\"container events-grid\" id=\"events-grid\" aria-live=\"polite\"></div></section>"
  ].join("");
}

function renderCoursesPage() {
  return [
    pageHero("Learning tracks", "Short, practical paths for technical growth.", "These tracks help students start, teach, mentor, and build practical technical confidence.", "assets/generated/hero-courses.webp", "Generated technical learning visual for IEEE NUCES PWR"),
    "<section class=\"section courses-section\"><div class=\"container courses-layout\"><div class=\"section-heading\"><p class=\"section-kicker\">Tracks</p><h2>Use these tracks to plan workshops and mentoring circles.</h2><p>Members can use this page to plan sessions, share learning material, and connect each track with practical projects.</p></div><div class=\"course-list\" id=\"course-list\"></div></div></section>"
  ].join("");
}

function renderContact() {
  return [
    pageHero("Join the branch", "Bring a skill, a question, or a project idea.", "Reach out for membership, collaborations, event proposals, website corrections, or authorized web team access.", "assets/generated/hero-contact.webp", "Generated membership contact visual for IEEE NUCES PWR"),
    "<section class=\"section join-section\"><div class=\"container join-grid\"><div><p class=\"section-kicker\">Contact</p><h2>Use one clear channel and we will direct the request.</h2><p>Send membership questions, event ideas, collaboration requests, website correction notes, and authorized web team access questions to the branch inbox.</p><div class=\"contact-lines\"><a href=\"mailto:info@ieeenucespwr.org\">info@ieeenucespwr.org</a><a href=\"https://www.ieee.org/membership/\" target=\"_blank\" rel=\"noreferrer\">IEEE membership</a><a href=\"https://ieeexplore.ieee.org/\" target=\"_blank\" rel=\"noreferrer\">IEEE Xplore</a></div></div><form class=\"contact-form\" data-contact-form novalidate><label>Name<input name=\"name\" type=\"text\" autocomplete=\"name\" required></label><label>Email<input name=\"email\" type=\"email\" autocomplete=\"email\" required></label><label>Message<textarea name=\"message\" rows=\"5\" required></textarea></label><p class=\"form-status\" data-form-status role=\"status\"></p><button class=\"button button-primary\" type=\"submit\">Draft email</button></form></div></section>"
  ].join("");
}

function renderPrivacy() {
  return "<article class=\"container legal-page\"><p class=\"section-kicker\">Website policy</p><h1>Privacy</h1><p>This website is a public information site for IEEE NUCES PWR Student Branch. It does not use account tracking, advertising pixels, or analytics scripts by default.</p><h2>Information you send</h2><p>If you contact the branch by email, the information you include is handled by the branch team for membership, collaboration, event, or website correction follow-up.</p><h2>External links</h2><p>The site links to IEEE resources and event material. External websites follow their own privacy policies.</p><h2>Media</h2><p>Event photos and branch media are published to document student activities. If a published image needs review, contact the branch team at info@ieeenucespwr.org.</p><div class=\"legal-actions\"><a class=\"button button-primary\" href=\"/\">Back to home</a></div></article>";
}

function renderTerms() {
  return "<article class=\"container legal-page\"><p class=\"section-kicker\">Website policy</p><h1>Terms</h1><p>This website is maintained for public IEEE NUCES PWR branch information. Content should be accurate, respectful, and relevant to IEEE NUCES PWR activities.</p><h2>Use of content</h2><p>IEEE names, logos, and marks remain subject to IEEE brand and trademark rules. Event photos, summaries, and branch material should be used respectfully and with proper context.</p><h2>Website maintenance</h2><p>The website source code may be public for viewing and reuse, but edits, commits, CMS access, reviews, and deployments are limited to authorized IEEE NUCES PWR Web Development or Technical Team members. Access is granted by the launch team.</p><h2>Corrections</h2><p>For corrections to event records, names, photos, or links, contact info@ieeenucespwr.org.</p><div class=\"legal-actions\"><a class=\"button button-primary\" href=\"/\">Back to home</a></div></article>";
}

function renderNotFound(path) {
  return "<section class=\"not-found\"><div class=\"container\"><p class=\"section-kicker\">404</p><h1>Page not found</h1><p>The address <code>" + escapeHtml(path) + "</code> does not match a published page on the IEEE NUCES PWR website.</p><div class=\"hero-actions\"><a class=\"button button-primary\" href=\"/\">Back to home</a><a class=\"button button-secondary\" href=\"/events\">Browse events</a></div></div></section>";
}

function genericEventReport(event) {
  return {
    subtitle: event.summary,
    accent: eventSlug(event),
    stats: [event.date, event.type, "IEEE NUCES PWR", "Branch event record"],
    sections: [
      {
        title: "Event overview",
        paragraphs: [event.summary, "This report keeps the activity visible for students, faculty, alumni, and future branch teams. Photos, outcomes, speaker notes, and resources can be added when verified details are available."]
      },
      {
        title: "Record notes",
        list: [
          "Keep the event title, date, and activity type accurate.",
          "Add supporting photos, outcomes, and resources after branch review.",
          "Use the report to help future teams plan related sessions."
        ]
      }
    ],
    info: [["Archive status", "Ready for branch updates"], ["Maintained by", "IEEE NUCES PWR Student Branch"]],
    gallery: event.image && !event.image.includes("placeholder") ? [event.image] : []
  };
}

function renderEventDetail(event, slug) {
  const report = eventReports[slug] || genericEventReport(event);
  const stats = (report.stats || []).map((item) => "<span>" + escapeHtml(item) + "</span>").join("");
  const sections = (report.sections || []).map((section) => {
    const paragraphs = (section.paragraphs || []).map((paragraph) => "<p>" + escapeHtml(paragraph) + "</p>").join("");
    const list = section.list ? "<ul>" + section.list.map((item) => "<li>" + escapeHtml(item) + "</li>").join("") + "</ul>" : "";
    return "<section><h2>" + escapeHtml(section.title) + "</h2>" + paragraphs + list + "</section>";
  }).join("");
  const info = (report.info || []).map((item) => "<p><strong>" + escapeHtml(item[0]) + ":</strong> " + escapeHtml(item[1]) + "</p>").join("");
  const gallery = renderGallery(report.gallery || [], event.title);

  return [
    "<nav class=\"breadcrumb\" aria-label=\"Breadcrumb\"><div class=\"container breadcrumb-nav\"><a href=\"/\">Home</a><span>/</span><a href=\"/events\">Events</a><span>/</span><span>" + escapeHtml(event.title) + "</span></div></nav>",
    "<header class=\"event-report-hero\"><div class=\"container\"><p class=\"section-kicker\">Event report</p><h1>" + escapeHtml(event.title) + "</h1><p>" + escapeHtml(report.subtitle || event.summary) + "</p><div class=\"event-meta-header\">" + stats + "</div></div></header>",
    "<section class=\"section event-report-section\"><div class=\"container event-report-grid\"><article class=\"event-content\">" + sections + "<div class=\"info-box\"><h3>Event details</h3>" + info + "</div></article><aside class=\"event-report-aside\"><img src=\"" + escapeAttribute(assetUrl(event.image || "assets/placeholder.webp")) + "\" alt=\"" + escapeAttribute(event.title) + "\" loading=\"lazy\"><a class=\"button button-primary\" href=\"/events\">Back to events</a></aside></div>" + gallery + "</section>"
  ].join("");
}

function renderGallery(images, title) {
  lightboxImages = images;
  if (!images.length) return "";
  const items = images.map((image, index) => {
    return "<button class=\"gallery-item\" type=\"button\" data-lightbox-index=\"" + index + "\"><img src=\"" + escapeAttribute(assetUrl(image)) + "\" alt=\"" + escapeAttribute(title + " photo " + (index + 1)) + "\" loading=\"lazy\"></button>";
  }).join("");
  return "<section class=\"container photo-gallery\"><h2>Event gallery</h2><div class=\"gallery-grid\">" + items + "</div></section><div class=\"lightbox\" id=\"lightbox\" aria-hidden=\"true\"><button class=\"lightbox-close\" type=\"button\" data-lightbox-close aria-label=\"Close gallery\">&times;</button><button class=\"lightbox-nav lightbox-prev\" type=\"button\" data-lightbox-prev aria-label=\"Previous photo\">&#10094;</button><div class=\"lightbox-content\"><img id=\"lightbox-img\" alt=\"Event photo\"></div><button class=\"lightbox-nav lightbox-next\" type=\"button\" data-lightbox-next aria-label=\"Next photo\">&#10095;</button></div>";
}

function eventMeta(event) {
  return "<div class=\"event-meta\"><span>" + escapeHtml(event.date) + "</span><span>" + escapeHtml(event.type) + "</span></div>";
}

function renderFaculty() {
  const target = bySelector("#faculty-panel");
  if (!target || !siteData.faculty) return;

  const faculty = siteData.faculty;
  target.innerHTML = [
    "<div class=\"faculty-photo\"><img src=\"" + escapeAttribute(assetUrl(faculty.image)) + "\" alt=\"" + escapeAttribute(faculty.name) + "\" loading=\"lazy\" width=\"768\" height=\"768\"></div>",
    "<div class=\"faculty-body\">",
    "<p class=\"role\">" + escapeHtml(faculty.role) + "</p>",
    "<h3>" + escapeHtml(faculty.name) + "</h3>",
    "<p>" + escapeHtml(faculty.detail) + "</p>",
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
      "<div class=\"leader-photo\"><img src=\"" + escapeAttribute(assetUrl(leader.image)) + "\" alt=\"" + escapeAttribute(leader.name) + "\" loading=\"lazy\" width=\"768\" height=\"768\"></div>",
      "<div class=\"leader-card-body\">",
      "<p class=\"role\">" + escapeHtml(leader.role) + "</p>",
      "<h3>" + escapeHtml(leader.name) + "</h3>",
      "<p>" + escapeHtml(leader.department) + "</p>",
      "<p>" + escapeHtml(leader.summary) + "</p>",
      linkList(leader.links),
      "</div>",
      "</article>"
    ].join("");
  }).join("");
}

function renderEvents() {
  const feature = bySelector("#event-feature");
  const grid = bySelector("#events-grid");
  if (!feature || !grid || !siteData.events?.length) return;

  const [primary, ...events] = siteData.events;
  feature.innerHTML = [
    "<div class=\"event-feature-media\">",
    "<img src=\"" + escapeAttribute(assetUrl(primary.image)) + "\" alt=\"" + escapeAttribute(primary.title) + "\" loading=\"lazy\" width=\"720\" height=\"540\">",
    "</div>",
    "<div class=\"event-feature-body\">",
    eventMeta(primary),
    "<h3>" + escapeHtml(primary.title) + "</h3>",
    "<p>" + escapeHtml(primary.summary) + "</p>",
    "<a class=\"button button-primary\" href=\"" + eventHref(primary) + "\">Read event report</a>",
    "</div>"
  ].join("");

  grid.innerHTML = limitItems(events, grid).map((event) => {
    return [
      "<article class=\"event-row\" data-event-year=\"" + escapeAttribute(event.year) + "\">",
      "<a class=\"event-row-media\" href=\"" + eventHref(event) + "\" aria-label=\"Read " + escapeAttribute(event.title) + " event report\">",
      "<img src=\"" + escapeAttribute(assetUrl(event.image)) + "\" alt=\"" + escapeAttribute(event.title) + "\" loading=\"lazy\" width=\"640\" height=\"360\">",
      "</a>",
      "<div class=\"event-row-body\">",
      "<div class=\"event-row-copy\">",
      eventMeta(event),
      "<h3><a href=\"" + eventHref(event) + "\">" + escapeHtml(event.title) + "</a></h3>",
      "<p>" + escapeHtml(event.summary) + "</p>",
      "</div>",
      "<a class=\"text-link event-row-link\" href=\"" + eventHref(event) + "\">Read report</a>",
      "</div>",
      "</article>"
    ].join("");
  }).join("");
}

function collectSocietyMembers() {
  const records = [];
  const seen = new Set();
  const add = (member, defaults = {}) => {
    if (!member?.name) return;
    const record = { ...defaults, ...member };
    const key = (record.name + "|" + (record.role || "")).toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    records.push(record);
  };

  if (siteData.faculty) {
    add(siteData.faculty, {
      group: "Faculty Advisor",
      department: "FAST NUCES Peshawar",
      summary: siteData.faculty.detail
    });
  }

  (siteData.leaders || []).forEach((leader) => add(leader, { group: "Executive Body" }));
  (siteData.teams || []).forEach((team) => {
    (team.members || []).forEach((member) => add(member, {
      group: team.name,
      role: member.role || team.name + " Member",
      summary: member.summary || team.focus
    }));
  });
  (siteData.members || []).forEach((member) => add(member, { group: "Society Member" }));

  return records;
}

function memberTeamGroups() {
  return (siteData.teams || []).map((team, index) => {
    return {
      type: "team",
      number: String(index + 1).padStart(2, "0"),
      name: team.name,
      focus: team.focus,
      image: team.image,
      members: team.members || []
    };
  });
}

function memberGeneralBodyGroups() {
  const groups = new Map();
  (siteData.members || []).forEach((member) => {
    if (!member?.name) return;
    const groupName = member.group || "General Body";
    if (!groups.has(groupName)) groups.set(groupName, []);
    groups.get(groupName).push(member);
  });

  return [...groups].map(([name, members], index) => {
    return {
      type: "general",
      number: String(index + 1).padStart(2, "0"),
      name,
      focus: name === "General Body" ? "Society members listed outside operating teams" : "Additional verified society members",
      members
    };
  });
}

function renderGroupedMember(member, groupName) {
  const image = member.image || "assets/placeholder.webp";
  const role = member.role || groupName + " Member";
  return [
    "<article class=\"member-team-person\">",
    "<img src=\"" + escapeAttribute(assetUrl(image)) + "\" alt=\"" + escapeAttribute(member.name) + "\" loading=\"lazy\" width=\"180\" height=\"180\">",
    "<div>",
    "<h4>" + escapeHtml(member.name) + "</h4>",
    "<p>" + escapeHtml(role) + "</p>",
    "</div>",
    "</article>"
  ].join("");
}

function renderMemberGroup(group) {
  const namedMembers = (group.members || []).filter((member) => member?.name && member.name.toLowerCase() !== "to be announced");
  const lead = namedMembers.find((member) => /lead/i.test(member.role || ""));
  const rosterMembers = lead ? namedMembers.filter((member) => member !== lead) : namedMembers;
  const image = lead?.image || group.image || "assets/placeholder.webp";
  const imageAlt = lead ? group.name + " lead" : group.name + " roster";
  const countLabel = namedMembers.length === 1 ? "1 member" : namedMembers.length + " members";
  const titleId = "member-team-title-" + group.number;
  const leadLine = lead ? "<p class=\"member-team-lead\">" + escapeHtml(lead.name) + "</p>" : "";
  const emptyText = namedMembers.length
    ? "No additional members were published for this team in the previous website source."
    : "No named members were published for this team in the previous website source.";

  return [
    "<section class=\"member-team-card" + (group.type === "additional" ? " member-team-card-secondary" : "") + "\" aria-labelledby=\"" + escapeAttribute(titleId) + "\">",
    "<div class=\"member-team-head\">",
    "<img src=\"" + escapeAttribute(assetUrl(image)) + "\" alt=\"" + escapeAttribute(imageAlt) + "\" loading=\"lazy\" width=\"240\" height=\"240\">",
    "<div>",
    "<span>" + escapeHtml(group.number) + "</span>",
    "<h3 id=\"" + escapeAttribute(titleId) + "\">" + escapeHtml(group.name) + "</h3>",
    leadLine,
    "<p class=\"member-team-focus\">" + escapeHtml(group.focus || "IEEE NUCES PWR society group") + "</p>",
    "<strong>" + escapeHtml(countLabel) + "</strong>",
    "</div>",
    "</div>",
    rosterMembers.length
      ? "<div class=\"member-team-people\">" + rosterMembers.map((member) => renderGroupedMember(member, group.name)).join("") + "</div>"
      : "<p class=\"member-team-empty\">" + escapeHtml(emptyText) + "</p>",
    "</section>"
  ].join("");
}


function renderGeneralBodyGroup(group, index) {
  const namedMembers = (group.members || []).filter((member) => member?.name && member.name.toLowerCase() !== "to be announced");
  const countLabel = namedMembers.length === 1 ? "1 member" : namedMembers.length + " members";
  const titleId = "member-general-title-" + String(index + 1);

  return [
    "<section class=\"member-general-card\" aria-labelledby=\"" + escapeAttribute(titleId) + "\">",
    "<div class=\"member-general-head\">",
    "<div>",
    "<h3 id=\"" + escapeAttribute(titleId) + "\">" + escapeHtml(group.name) + "</h3>",
    "<p>" + escapeHtml(group.focus) + "</p>",
    "</div>",
    "<strong>" + escapeHtml(countLabel) + "</strong>",
    "</div>",
    namedMembers.length
      ? "<div class=\"member-team-people\">" + namedMembers.map((member) => renderGroupedMember(member, group.name)).join("") + "</div>"
      : "<p class=\"member-team-empty\">No general body members were published in the previous website source.</p>",
    "</section>"
  ].join("");
}

function renderMembers() {
  const lanes = bySelector("#member-team-lanes");
  const generalBody = bySelector("#member-general-body");
  const teamGroups = memberTeamGroups();
  const generalGroups = memberGeneralBodyGroups();
  const countNamedMembers = (groups) => groups.reduce((total, group) => {
    const namedMembers = (group.members || []).filter((member) => member?.name && member.name.toLowerCase() !== "to be announced");
    return total + namedMembers.length;
  }, 0);
  const memberTotal = countNamedMembers(teamGroups) + countNamedMembers(generalGroups);

  const memberCount = bySelector("[data-member-count]");
  const laneCount = bySelector("[data-lane-count]");
  if (memberCount) memberCount.textContent = String(memberTotal).padStart(2, "0");
  if (laneCount) laneCount.textContent = String(teamGroups.length).padStart(2, "0");

  if (lanes) {
    lanes.innerHTML = teamGroups.map(renderMemberGroup).join("");
  }

  if (generalBody) {
    generalBody.innerHTML = generalGroups.map(renderGeneralBodyGroup).join("");
  }
}

function renderCourses() {
  const target = bySelector("#course-list");
  if (!target || !siteData.courses) return;

  target.innerHTML = limitItems(siteData.courses, target).map((course) => {
    return [
      "<article class=\"course-card\">",
      "<img src=\"" + escapeAttribute(assetUrl(course.image)) + "\" alt=\"" + escapeAttribute(course.title) + "\" loading=\"lazy\" width=\"360\" height=\"300\">",
      "<div>",
      "<h3>" + escapeHtml(course.title) + "</h3>",
      "<p>" + escapeHtml(course.summary) + "</p>",
      "</div>",
      "</article>"
    ].join("");
  }).join("");
}

function resolveRoute(path) {
  const normalized = normalizePath(path);
  const staticRoute = staticRoutes[normalized];
  if (staticRoute) {
    return {
      path: normalized,
      canonicalPath: normalized,
      title: staticRoute.title,
      description: staticRoute.description,
      html: staticRoute.render(),
      noindex: false
    };
  }

  const eventMatch = normalized.match(/^\/events\/([a-z0-9-]+)$/);
  if (eventMatch) {
    const slug = eventMatch[1];
    const event = findEventBySlug(slug);
    if (event) {
      return {
        path: "/events/" + slug,
        canonicalPath: "/events/" + slug,
        title: event.title + " | IEEE NUCES PWR",
        description: event.summary,
        html: renderEventDetail(event, slug),
        noindex: false,
        eventSlug: slug
      };
    }
  }

  return {
    path: normalized,
    canonicalPath: normalized,
    title: "Page not found | IEEE NUCES PWR",
    description: "The requested page is not available on the IEEE NUCES PWR website.",
    html: renderNotFound(normalized),
    noindex: true
  };
}

function updateDocumentMeta(route) {
  document.title = route.title;
  setMeta("description", route.description);
  setProperty("og:title", route.title);
  setProperty("og:description", route.description);
  setProperty("og:url", siteOrigin + (route.canonicalPath === "/" ? "/" : route.canonicalPath));
  setProperty("og:image", siteOrigin + "/assets/ieee-nuces-peshawar-campus-logo.png");
  setCanonical(siteOrigin + (route.canonicalPath === "/" ? "/" : route.canonicalPath));

  const robots = bySelector('meta[name="robots"]');
  if (route.noindex) {
    setMeta("robots", "noindex");
  } else if (robots) {
    robots.remove();
  }
}

function setMeta(name, content) {
  let tag = bySelector('meta[name="' + name + '"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.append(tag);
  }
  tag.setAttribute("content", content);
}

function setProperty(property, content) {
  let tag = bySelector('meta[property="' + property + '"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.append(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let tag = bySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.append(tag);
  }
  tag.setAttribute("href", href);
}

function updateActiveNavigation(path) {
  allBySelector(".nav-menu a").forEach((link) => {
    const linkPath = normalizePath(new URL(link.getAttribute("href"), window.location.origin).pathname);
    const isActive = linkPath === path || (linkPath === "/events" && path.startsWith("/events/"));
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function renderRoute(path, options = {}) {
  const root = bySelector("[data-app-root]");
  if (!root) return;

  const route = resolveRoute(path);
  currentRoutePath = route.path;
  root.classList.remove("route-is-ready");
  root.innerHTML = route.html;
  document.body.dataset.route = route.eventSlug ? "event-detail" : route.path.replace(/^\//, "") || "home";
  if (route.eventSlug) document.body.dataset.eventAccent = route.eventSlug;
  else document.body.removeAttribute("data-event-accent");

  updateDocumentMeta(route);
  updateActiveNavigation(route.path);
  hydrateRoute();
  requestAnimationFrame(() => root.classList.add("route-is-ready"));

  const browserPath = window.location.pathname.replace(/\/$/, "") || "/";
  if (options.replace && browserPath !== route.canonicalPath && !route.noindex) {
    history.replaceState({ path: route.canonicalPath }, "", route.canonicalPath);
  }

  if (options.scroll !== false) window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
  if (options.focus) root.focus({ preventScroll: true });
}

function hydrateRoute() {
  renderFaculty();
  renderLeaders();
  renderMembers();
  renderEvents();
  renderCourses();
  decorateGeneratedImages();
  setupMotion();
  setupPressFeedback();
  setupEventFilters();
  setupContactForm();
  setupLightbox();
  setupSpotlightCards();
  setYear();
}

function navigateTo(path) {
  const normalized = normalizePath(path);
  if (!canHandleRoute(normalized)) return false;
  if (normalized !== currentRoutePath) {
    history.pushState({ path: normalized }, "", normalized);
  }
  renderRoute(normalized, { focus: true });
  closeMenu();
  return true;
}

function closeMenu() {
  const toggle = bySelector("[data-nav-toggle]");
  const menu = bySelector("[data-nav-menu]");
  menu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  toggle?.setAttribute("aria-expanded", "false");
}

function setupNavigation() {
  const header = bySelector("[data-header]");
  const toggle = bySelector("[data-nav-toggle]");
  const menu = bySelector("[data-nav-menu]");

  window.IEEETheme?.mountToggle(menu);

  toggle?.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.target || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || /^(mailto:|tel:|https?:|#)/i.test(href)) return;

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const routePath = normalizePath(url.pathname);
    if (!canHandleRoute(routePath)) return;

    event.preventDefault();
    navigateTo(routePath);
  });

  window.addEventListener("popstate", () => {
    renderRoute(normalizePath(window.location.pathname), { scroll: false, replace: true });
    closeMenu();
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

  let progress = bySelector(".scroll-progress");
  if (!progress) {
    progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.prepend(progress);
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", progressValue + "%");

  allBySelector(".reveal-item").forEach((target) => target.classList.remove("reveal-item", "is-visible"));

  const revealTargets = allBySelector([
    ".mission-grid",
    ".section-heading",
    ".faculty-panel",
    ".leader-card",
    ".member-roster-panel",
    ".operating-steps article",
    ".event-feature",
    ".course-card",
    ".simple-card",
    ".join-grid",
    ".event-content",
    ".event-report-aside",
    ".gallery-item"
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

function setupProgressListeners() {
  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    document.documentElement.style.setProperty("--scroll-progress", progressValue + "%");
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

function setupSpotlightCards() {
  const cards = allBySelector(".leader-card, .event-row, .course-card, .simple-card, .operating-steps article, .faculty-panel, .event-feature");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", Math.round(event.clientX - rect.left) + "px");
      card.style.setProperty("--spot-y", Math.round(event.clientY - rect.top) + "px");
    });
  });
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

function setupLightbox() {
  const lightbox = bySelector("#lightbox");
  if (!lightbox || !lightboxImages.length) return;

  const image = bySelector("#lightbox-img");
  const open = (index) => {
    currentImageIndex = index;
    const src = lightboxImages[index];
    image.src = assetUrl(src);
    setCoverImageLabel(imageCoverFrame(image), isGeneratedImagePath(src));
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
  };
  const change = (direction) => {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = lightboxImages.length - 1;
    if (currentImageIndex >= lightboxImages.length) currentImageIndex = 0;
    const src = lightboxImages[currentImageIndex];
    image.src = assetUrl(src);
    setCoverImageLabel(imageCoverFrame(image), isGeneratedImagePath(src));
  };

  allBySelector("[data-lightbox-index]").forEach((button) => {
    button.addEventListener("click", () => open(Number(button.dataset.lightboxIndex)));
  });
  bySelector("[data-lightbox-close]")?.addEventListener("click", close);
  bySelector("[data-lightbox-prev]")?.addEventListener("click", () => change(-1));
  bySelector("[data-lightbox-next]")?.addEventListener("click", () => change(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") change(-1);
    if (event.key === "ArrowRight") change(1);
  });
}

function setYear() {
  allBySelector("[data-year]").forEach((target) => {
    target.textContent = new Date().getFullYear();
  });
}

window.addEventListener("pageshow", () => {
  document.documentElement.style.scrollBehavior = "smooth";
});

document.addEventListener("DOMContentLoaded", async () => {
  renderSiteShell();
  await loadSiteData();
  setupNavigation();
  setupProgressListeners();
  renderRoute(normalizePath(window.location.pathname), { scroll: false, replace: true, instant: true });
});
