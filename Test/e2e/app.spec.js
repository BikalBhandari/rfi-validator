const { test, expect } = require('@playwright/test');
const fs = require('node:fs/promises');

async function createSalesforceCsvFixture(filePath) {
  const csv = [
    'Interaction: Created Date,First Name,Last Name,Email,Phone Number,Military Service,ASUO Origin URL',
    '4/9/2026,Embtest,Embtest,embtestbikalrfivalidation@asu.edu,5023465433,,https://qa.asuonline.asu.edu/',
    '4/9/2026,Embtest,Embtest,embtestbikalrfivalidation_1@asu.edu,5024565431,,https://qa.asuonline.asu.edu/online-degree-programs/undergraduate'
  ].join('\n');

  await fs.writeFile(filePath, csv, 'utf8');
}

async function createOversizedSalesforceCsvFixture(filePath) {
  const header = 'Created Date,First Name,Last Name,Email,Phone Number,Military Service,ASUO Origin URL';
  const rows = Array.from({ length: 501 }, (_, index) => (
    `2026-04-09,First${index},Last${index},person${index}@example.com,555000${String(index).padStart(4, '0')},,https://example.com/${index}`
  ));

  await fs.writeFile(filePath, `${header}\n${rows.join('\n')}`, 'utf8');
}

async function createOversizedRfiCsvFixture(filePath) {
  const header = 'First Name,Last Name,Email,Phone Number,Military Service,ASUO Origin URL';
  const rows = Array.from({ length: 501 }, (_, index) => (
    `First${index},Last${index},person${index}@example.com,555000${String(index).padStart(4, '0')},false,https://example.com/${index}`
  ));

  await fs.writeFile(filePath, `${header}\n${rows.join('\n')}`, 'utf8');
}

async function createSingleRfiCsvFixture(filePath) {
  const csv = [
    'First Name,Last Name,Email,Phone Number,Military Service,ASUO Origin URL',
    'Taylor,Example,taylor.example@asu.edu,555-123-4567,false,https://asuonline.asu.edu/'
  ].join('\n');

  await fs.writeFile(filePath, csv, 'utf8');
}

async function openRfiInputs(page) {
  await page.locator('#nav-rfi-inputs').click();
  await expect(page.locator('#rfi-inputs-view')).toBeVisible();
}

async function openDashboard(page) {
  await page.locator('#nav-dashboard').click();
  await expect(page.locator('#dashboard-view')).toBeVisible();
}

async function openGenerator(page) {
  await page.locator('#nav-test-data-generator').click();
  await expect(page.locator('#test-data-generator-view')).toBeVisible();
}

async function fillFirstRfiSubmission(page, values) {
  await openRfiInputs(page);
  await page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="Created Date"]').fill(values.createdDate);
  await page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="First Name"]').fill(values.firstName);
  await page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="Last Name"]').fill(values.lastName);
  await page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="Email"]').fill(values.email);
  await page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="Phone Number"]').fill(values.phoneNumber);
  await page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="ASUO Origin URL"]').fill(values.originUrl);
}

test('browser workflow supports upload, comparison, and download', async ({ page }, testInfo) => {
  const csvPath = testInfo.outputPath('salesforce-export.csv');
  await createSalesforceCsvFixture(csvPath);

  await page.goto('/');
  await fillFirstRfiSubmission(page, {
    createdDate: '4/9/2026',
    firstName: 'Embtest',
    lastName: 'Embtest',
    email: 'embtestbikalrfivalidation@asu.edu',
    phoneNumber: '5023465433',
    originUrl: 'https://qa.asuonline.asu.edu/'
  });

  await openDashboard(page);
  await page.locator('#file-input').setInputFiles(csvPath);

  await expect(page.locator('#status')).toContainText('Loaded 2 Salesforce record(s). Ready to compare.');
  await expect(page.locator('#compare-button')).toBeEnabled();

  const downloadPromise = page.waitForEvent('download');

  await page.locator('#compare-button').click();
  await expect(page.locator('#results-container')).toContainText('Exact match');
  await expect(page.locator('#results-container')).toContainText('embtestbikalrfivalidation@asu.edu');
  await expect(page.locator('#download-button')).toBeEnabled();

  await page.locator('#download-button').click();
  const download = await downloadPromise;
  const downloadPath = testInfo.outputPath('results.csv');
  await download.saveAs(downloadPath);

  const downloadedCsv = await fs.readFile(downloadPath, 'utf8');
  expect(downloadedCsv).toContain('Match Status');
  expect(downloadedCsv).toContain('Exact match');
  expect(downloadedCsv).toContain('embtestbikalrfivalidation@asu.edu');
  expect(downloadedCsv).toContain('04/09/2026');
});

test('Salesforce-only upload keeps compare disabled until an RFI row is provided', async ({ page }, testInfo) => {
  const csvPath = testInfo.outputPath('salesforce-export.csv');
  await createSalesforceCsvFixture(csvPath);

  await page.goto('/');
  await openDashboard(page);
  await page.locator('#file-input').setInputFiles(csvPath);

  await expect(page.locator('#status')).toContainText('Add at least one RFI submission to enable comparison.');
  await expect(page.locator('#workflow-summary')).toContainText('Import RFI bulk data or enter at least one row in RFI Inputs to enable comparison.');
  await expect(page.locator('#compare-button')).toBeDisabled();
});

test('notification bell shows recent comparison activity', async ({ page }, testInfo) => {
  const csvPath = testInfo.outputPath('salesforce-export.csv');
  await createSalesforceCsvFixture(csvPath);

  await page.goto('/');
  await fillFirstRfiSubmission(page, {
    createdDate: '2026-04-09',
    firstName: 'Embtest',
    lastName: 'Embtest',
    email: 'embtestbikalrfivalidation@asu.edu',
    phoneNumber: '5023465433',
    originUrl: 'https://qa.asuonline.asu.edu/'
  });

  await openDashboard(page);
  await page.locator('#file-input').setInputFiles(csvPath);
  await page.locator('#compare-button').click();

  await expect(page.locator('#notifications-badge')).toHaveText('1');
  await page.locator('#notifications-button').click();
  await expect(page.locator('#notifications-list')).toContainText('Compared 1 RFI against 2 Salesforce records');
  await expect(page.locator('#notifications-badge')).toBeHidden();
});

test('manual RFI rows do not prepopulate the created date', async ({ page }) => {
  await page.goto('/');
  await openRfiInputs(page);

  const createdDateInputs = page.locator('#rfi-submissions input[data-field="Created Date"]');
  await expect(createdDateInputs.first()).toHaveValue('');

  await page.locator('#add-rfi-button').click();
  await expect(createdDateInputs.nth(1)).toHaveValue('');
});

test('manual RFI created date accepts pasted slash-formatted dates', async ({ page }) => {
  await page.goto('/');
  await openRfiInputs(page);

  const createdDateInput = page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="Created Date"]');
  await createdDateInput.fill('4/9/2026');
  await page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="First Name"]').click();

  await expect(createdDateInput).toHaveValue('04/09/2026');
});

test('importing one RFI CSV row reuses the initial blank submission row', async ({ page }, testInfo) => {
  const csvPath = testInfo.outputPath('single-rfi.csv');
  await createSingleRfiCsvFixture(csvPath);

  await page.goto('/');
  await page.locator('#rfi-csv-input').setInputFiles(csvPath);
  await expect(page.locator('#rfi-import-status')).toContainText('Imported 1 RFI row');

  await openRfiInputs(page);
  const submissionRows = page.locator('#rfi-submissions .submission-row');
  await expect(submissionRows).toHaveCount(1);
  await expect(submissionRows.first().locator('input[data-field="First Name"]')).toHaveValue('Taylor');
  await expect(submissionRows.first().locator('input[data-field="Email"]')).toHaveValue('taylor.example@asu.edu');
});

test('browser workflow rejects Salesforce uploads over the 500-row limit', async ({ page }, testInfo) => {
  const csvPath = testInfo.outputPath('oversized-salesforce.csv');
  await createOversizedSalesforceCsvFixture(csvPath);

  await page.goto('/');
  await page.locator('#file-input').setInputFiles(csvPath);

  await expect(page.locator('#status')).toContainText('exceeds the 500-row limit');
  await expect(page.locator('#compare-button')).toBeDisabled();

  await page.locator('#nav-salesforce-records').click();
  await expect(page.locator('#salesforce-records-container')).toContainText('Unable to display imported records from that file.');
});

test('dashboard RFI CSV import rejects files over the 500-row limit', async ({ page }, testInfo) => {
  const csvPath = testInfo.outputPath('oversized-rfi.csv');
  await createOversizedRfiCsvFixture(csvPath);

  await page.goto('/');
  await page.locator('#rfi-csv-input').setInputFiles(csvPath);

  await expect(page.locator('#rfi-import-status')).toContainText('exceeds the 500-row limit');

  await openRfiInputs(page);
  await expect(page.locator('#rfi-submissions .submission-row')).toHaveCount(1);
  await expect(page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="First Name"]')).toHaveValue('');
});

test('test data generator view can generate and download a synthetic record', async ({ page }, testInfo) => {
  await page.goto('/');
  await openGenerator(page);

  await expect(page.locator('#test-data-generator-view h1')).toContainText('Test Data Generator');
  await expect(page.locator('#generator-generate-button')).toBeVisible();

  await page.locator('#generator-generate-button').click();
  await expect(page.locator('#generator-download-button')).toBeEnabled();

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#generator-download-button').click();
  const download = await downloadPromise;
  const downloadPath = testInfo.outputPath('synthetic-record.json');
  await download.saveAs(downloadPath);

  const downloadedJson = await fs.readFile(downloadPath, 'utf8');
  expect(downloadedJson).toContain('"Batch ID"');
  expect(downloadedJson).toContain('"Email"');
});

test('test data generator supports international phone output', async ({ page }) => {
  await page.goto('/');
  await openGenerator(page);

  await page.locator('input[name="generator-phone-format"][value="international"]').check();
  await page.locator('#generator-generate-button').click();

  const phoneCell = page.locator('#generator-results-body tr').first().locator('td').nth(5);
  await expect(phoneCell).toHaveText(/^\+/);
});

test('test data generator generates batch with adjustable size via plus and minus controls', async ({ page }) => {
  await page.goto('/');
  await openGenerator(page);

  const batchCount = page.locator('#generator-batch-count-display');
  await expect(batchCount).toHaveText('1');

  await page.locator('#generator-batch-plus-button').click();
  await expect(batchCount).toHaveText('2');

  await page.locator('#generator-batch-minus-button').click();
  await expect(batchCount).toHaveText('1');
});

test('injecting generated test data clears stale comparison results', async ({ page }, testInfo) => {
  const csvPath = testInfo.outputPath('salesforce-export.csv');
  await createSalesforceCsvFixture(csvPath);

  await page.goto('/');
  await fillFirstRfiSubmission(page, {
    createdDate: '2026-04-09',
    firstName: 'Embtest',
    lastName: 'Embtest',
    email: 'embtestbikalrfivalidation@asu.edu',
    phoneNumber: '5023465433',
    originUrl: 'https://qa.asuonline.asu.edu/'
  });

  await openDashboard(page);
  await page.locator('#file-input').setInputFiles(csvPath);
  await page.locator('#compare-button').click();
  await expect(page.locator('#download-button')).toBeEnabled();

  await openGenerator(page);
  await page.locator('#generator-generate-button').click();
  await page.locator('#generator-inject-button').click();

  await openDashboard(page);
  await expect(page.locator('#download-button')).toBeDisabled();
  await expect(page.locator('#status')).toContainText('Compare again when ready.');
});

test('injecting generated test data populates the RFI created date from generation time', async ({ page }) => {
  await page.goto('/');
  await openGenerator(page);

  const generatedTimestamp = page.locator('#generator-timestamp');
  await page.locator('#generator-generate-button').click();
  await expect(generatedTimestamp).toHaveValue(/Generated \(UTC\):/);

  const timestampText = await generatedTimestamp.inputValue();
  const timestampMatch = timestampText.match(/Generated \(UTC\): (\d{2})\/(\d{2}) \d{2}:\d{2}:\d{2}:\d{3}/);
  expect(timestampMatch).not.toBeNull();
  const expectedCreatedDate = `${timestampMatch[1]}/${timestampMatch[2]}/${new Date().getUTCFullYear()}`;

  await page.locator('#generator-inject-button').click();
  await expect(page.locator('#rfi-inputs-view')).toBeVisible();
  await expect(page.locator('#rfi-submissions .submission-row').first().locator('input[data-field="Created Date"]')).toHaveValue(expectedCreatedDate);
});
