const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const stylesCss = fs.readFileSync(path.join(__dirname, '..', '..', 'styles.css'), 'utf8');

function getThemeBlock(themeName) {
  const match = stylesCss.match(new RegExp(`body\\[data-theme="${themeName}"\\]\\s*\\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `${themeName} theme block should exist`);
  return match[1];
}

test('dark theme uses ASU palette variables for accents', () => {
  const darkTheme = getThemeBlock('dark');

  assert.match(darkTheme, /--rds-primary:\s*#8c1d40;/);
  assert.match(darkTheme, /--rds-secondary:\s*#ffc627;/);
  assert.match(darkTheme, /--bg:\s*#191919;/);
  assert.match(darkTheme, /--surface:\s*#191919;/);
  assert.match(darkTheme, /--text:\s*#ffffff;/);
  assert.match(darkTheme, /--blue:\s*var\(--rds-secondary\);/);
  assert.match(darkTheme, /--amber:\s*var\(--rds-secondary\);/);
  assert.match(darkTheme, /--sidebar-active-bg:\s*rgba\(255,\s*198,\s*39,\s*0\.18\);/);
  assert.match(darkTheme, /--dashboard-run-badge-bg:\s*var\(--rds-secondary\);/);
});

test('dark generator selected states inherit theme accent variables', () => {
  assert.match(stylesCss, /body\[data-theme="dark"\] \.generator-option-card\.selected\s*\{[\s\S]*border-color:\s*var\(--blue\);[\s\S]*background:\s*var\(--blue-soft\);/);
  assert.match(stylesCss, /body\[data-theme="dark"\] \.generator-email-card\s*\{[\s\S]*border-color:\s*var\(--blue\);[\s\S]*background:\s*var\(--blue-soft\);/);
});

test('dark dashboard panels use black surfaces with white outlines', () => {
  assert.match(stylesCss, /body\[data-theme="dark"\] \.dashboard-stat-card,[\s\S]*background:\s*var\(--surface\);[\s\S]*box-shadow:\s*none;/);
  assert.match(stylesCss, /body\[data-theme="dark"\] \.primary-button,[\s\S]*background:\s*var\(--rds-secondary\);[\s\S]*color:\s*#191919;/);
});

test('dark results empty state stays on black surface', () => {
  assert.match(stylesCss, /body\[data-theme="dark"\] \.results-empty-shell\s*\{[\s\S]*border:\s*1px solid var\(--border\);[\s\S]*background:\s*var\(--surface\);/);
  assert.match(stylesCss, /body\[data-theme="dark"\] \.results-empty-step-badge\s*\{[\s\S]*color:\s*var\(--rds-secondary\);/);
});
