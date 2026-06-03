import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";

const root = process.cwd();
const htmlFiles = [];
const failures = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if ([".git", "node_modules"].includes(entry)) continue;

    const fullPath = join(directory, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (extname(fullPath) === ".html") {
      htmlFiles.push(fullPath);
    }
  }
}

function idsFor(content) {
  return new Set([...content.matchAll(/\sid=["\']([^"\']+)["\']/g)].map((match) => match[1]));
}

function isExternal(target) {
  return /^(https?:|mailto:|tel:|data:|javascript:)/i.test(target);
}

function verifyLocalTarget(sourceFile, rawTarget) {
  const target = rawTarget.trim();
  if (!target || isExternal(target)) return;

  const directory = dirname(sourceFile);

  if (target.startsWith("#")) {
    const id = target.slice(1);
    const sourceContent = readFileSync(sourceFile, "utf8");
    if (id && !idsFor(sourceContent).has(id)) failures.push(`${sourceFile}: missing anchor #${id}`);
    return;
  }

  const [pathPart, hashPart] = target.split("#");
  const targetPath = pathPart.startsWith("/") ? resolve(root, pathPart.slice(1)) : resolve(directory, pathPart || ".");

  if (!existsSync(targetPath)) {
    failures.push(`${sourceFile}: missing file ${target}`);
    return;
  }

  if (hashPart && extname(targetPath) === ".html") {
    const targetContent = readFileSync(targetPath, "utf8");
    if (!idsFor(targetContent).has(hashPart)) failures.push(`${sourceFile}: missing anchor ${target}`);
  }
}

function collectSiteDataTargets(value, targets = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSiteDataTargets(item, targets));
    return targets;
  }

  if (!value || typeof value !== "object") return targets;

  for (const [key, item] of Object.entries(value)) {
    if (["href", "image", "url"].includes(key) && typeof item === "string") targets.push(item);
    collectSiteDataTargets(item, targets);
  }

  return targets;
}

function checkHtmlFiles() {
  walk(root);

  for (const file of htmlFiles) {
    const content = readFileSync(file, "utf8");
    for (const match of content.matchAll(/\s(?:href|src)=["\']([^"\']+)["\']/g)) {
      verifyLocalTarget(file, match[1]);
    }
  }
}

function checkSiteData() {
  const dataFile = join(root, "data/site-data.json");
  const siteData = JSON.parse(readFileSync(dataFile, "utf8"));

  const targets = collectSiteDataTargets(siteData);
  for (const target of targets) verifyLocalTarget(join(root, "index.html"), target);
}

checkHtmlFiles();
checkSiteData();

if (failures.length) {
  console.error("Link check failed:");
  for (const failure of failures) console.error(`- ${failure.replace(`${root}/`, "")}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files and shared site data. No broken local links found.`);
