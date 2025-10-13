#!/usr/bin/env node

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createReadStream, existsSync, statSync } from 'fs';
import { extname, join, resolve } from 'path';

const PORT = parseInt(process.env.PORT || '5000', 10);
const HOST = process.env.HOST || '0.0.0.0';

// Serve from dist if present, else project root
const baseDir = existsSync('dist') ? resolve('dist') : resolve('.');

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

function send404(res: ServerResponse) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  setNoCache(res);
  res.end('Not Found');
}

function setNoCache(res: ServerResponse) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}

function serveFile(filePath: string, res: ServerResponse) {
  try {
    const stats = statSync(filePath);
    if (!stats.isFile()) {
      return send404(res);
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    setNoCache(res);
    createReadStream(filePath).pipe(res);
  } catch {
    send404(res);
  }
}

function requestHandler(req: IncomingMessage, res: ServerResponse) {
  const urlPath = (req.url || '/').split('?')[0];
  // Prevent path traversal
  const safePath = urlPath.replace(/\\/g, '/').replace(/\.\.+/g, '');

  let filePath = join(baseDir, safePath);
  try {
    const isDir = existsSync(filePath) && statSync(filePath).isDirectory();
    if (isDir) {
      filePath = join(filePath, 'index.html');
    }
  } catch {}

  // If requesting root, serve index.html if exists
  if (safePath === '/' || safePath === '') {
    const indexPath = join(baseDir, 'index.html');
    if (existsSync(indexPath)) {
      return serveFile(indexPath, res);
    }
  }

  // Try exact file, else try html fallback for pretty URLs
  if (existsSync(filePath)) {
    return serveFile(filePath, res);
  }

  const htmlFallback = join(baseDir, `${safePath}.html`);
  if (existsSync(htmlFallback)) {
    return serveFile(htmlFallback, res);
  }

  send404(res);
}

const server = createServer(requestHandler);

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${HOST}:${PORT}/`);
  // eslint-disable-next-line no-console
  console.log(`Serving static files from ${baseDir}`);
});

export {}; // keep this a module


