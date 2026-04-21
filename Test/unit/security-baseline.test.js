const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');

test('index.html defines a restrictive client-side CSP', () => {
  assert.match(
    indexHtml,
    /<meta\s+http-equiv="Content-Security-Policy"\s+content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; worker-src 'none'; manifest-src 'none'; media-src 'none'"/
  );
});

test('index.html disables referrer leakage and sensitive browser permissions', () => {
  assert.match(indexHtml, /<meta\s+name="referrer"\s+content="no-referrer"\s*\/>/);
  assert.match(indexHtml, /<meta\s+http-equiv="Permissions-Policy"\s+content="camera=\(\), microphone=\(\), geolocation=\(\)"/);
});
