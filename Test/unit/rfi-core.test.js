const test = require('node:test');
const assert = require('node:assert/strict');

const {
  calculateFileDiagnostics,
  canonicalizeRecord,
  compareRecord,
  displayFieldValue,
  normalizeDate,
  parseCsv,
  selectBestUniqueMatches,
  validateRecordCount
} = require('../../rfi-core.js');

test('normalizeDate converts Excel serial dates into ISO values', () => {
  assert.equal(normalizeDate(45658), '2025-01-01');
  assert.equal(normalizeDate('45658'), '2025-01-01');
});

test('normalizeDate converts slash-formatted dates into ISO values', () => {
  assert.equal(normalizeDate('4/9/2026'), '2026-04-09');
  assert.equal(normalizeDate('04/09/26'), '2026-04-09');
});

test('parseCsv handles quoted commas and canonical header aliases', () => {
  const [row] = parseCsv('E-mail,Origin Page,First Name\n"person@example.com","https://example.com/path,with-comma","Jamie"');

  assert.deepEqual(row, {
    Email: 'person@example.com',
    'ASUO Origin URL': 'https://example.com/path,with-comma',
    'First Name': 'Jamie'
  });
});

test('calculateFileDiagnostics recognizes expected fields from aliased headers', () => {
  const diagnostics = calculateFileDiagnostics([
    canonicalizeRecord({
      'Interaction: Created Date': '2025-01-01',
      'Given Name': 'Jamie',
      Surname: 'Smith',
      'Email Address': 'jamie@example.com',
      Telephone: '555-123-4567',
      Military: 'true',
      'Origin Page': 'https://asuonline.asu.edu'
    })
  ]);

  assert.equal(diagnostics.recognizedFields, 7);
  assert.deepEqual(diagnostics.missingFields, []);
});

test('compareRecord rejects otherwise strong matches when email does not match exactly', () => {
  const result = compareRecord(
    {
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'wrong@example.com',
      'Phone Number': '(555) 123-4567'
    },
    {
      submissionNumber: 1,
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Phone Number': '5551234567',
      'Military Service': '',
      'ASUO Origin URL': ''
    },
    0
  );

  assert.equal(result.status, 'No match');
  assert.equal(result.confidenceScore, 0);
  assert.match(result.reviewReasons[0], /Exact email match is required/);
});

test('compareRecord treats military service value 1 as an exact match for checked RFIs', () => {
  const result = compareRecord(
    {
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Military Service': '1'
    },
    {
      submissionNumber: 1,
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Phone Number': '',
      'Military Service': 'true',
      'ASUO Origin URL': ''
    },
    0
  );

  assert.ok(result.matchedFields.includes('Military Service'));
  assert.ok(!result.reviewReasons.some((reason) => reason.includes('Military Service')));
});

test('compareRecord treats military service value 0 as a false value instead of a missing field', () => {
  const result = compareRecord(
    {
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Military Service': '0'
    },
    {
      submissionNumber: 1,
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Phone Number': '',
      'Military Service': 'true',
      'ASUO Origin URL': ''
    },
    0
  );

  assert.ok(result.reviewReasons.some((reason) => reason.includes('Military Service: Values do not align')));
  assert.ok(!result.reviewReasons.some((reason) => reason.includes('Field missing in Salesforce record')));
});

test('compareRecord flags military service as a mismatch when Salesforce is true and the RFI value is blank', () => {
  const result = compareRecord(
    {
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Military Service': '1'
    },
    {
      submissionNumber: 1,
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Phone Number': '',
      'Military Service': '',
      'ASUO Origin URL': ''
    },
    0
  );

  assert.ok(!result.matchedFields.includes('Military Service'));
  assert.ok(result.reviewReasons.some((reason) => reason.includes('Military Service: Values do not align')));
  assert.equal(
    result.fieldMatches.find((fieldMatch) => fieldMatch.field === 'Military Service')?.matchType,
    'none'
  );
});

test('compareRecord keeps military service inactive when neither the RFI nor Salesforce is true', () => {
  const result = compareRecord(
    {
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Military Service': '0'
    },
    {
      submissionNumber: 1,
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Phone Number': '',
      'Military Service': '',
      'ASUO Origin URL': ''
    },
    0
  );

  assert.ok(!result.matchedFields.includes('Military Service'));
  assert.ok(!result.reviewReasons.some((reason) => reason.includes('Military Service')));
  assert.equal(
    result.fieldMatches.find((fieldMatch) => fieldMatch.field === 'Military Service')?.matchType,
    'inactive'
  );
});

test('selectBestUniqueMatches assigns distinct Salesforce records to competing RFIs', () => {
  const rfis = [
    {
      submissionNumber: 1,
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com',
      'Phone Number': '',
      'Military Service': '',
      'ASUO Origin URL': ''
    },
    {
      submissionNumber: 2,
      'Created Date': '2025-01-01',
      'First Name': 'Taylor',
      'Last Name': 'Jones',
      Email: 'taylor@example.com',
      'Phone Number': '',
      'Military Service': '',
      'ASUO Origin URL': ''
    }
  ];

  const records = [
    {
      'Created Date': '2025-01-01',
      'First Name': 'Jamie',
      'Last Name': 'Smith',
      Email: 'jamie@example.com'
    },
    {
      'Created Date': '2025-01-01',
      'First Name': 'Taylor',
      'Last Name': 'Jones',
      Email: 'taylor@example.com'
    }
  ];

  const results = selectBestUniqueMatches(rfis, records);

  assert.equal(results.length, 2);
  assert.deepEqual(
    results.map((result) => [result.submissionNumber, result.record.Email, result.status]),
    [
      [1, 'jamie@example.com', 'Exact match'],
      [2, 'taylor@example.com', 'Exact match']
    ]
  );
});

test('canonicalizeRecord maps military service and military status headers to the same field', () => {
  assert.deepEqual(
    canonicalizeRecord({ 'Military Service': 'Yes', 'Military Status': 'No' }),
    { 'Military Service': 'No' }
  );
});

test('displayFieldValue renders formatted dates and normalized military service labels', () => {
  assert.equal(displayFieldValue({ 'Created Date': '2026-04-09' }, 'Created Date'), '04/09/2026');
  assert.equal(displayFieldValue({ 'Created Date': '4/9/2026' }, 'Created Date'), '04/09/2026');
  assert.equal(displayFieldValue({ 'Military Service': '' }, 'Military Service'), 'Blank');
  assert.equal(displayFieldValue({ 'Military Service': 'unchecked' }, 'Military Service'), 'False');
  assert.equal(displayFieldValue({ 'Military Service': '0' }, 'Military Service'), 'False');
  assert.equal(displayFieldValue({ 'Military Service': 'Yes' }, 'Military Service'), 'True');
});

test('validateRecordCount rejects uploads over the configured limit', () => {
  const records = Array.from({ length: 501 }, (_, index) => ({ id: index + 1 }));

  assert.throws(
    () => validateRecordCount(records, 500),
    /exceeds the 500-row limit/
  );
});
