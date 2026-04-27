const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '..', '..', 'app.js'), 'utf8');

test('preloaded RFI rows expose save and cancel actions in the table template', () => {
  assert.match(indexHtml, /class="secondary-button row-action-button save-submission-button" type="button" hidden>Save<\/button>/);
  assert.match(indexHtml, /class="ghost-button row-action-button cancel-submission-button" type="button" hidden>Cancel<\/button>/);
});

test('comparison is blocked while preloaded RFI edits are pending', () => {
  assert.match(appJs, /compareButton\.disabled = !comparisonReady \|\| pendingPreloadedEdits;/);
  assert.match(appJs, /Save or cancel pending edits on preloaded RFI rows before comparison can run\./);
});

test('imported and injected RFI rows require explicit save-aware row state', () => {
  assert.match(appJs, /replaceSingleEmptySubmissionCard\(firstRecord, \{ requiresExplicitSave: true \}\)/);
  assert.match(appJs, /createSubmissionCard\(firstRecord, null, \{ requiresExplicitSave: true \}\)/);
  assert.match(appJs, /replaceSingleEmptySubmissionCard\(rfiData, \{ requiresExplicitSave: true \}\)/);
  assert.match(appJs, /const committedValues = getCommittedSubmissionValues\(card\);/);
});
