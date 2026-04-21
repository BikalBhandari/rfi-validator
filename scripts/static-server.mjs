import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const host = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 4173);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

const securityHeaders = {
  'Cache-Control': 'no-store',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff'
};

function resolveRequestPath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split('?')[0]);
  const relativePath = pathname === '/' ? '/index.html' : pathname;
  const resolvedPath = path.resolve(rootDir, `.${relativePath}`);

  if (!resolvedPath.startsWith(rootDir)) {
    return null;
  }

  return resolvedPath;
}

createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || '/');
  if (!filePath || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    'Content-Type': contentTypes[extension] || 'application/octet-stream',
    ...securityHeaders
  });

  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  const localUrl = `http://127.0.0.1:${port}`;
  const bindLabel = host === '0.0.0.0' ? 'all interfaces (0.0.0.0)' : host;
  console.log(`Static server listening on ${bindLabel}:${port}`);
  console.log(`Local URL: ${localUrl}`);
  if (host === '0.0.0.0') {
    console.log('Network URL: use this machine\'s hostname or LAN IP with the same port.');
  }
});
