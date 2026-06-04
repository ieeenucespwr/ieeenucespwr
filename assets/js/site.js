let siteData = window.IEEE_SITE_DATA || {};
let currentRoutePath = "/";
let lightboxImages = [];
let currentImageIndex = 0;

const siteOrigin = "https://pwr.ieeenuces.org";
const bySelector = (selector, parent = document) => parent.querySelector(selector);
const allBySelector = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const legacyRoutes = {
  "/index.html": "/",
  "/about.html": "/about",
  "/leadership.html": "/leadership",
  "/events.html": "/events",
  "/courses.html": "/courses",
  "/open-source.html": "/open-source",
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
      ["Contributor lane", "Content, media, and professional development"],
      ["Website record", "Maintained through the routed event archive"]
    ],
    gallery: [
      "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p1_img1.jpeg",
      "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p1_img2.jpeg",
      "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p1_img3.jpeg",
      "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p2_img1.jpeg",
      "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p2_img2.jpeg",
      "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p2_img4.jpeg"
    ]
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
    gallery: [
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image1.jpeg",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image2.png",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image3.jpeg",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image4.jpeg",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image5.jpeg",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image6.jpeg",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image7.jpeg",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image8.jpeg",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image9.png",
      "assets/events/2024/gender-equality/Sept2024_GenderEquality_image10.jpeg",
      "assets/events/2024/gender-equality/Picture_empowering_session_on_Gender_Equality_p1_img1.jpeg",
      "assets/events/2024/gender-equality/Picture_empowering_session_on_Gender_Equality_p1_img2.png"
    ]
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
          "The branch record keeps the competition visible for future teams that want to prepare earlier and document outcomes clearly."
        ]
      },
      {
        title: "Contributor notes",
        list: [
          "Add team names, practice resources, and result summaries when they are ready.",
          "Attach official photos or posters under the event assets folder.",
          "Use this route as the canonical event report instead of adding another HTML page."
        ]
      }
    ],
    info: [["Organized by", "IEEE NUCES PWR Student Branch"], ["Archive status", "Ready for contributor updates"]],
    gallery: ["assets/events/2024/Social_media_Poster_p1_img1.jpeg", "assets/events/2024/Social_media_Poster_p1_img2.png"]
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
  "/open-source": {
    title: "Open Source | IEEE NUCES PWR",
    description: "Contribute to the open-source IEEE NUCES PWR Student Branch website built by Rayyan Shaheer.",
    render: renderOpenSource
  },
  "/contact": {
    title: "Contact | IEEE NUCES PWR",
    description: "Contact IEEE NUCES PWR Student Branch for membership, collaborations, events, and website contributions.",
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
    "<img class=\"hero-media\" src=\"/assets/events/2024/gender-equality/Sept2024_GenderEquality_image4.jpeg\" alt=\"IEEE NUCES PWR students attending a campus session\">",
    "<div class=\"hero-shade\"></div>",
    "<div class=\"container hero-content\">",
    "<p class=\"section-kicker\">FAST NUCES Peshawar student branch</p>",
    "<h1 id=\"hero-title\">IEEE NUCES PWR Student Branch</h1>",
    "<p class=\"hero-copy\">A student-led engineering community that turns technical curiosity into workshops, competitions, research conversations, and service for the campus.</p>",
    "<div class=\"hero-actions\" aria-label=\"Primary actions\">",
    "<a class=\"button button-primary\" href=\"/events\">Explore events</a>",
    "<a class=\"button button-secondary\" href=\"/open-source\">Contribute to the website</a>",
    "</div>",
    "</div>",
    "<div class=\"container hero-ledger\" aria-label=\"Branch snapshot\">",
    "<div><strong>11</strong><span>documented events</span></div>",
    "<div><strong>9</strong><span>operating teams</span></div>",
    "<div><strong>2025-26</strong><span>current executive body</span></div>",
    "<div><strong>IEEE</strong><span>global student network</span></div>",
    "</div>",
    "</section>",
    "<section class=\"section mission\">",
    "<div class=\"container mission-grid\">",
    "<div><p class=\"section-kicker\">Routed branch website</p><h2>One public app for the branch, built for students to maintain.</h2></div>",
    "<div class=\"mission-copy\"><p>IEEE NUCES PWR brings together students from computing and engineering programs at FAST NUCES Peshawar. The branch runs technical sessions, member-led teams, competition preparation, and collaboration opportunities with the wider IEEE community.</p><p>The website now runs from a single application shell with route-based views, shared data, and reusable rendering logic. Contributors update content without copying entire HTML pages.</p><a class=\"text-link\" href=\"/about\">Read about the branch</a></div>",
    "</div>",
    "</section>",
    "<section class=\"section leadership-section\">",
    "<div class=\"container section-heading section-heading-row\"><div><p class=\"section-kicker\">Leadership</p><h2>Faculty guidance and student ownership.</h2></div><a class=\"button button-primary\" href=\"/leadership\">Meet the team</a></div>",
    "<div class=\"container faculty-panel\" id=\"faculty-panel\"></div>",
    "<div class=\"container leadership-grid leadership-preview\" id=\"leadership-grid\" aria-live=\"polite\"></div>",
    "</section>",
    "<section class=\"section events-section\">",
    "<div class=\"container section-heading section-heading-row\"><div><p class=\"section-kicker\">Events archive</p><h2>Recent workshops, competitions, and branch sessions.</h2></div><a class=\"button button-primary\" href=\"/events\">View all events</a></div>",
    "<div class=\"container event-feature\" id=\"event-feature\"></div>",
    "<div class=\"container events-grid events-preview\" id=\"events-grid\" data-preview-count=\"3\" aria-live=\"polite\"></div>",
    "</section>",
    "<section class=\"section courses-section\">",
    "<div class=\"container courses-layout\"><div class=\"section-heading\"><p class=\"section-kicker\">Learning tracks</p><h2>Short, practical paths for technical growth.</h2><p>These tracks give contributors a clear place to start, teach, or mentor.</p><a class=\"text-link\" href=\"/courses\">Browse all tracks</a></div><div class=\"course-list\" id=\"course-list\" data-preview-count=\"3\"></div></div>",
    "</section>",
    "<section class=\"section cta-band\">",
    "<div class=\"container cta-grid\"><div><p class=\"section-kicker\">Open source</p><h2>Contributors can improve the website without chasing duplicate repos.</h2></div><div><p>The project keeps source code, event data, routed public views, and deployment settings in one repository.</p><a class=\"button button-primary\" href=\"/open-source\">See contribution paths</a></div></div>",
    "</section>"
  ].join("");
}

function renderAbout() {
  return [
    pageHero("About the branch", "A campus home for people who want to build, teach, and ship.", "IEEE NUCES PWR supports technical learning, collaboration, leadership, and public documentation for the FAST NUCES Peshawar student community.", "assets/events/2024/gender-equality/Sept2024_GenderEquality_image4.jpeg", "IEEE NUCES PWR branch activity"),
    "<section class=\"section mission\"><div class=\"container mission-grid\"><div><p class=\"section-kicker\">Mission</p><h2>Turn student curiosity into visible technical work.</h2></div><div class=\"mission-copy\"><p>The branch creates space for students to learn by organizing workshops, joining competitions, preparing sessions, and documenting outcomes that future teams can build on.</p><p>Its work is practical: speaker coordination, event execution, media coverage, web publishing, member support, and technical mentoring.</p></div></div></section>",
    "<section class=\"section operating-section\"><div class=\"container operating-grid\"><div class=\"operating-intro\"><p class=\"section-kicker\">How work moves</p><h2>A practical operating model for student contributors.</h2><p>Each team owns a visible part of the branch. That keeps responsibilities clear and makes it easier for new members to find useful work quickly.</p></div><div class=\"operating-steps\" aria-label=\"Branch operating model\"><article><span>01</span><h3>Plan the session</h3><p>Pick a clear learning outcome, speaker, venue, and promotion window.</p></article><article><span>02</span><h3>Run the event</h3><p>Coordinate registrations, media, certificates, logistics, and attendee support.</p></article><article><span>03</span><h3>Publish the record</h3><p>Add photos, outcomes, and reports so future teams can reuse the work.</p></article></div></div><div class=\"container team-grid\" id=\"team-rail\" aria-label=\"Working teams\"></div></section>"
  ].join("");
}

function renderLeadership() {
  return [
    pageHero("Leadership", "Faculty guidance and student ownership.", "The executive body sets direction while working teams handle operations, media, events, development, and member engagement.", "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p2_img1.jpeg", "IEEE NUCES PWR branch activity"),
    "<section class=\"section leadership-section\"><div class=\"container section-heading\"><p class=\"section-kicker\">Faculty advisor</p><h2>Branch guidance starts with academic mentorship.</h2></div><div class=\"container faculty-panel\" id=\"faculty-panel\"></div></section>",
    "<section class=\"section mission\"><div class=\"container section-heading\"><p class=\"section-kicker\">Executive body 2025-26</p><h2>Student leaders responsible for branch direction.</h2></div><div class=\"container leadership-grid\" id=\"leadership-grid\" aria-live=\"polite\"></div></section>"
  ].join("");
}

function renderEventsPage() {
  return [
    pageHero("Events archive", "Workshops, competitions, and branch sessions.", "Browse documented IEEE NUCES PWR activities and event reports from 2023 onward.", "assets/events/2024/linkedin-brand/Pictures__Session_on_Building_Your_Personal_Brand__p1_img2.jpeg", "IEEE NUCES PWR branch activity"),
    "<section class=\"section events-section\"><div class=\"container section-heading section-heading-row\"><div><p class=\"section-kicker\">Archive</p><h2>Event records contributors can keep current.</h2></div><div class=\"filter-group\" aria-label=\"Filter events\"><button type=\"button\" class=\"filter-button is-active\" data-event-filter=\"all\">All</button><button type=\"button\" class=\"filter-button\" data-event-filter=\"2024\">2024</button><button type=\"button\" class=\"filter-button\" data-event-filter=\"2023\">2023</button></div></div><div class=\"container event-feature\" id=\"event-feature\"></div><div class=\"container events-grid\" id=\"events-grid\" aria-live=\"polite\"></div></section>"
  ].join("");
}

function renderCoursesPage() {
  return [
    pageHero("Learning tracks", "Short, practical paths for technical growth.", "These tracks help students start, teach, mentor, and build practical technical confidence.", "assets/courses/web-dev.jpg", "IEEE NUCES PWR learning track"),
    "<section class=\"section courses-section\"><div class=\"container courses-layout\"><div class=\"section-heading\"><p class=\"section-kicker\">Tracks</p><h2>Use these tracks to plan workshops and mentoring circles.</h2><p>Contributors can expand this page by adding syllabi, session material, prerequisites, and project outcomes.</p></div><div class=\"course-list\" id=\"course-list\"></div></div></section>"
  ].join("");
}

function renderOpenSource() {
  return [
    pageHero("Open source website", "One public repo, clear contribution paths.", "The website is structured for student maintainers, reviewers, and contributors who need a clean project they can safely improve.", "assets/events/2024/gender-equality/Picture_empowering_session_on_Gender_Equality_p1_img1.jpeg", "IEEE NUCES PWR branch activity"),
    "<section class=\"section opensource-section\"><div class=\"container opensource-grid\"><div><p class=\"section-kicker\">Contributor lanes</p><h2>Improve content, design, and engineering in focused pull requests.</h2><p>Shared page content is data-driven, event reports use app routes, and checks catch broken local links before deployment.</p></div><div class=\"contribution-board\" aria-label=\"Contributor lanes\"><article><span>Content</span><p>Add event reports, update team rosters, and improve branch copy.</p></article><article><span>Design</span><p>Polish responsive layouts, accessibility, media treatment, and visual consistency.</p></article><article><span>Engineering</span><p>Improve validation scripts, performance, image optimization, and GitHub Pages routing.</p></article></div></div></section>",
    "<section class=\"section mission\"><div class=\"container feature-grid\"><article class=\"simple-card\"><h3>Repository checks</h3><p>Run <code>npm test</code> before opening a pull request to catch broken local links and invalid app routes.</p></article><article class=\"simple-card\"><h3>Content source</h3><p>Update <code>data/site-data.json</code> for events, teams, leaders, and courses.</p></article><article class=\"simple-card\"><h3>Deployment</h3><p>GitHub Pages publishes from <code>main</code> at <code>pwr.ieeenuces.org</code>.</p></article></div></section>"
  ].join("");
}

function renderContact() {
  return [
    pageHero("Join the branch", "Bring a skill, a question, or a project idea.", "Reach out for membership, collaborations, event proposals, or website contributions.", "assets/events/2024/gender-equality/Sept2024_GenderEquality_image4.jpeg", "IEEE NUCES PWR branch activity"),
    "<section class=\"section join-section\"><div class=\"container join-grid\"><div><p class=\"section-kicker\">Contact</p><h2>Use one clear channel and we will route the request.</h2><p>Send membership questions, event ideas, collaboration requests, and website contribution notes to the branch inbox.</p><div class=\"contact-lines\"><a href=\"mailto:info@ieeenucespwr.org\">info@ieeenucespwr.org</a><a href=\"https://www.ieee.org/membership/\" target=\"_blank\" rel=\"noreferrer\">IEEE membership</a><a href=\"https://ieeexplore.ieee.org/\" target=\"_blank\" rel=\"noreferrer\">IEEE Xplore</a></div></div><form class=\"contact-form\" data-contact-form novalidate><label>Name<input name=\"name\" type=\"text\" autocomplete=\"name\" required></label><label>Email<input name=\"email\" type=\"email\" autocomplete=\"email\" required></label><label>Message<textarea name=\"message\" rows=\"5\" required></textarea></label><p class=\"form-status\" data-form-status role=\"status\"></p><button class=\"button button-primary\" type=\"submit\">Draft email</button></form></div></section>"
  ].join("");
}

function renderPrivacy() {
  return "<article class=\"container legal-page\"><p class=\"section-kicker\">Website policy</p><h1>Privacy</h1><p>This website is a public information site for IEEE NUCES PWR Student Branch. It does not use account tracking, advertising pixels, or analytics scripts by default.</p><h2>Information you send</h2><p>If you contact the branch by email, the information you include is handled by the branch team for membership, collaboration, event, or website contribution follow-up.</p><h2>External links</h2><p>The site links to IEEE resources and event material. External websites follow their own privacy policies.</p><h2>Media</h2><p>Event photos and branch media are published to document student activities. If a published image needs review, contact the branch team at info@ieeenucespwr.org.</p><div class=\"legal-actions\"><a class=\"button button-primary\" href=\"/\">Back to home</a></div></article>";
}

function renderTerms() {
  return "<article class=\"container legal-page\"><p class=\"section-kicker\">Website policy</p><h1>Terms</h1><p>This website is maintained by student contributors for public branch information. Content should be accurate, respectful, and relevant to IEEE NUCES PWR activities.</p><h2>Use of content</h2><p>Website source code is available under the repository license. IEEE names, logos, and marks remain subject to IEEE brand and trademark rules.</p><h2>Contributions</h2><p>Contributors are expected to follow the contribution guide, code of conduct, and review process in the public repository.</p><h2>Corrections</h2><p>For corrections to event records, names, photos, or links, open an issue or contact info@ieeenucespwr.org.</p><div class=\"legal-actions\"><a class=\"button button-primary\" href=\"/\">Back to home</a></div></article>";
}

function renderNotFound(path) {
  return "<section class=\"not-found\"><div class=\"container\"><p class=\"section-kicker\">404</p><h1>Page not found</h1><p>The address <code>" + escapeHtml(path) + "</code> does not match a published route on the IEEE NUCES PWR website.</p><div class=\"hero-actions\"><a class=\"button button-primary\" href=\"/\">Back to home</a><a class=\"button button-secondary\" href=\"/events\">Browse events</a></div></div></section>";
}

function genericEventReport(event) {
  return {
    subtitle: event.summary,
    accent: eventSlug(event),
    stats: [event.date, event.type, "IEEE NUCES PWR", "Contributor-ready record"],
    sections: [
      {
        title: "Event overview",
        paragraphs: [event.summary, "This routed event record keeps the archive organized without adding another standalone HTML document. Contributors can expand this report with photos, outcomes, speaker notes, and resources when verified details are available."]
      },
      {
        title: "Contributor notes",
        list: [
          "Keep the event title, date, and type updated in the shared CMS data file.",
          "Place supporting photos under the relevant assets/events folder.",
          "Add specific outcomes and resources after the branch team reviews them."
        ]
      }
    ],
    info: [["Archive status", "Ready for contributor updates"], ["Maintained by", "IEEE NUCES PWR website contributors"]],
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
    "<section class=\"section event-report-section\"><div class=\"container event-report-grid\"><article class=\"event-content\">" + sections + "<div class=\"info-box\"><h3>Event details</h3>" + info + "</div></article><aside class=\"event-report-aside\"><img src=\"" + escapeAttribute(assetUrl(event.image || "assets/placeholder.jpg")) + "\" alt=\"" + escapeAttribute(event.title) + "\" loading=\"lazy\"><a class=\"button button-primary\" href=\"/events\">Back to events</a></aside></div>" + gallery + "</section>"
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
    "<img src=\"" + escapeAttribute(assetUrl(faculty.image)) + "\" alt=\"" + escapeAttribute(faculty.name) + "\" loading=\"lazy\" width=\"560\" height=\"620\">",
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
      "<img src=\"" + escapeAttribute(assetUrl(leader.image)) + "\" alt=\"" + escapeAttribute(leader.name) + "\" loading=\"lazy\" width=\"640\" height=\"480\">",
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

function renderTeams() {
  const target = bySelector("#team-rail");
  if (!target || !siteData.teams) return;

  target.innerHTML = siteData.teams.map((team) => {
    return [
      "<article class=\"team-card\">",
      "<img src=\"" + escapeAttribute(assetUrl(team.image)) + "\" alt=\"" + escapeAttribute(team.name + " team lead") + "\" loading=\"lazy\" width=\"420\" height=\"260\">",
      "<div>",
      "<h3>" + escapeHtml(team.name) + "</h3>",
      "<p>" + escapeHtml(team.focus) + "</p>",
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
    "<div class=\"event-feature-body\">",
    eventMeta(primary),
    "<h3>" + escapeHtml(primary.title) + "</h3>",
    "<p>" + escapeHtml(primary.summary) + "</p>",
    "<a class=\"button button-secondary\" href=\"" + eventHref(primary) + "\">Read event report</a>",
    "</div>",
    "<img src=\"" + escapeAttribute(assetUrl(primary.image)) + "\" alt=\"" + escapeAttribute(primary.title) + "\" loading=\"lazy\" width=\"720\" height=\"540\">"
  ].join("");

  grid.innerHTML = limitItems(events, grid).map((event) => {
    return [
      "<article class=\"event-card\" data-event-year=\"" + escapeAttribute(event.year) + "\">",
      "<img src=\"" + escapeAttribute(assetUrl(event.image)) + "\" alt=\"" + escapeAttribute(event.title) + "\" loading=\"lazy\" width=\"640\" height=\"360\">",
      "<div class=\"event-card-body\">",
      eventMeta(event),
      "<h3>" + escapeHtml(event.title) + "</h3>",
      "<p>" + escapeHtml(event.summary) + "</p>",
      "<a class=\"text-link\" href=\"" + eventHref(event) + "\">View details</a>",
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
    description: "The requested route is not available on the IEEE NUCES PWR website.",
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
  setProperty("og:image", siteOrigin + "/assets/ieee-logo.png");
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
  root.innerHTML = route.html;
  document.body.dataset.route = route.eventSlug ? "event-detail" : route.path.replace(/^\//, "") || "home";
  if (route.eventSlug) document.body.dataset.eventAccent = route.eventSlug;
  else document.body.removeAttribute("data-event-accent");

  updateDocumentMeta(route);
  updateActiveNavigation(route.path);
  hydrateRoute();

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
  renderTeams();
  renderEvents();
  renderCourses();
  setupMotion();
  setupPressFeedback();
  setupEventFilters();
  setupContactForm();
  setupLightbox();
  setYear();
}

function navigateTo(path) {
  const normalized = normalizePath(path);
  if (!canHandleRoute(normalized)) return false;
  if (normalized !== currentRoutePath) history.pushState({ path: normalized }, "", normalized);
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
    ".operating-steps article",
    ".team-card",
    ".event-feature",
    ".event-card",
    ".course-card",
    ".opensource-grid",
    ".contribution-board article",
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
    image.src = assetUrl(lightboxImages[index]);
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
    image.src = assetUrl(lightboxImages[currentImageIndex]);
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
