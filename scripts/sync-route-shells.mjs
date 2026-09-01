import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const shell = readFileSync(join(root, "index.html"), "utf8");
const data = JSON.parse(readFileSync(join(root, "data/site-data.json"), "utf8"));

const staticRoutes = [
  "/about",
  "/leadership",
  "/members",
  "/events",
  "/courses",
  "/contact",
  "/privacy",
  "/terms"
];

function eventRoute(event) {
  if (event.href?.startsWith("/events/")) return event.href;
  const slug = String(event.href || event.title || "event")
    .split("/")
    .pop()
    .replace(/\.html$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return "/events/" + slug;
}

function routeFile(route) {
  const clean = route.replace(/^\//, "");
  return join(root, clean, "index.html");
}

for (const route of staticRoutes) {
  const target = routeFile(route);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, shell);
}

const eventRoot = join(root, "events");
rmSync(eventRoot, { recursive: true, force: true });
mkdirSync(eventRoot, { recursive: true });
writeFileSync(join(eventRoot, "index.html"), shell);

for (const event of data.events || []) {
  const target = routeFile(eventRoute(event));
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, shell);
}

console.log("Synced app route shells for " + (staticRoutes.length + (data.events || []).length) + " routes.");
