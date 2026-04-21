const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');

test('profile navigation and view are present in index.html', () => {
  assert(indexHtml.includes('id="dashboard-view"'), 'dashboard view exists');
  assert(indexHtml.includes('id="rfi-inputs-view"'), 'RFI inputs view exists');
  assert(indexHtml.includes('id="test-data-generator-view"'), 'test data generator view exists');
});
