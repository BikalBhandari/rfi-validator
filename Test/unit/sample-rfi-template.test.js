const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');
const sampleCsv = fs.readFileSync(path.join(__dirname, '..', '..', 'sample_rfi-entered_timestamp.csv'), 'utf8');

test('bulk import panel exposes the sample RFI CSV download', () => {
  assert.match(indexHtml, /href="sample_rfi-entered_timestamp\.csv"/);
  assert.match(indexHtml, /download="sample_rfi-entered_timestamp\.csv"/);
  assert.match(indexHtml, /Download Sample CSV/);
});

test('sample RFI CSV includes the expected import headers', () => {
  const [headerRow] = sampleCsv.trim().split('\n');

  assert.equal(
    headerRow,
    'Created Date,First Name,Last Name,Email,Phone Number,Military Service,ASUO Origin URL'
  );
});
