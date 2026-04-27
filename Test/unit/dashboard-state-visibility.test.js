const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
const stylesCss = fs.readFileSync(path.join(__dirname, '..', '..', 'styles.css'), 'utf8');

test('dashboard empty state starts hidden in markup', () => {
  assert.match(indexHtml, /id="dashboard-empty-state"[^>]*hidden/);
});

test('stylesheet enforces hidden attribute visibility', () => {
  assert.match(stylesCss, /\[hidden\]\s*\{\s*display:\s*none\s*!important;\s*\}/);
});

test('empty dashboard ring includes a rotating spinner overlay', () => {
  assert.match(stylesCss, /\.dashboard-empty-ring::after\s*\{/);
  assert.match(stylesCss, /animation:\s*dashboard-empty-ring-spin\s+8s\s+linear\s+infinite/);
  assert.match(stylesCss, /@keyframes\s+dashboard-empty-ring-spin/);
});

test('field recognition uses success, inactive, and missing status colors', () => {
  assert.match(stylesCss, /\.dashboard-field-row\.recognized[\s\S]*color:\s*var\(--dashboard-status-exact\);/);
  assert.match(stylesCss, /\.dashboard-field-row\.inactive[\s\S]*color:\s*var\(--dashboard-status-inactive\);/);
  assert.match(stylesCss, /\.dashboard-field-row\.missing[\s\S]*color:\s*var\(--dashboard-status-warning\);/);
  assert.match(stylesCss, /\.dashboard-field-meter-fill\.recognized\s*\{\s*background:\s*var\(--dashboard-status-exact\);/);
});

test('loaded dashboard chart uses an svg donut ring', () => {
  assert.match(indexHtml, /class="dashboard-chart-ring-svg"/);
  assert.match(stylesCss, /\.dashboard-chart-ring-progress\s*\{/);
  assert.match(stylesCss, /stroke-dasharray:\s*var\(--dashboard-chart-fill\)\s+100;/);
});

test('dashboard run action is rendered as a disabled button by default', () => {
  assert.match(indexHtml, /<button id="dashboard-run-badge" class="dashboard-run-badge" type="button" disabled>Awaiting inputs<\/button>/);
});

test('dashboard overview groups KPI cards with readiness actions in a compact shell', () => {
  assert.match(indexHtml, /class="dashboard-loaded-overview-grid"/);
  assert.match(indexHtml, /class="dashboard-loaded-health-footer dashboard-chart-cta"/);
  assert.match(stylesCss, /\.dashboard-loaded-overview-grid\s*\{/);
  assert.match(stylesCss, /\.dashboard-empty-stats\s*\{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/);
});

test('workflow progress starts with action-oriented step titles', () => {
  assert.match(indexHtml, /id="validation-step-rfi-title">Add RFI data<\/strong>/);
  assert.match(indexHtml, /id="validation-step-salesforce-title">Upload Salesforce export<\/strong>/);
  assert.match(indexHtml, /id="validation-step-compare-title">Run comparison<\/strong>/);
});

test('active workflow steps promote their copy styling', () => {
  assert.match(stylesCss, /\.validation-progress-step\.is-active \.validation-step-copy strong\s*\{\s*color:\s*var\(--validation-step-active-title\);/);
  assert.match(stylesCss, /\.validation-progress-step\.is-active \.validation-step-copy span\s*\{\s*color:\s*var\(--validation-step-active-detail\);/);
});
