import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 5500);
const host = process.env.HOST || "127.0.0.1";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".yml": "text/yaml; charset=utf-8",
  ".yaml": "text/yaml; charset=utf-8"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const clean = normalize(decoded).replace(/^([/\\])+/, "");
  const fullPath = resolve(root, clean || "index.html");
  return fullPath.startsWith(root) ? fullPath : join(root, "index.html");
}

function sendFile(response, filePath, statusCode = 200) {
  const type = contentTypes[extname(filePath)] || "application/octet-stream";
  response.writeHead(statusCode, { "Content-Type": type });
  createReadStream(filePath).pipe(response);
}

function resolveRequest(urlPath) {
  let filePath = safePath(urlPath);
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, "index.html");
  if (existsSync(filePath) && statSync(filePath).isFile()) return { filePath, statusCode: 200 };

  if (!extname(urlPath)) return { filePath: join(root, "index.html"), statusCode: 200 };
  return { filePath: join(root, "404.html"), statusCode: 404 };
}

createServer((request, response) => {
  const { filePath, statusCode } = resolveRequest(request.url || "/");
  sendFile(response, filePath, statusCode);
}).listen(port, host, () => {
  console.log("IEEE NUCES PWR app running at http://" + host + ":" + port);
});
