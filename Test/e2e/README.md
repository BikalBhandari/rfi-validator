# E2E Tests (Playwright)

Full user workflow testing: file upload, data import, comparison, export.

## Running Tests

```bash
npm run test:e2e               # Run all e2e tests
npx playwright test --grep "pattern"  # Run tests matching pattern
npx playwright test --debug    # Run in debug mode (slow)
npx playwright test --headed   # Run in headed browser (visible)
```

## Test Files

- `app.spec.js` — Full browser workflows (9 tests)

**Total: 9 tests, all passing**

## Test Coverage

### Core Workflows

| Test | Description | Duration |
|------|-------------|----------|
| browser workflow supports upload, comparison, and download | Golden path: RFI entry → export upload → match results → export | ~1.3s |
| manual RFI rows do not prepopulate the created date | Manual RFI table behavior | ~170ms |
| importing one RFI CSV row reuses the initial blank submission row | Single-row import reuse logic | ~170ms |
| browser workflow rejects Salesforce uploads over the 500-row limit | Boundary validation (501 export rows rejected) | ~240ms |
| dashboard RFI CSV import rejects files over the 500-row limit | Boundary validation (501 RFI rows rejected) | ~240ms |

### Test Data Generator

| Test | Description | Duration |
|------|-------------|----------|
| test data generator view can generate and download a synthetic record | UI → fixture generation → download | ~224ms |
| test data generator supports international phone output | Phone format validation | ~200ms |
| test data generator generates batch with adjustable size via +/- controls | Batch size UI controls | ~497ms |
| injecting generated test data clears stale comparison results | Generated RFI rows invalidate previous comparison output | ~450ms |

## Fixtures & Helpers

### `createSalesforceCsvFixture(filePath)`
Generates a Salesforce CSV fixture with sample records.

```javascript
const filePath = path.join(__dirname, 'salesforce-export.csv');
await createSalesforceCsvFixture(filePath);
// Creates CSV with 2 sample Salesforce records
```

### `createOversizedSalesforceCsvFixture(filePath)`
Creates a Salesforce CSV with 501 rows to test the export limit.

### `createOversizedRfiCsvFixture(filePath)`
Creates an RFI CSV with 501 rows to test the RFI table limit.

### `createSingleRfiCsvFixture(filePath)`
Minimal 1-row RFI CSV for single-import testing.

## Key Constraints

- **500-Row Limit:** Tests enforce this boundary for Salesforce exports and RFI rows. Changes to the limit require test updates.
- **CSP Compliance:** No external API calls. File uploads processed locally.
- **Browser:** Chromium (Playwright default). Configure in `playwright.config.js`.
- **Server:** Static dev server (`scripts/static-server.mjs`) required. Auto-started by Playwright.
- **Timeout:** 30 seconds per test (configurable in `playwright.config.js`).

## Troubleshooting

**Tests hang or timeout?**
- Kill stray browser processes: `killall chrome`
- Ensure dev server not already running on port 4173
- Check Playwright MCP is enabled: `.claude/settings.json` → `mcp.enabled`

**"Unable to connect to server"?**
- Dev server failed to start. Check `scripts/static-server.mjs` for errors.
- Ensure port 4173 is available: `lsof -i :4173`

**Tests pass locally but fail in CI?**
- Node.js version: expect v18+
- Playwright: `npm ls @playwright/test`
- Confirm uploads use CSV fixtures, not `.xls` / `.xlsx`

## Adding Tests

1. Add test in `app.spec.js` using `test()` from `@playwright/test`
2. Use page fixtures: `const { page } = await context.newPage()`
3. Interact: `await page.fill()`, `await page.click()`, etc.
4. Assert: `await expect(page.locator(...)).toContainText(...)`
5. Run: `npx playwright test --grep "your test name"`
6. Update coverage table above

## Playwright Configuration

See `playwright.config.js` at project root:

```javascript
testDir: './Test/e2e',          // Where test files live
outputDir: 'Test/results',      // Test results directory
baseURL: 'http://127.0.0.1:4173', // Dev server URL
headless: true,                 // Hide browser window
timeout: 30000,                 // Per-test timeout (ms)
reporter: ['html', 'list']      // HTML report + console output
```

View HTML report after test run:

```bash
open Test/reports/index.html
```
