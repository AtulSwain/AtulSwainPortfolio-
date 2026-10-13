// Tiny zero-dependency static server for the exported site (used by tests and `npm start`).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".ico": "image/x-icon", ".pdf": "application/pdf",
};

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, clean);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html");
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const file = await resolve(req.url ?? "/");
  if (!file) {
    res.writeHead(404, { "content-type": types[".html"] });
    return res.end(await readFile(join(root, "404.html")).catch(() => "Not found"));
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
}).listen(port, () => console.log(`Serving out/ on http://localhost:${port}`));
