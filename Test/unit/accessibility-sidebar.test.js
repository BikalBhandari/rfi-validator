const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, '..', '..', 'styles.css'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '..', '..', 'app.js'), 'utf8');

test('sidebar navigation and icon buttons expose tooltips', () => {
  assert.match(indexHtml, /id="nav-dashboard"[^>]*title="Dashboard"/);
  assert.match(indexHtml, /id="nav-validation"[^>]*title="Compare"/);
  assert.match(indexHtml, /id="nav-results"[^>]*title="Results"/);
  assert.match(indexHtml, /id="nav-test-data-generator"[^>]*title="Data Generator"/);
  assert.match(indexHtml, /id="nav-history"[^>]*title="History"/);
  assert.match(indexHtml, /id="nav-profile"[^>]*title="Profile"/);
  assert.match(indexHtml, /id="appearance-button"[^>]*title="Open appearance settings"/);
  assert.match(indexHtml, /id="notifications-button"[\s\S]*title="Open notifications"/);
  assert.match(indexHtml, /class="topbar-avatar-button"[^>]*title="Open user profile"/);
  assert.match(appJs, /class="results-filter-button" type="button" aria-label="Filter results" title="Filter results"/);
});

test('keyboard users receive a visible focus ring on navigation controls', () => {
  assert.match(stylesCss, /a:focus-visible,\s*button:focus-visible,\s*\[role="radio"\]:focus-visible,\s*\[role="tab"\]:focus-visible\s*\{/);
  assert.match(stylesCss, /box-shadow:\s*0 0 0 3px var\(--surface\),\s*0 0 0 6px var\(--blue\);/);
});

test('secondary dashboard and workspace copy uses theme contrast tokens', () => {
  assert.match(stylesCss, /\.dashboard-empty-stat-value\s*\{[\s\S]*color:\s*var\(--muted-strong\);/);
  assert.match(stylesCss, /\.dashboard-empty-stat-meta\s*\{[\s\S]*color:\s*var\(--muted\);/);
  assert.match(stylesCss, /\.dashboard-empty-ring-label\s*\{[\s\S]*color:\s*var\(--muted\);/);
  assert.match(stylesCss, /\.section-label\s*\{[\s\S]*color:\s*var\(--muted\);/);
  assert.match(stylesCss, /\.file-input-label\s*\{[\s\S]*color:\s*var\(--muted\);/);
  assert.match(stylesCss, /\.preview-search-label\s*\{[\s\S]*color:\s*var\(--muted\);/);
});

test('sidebar and appearance controls support arrow-key navigation', () => {
  assert.match(appJs, /function handleSidebarNavigationKeydown\(event\)/);
  assert.match(appJs, /sidebarNav\?\.addEventListener\('keydown', handleSidebarNavigationKeydown\)/);
  assert.match(appJs, /function handleAppearanceOptionKeydown\(event\)/);
  assert.match(appJs, /ArrowDown/);
  assert.match(appJs, /ArrowUp/);
  assert.match(appJs, /ArrowLeft/);
  assert.match(appJs, /ArrowRight/);
  assert.match(appJs, /Home/);
  assert.match(appJs, /End/);
});
