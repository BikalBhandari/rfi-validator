# RFI Validator

A web application for validating Request for Information (RFI) submissions against Salesforce CSV export data, with support for data comparison, filtering, and test data generation.

## Quick Start

```bash
npm install
npm run verify    # Run all checks: syntax, unit tests, e2e tests
npm test          # Run unit tests only
npm run test:e2e  # Run e2e tests with Playwright
npm run check     # Validate syntax
```

## Project Structure

```
.
├── index.html              # UI markup
├── app.js                  # Browser/UI logic
├── rfi-core.js             # Core comparison & parsing logic
├── styles.css              # Styling
│
├── Test/                   # Test suite
│   ├── unit/               # Unit tests
│   ├── e2e/                # End-to-end tests
│   ├── TEST_SUMMARY.md     # Test summary
│   └── TEST_CHECKLIST.md   # Release checklist
│   └── ...
│
├── agents/                 # Claude Code agent workflows
│   ├── Test_Automation_Engineer.md
│   └── ...
│
├── scripts/                # Utility scripts
│   └── static-server.mjs   # Dev server
│
├── Test Data/              # Test fixtures
│   ├── report1775759327714.csv
│   └── report1775759327714_rfi_fixture.json
│
├── .claude/                # Claude Code configuration
│   └── settings.json       # Project settings (Playwright MCP enabled)
│
├── .mcp.json               # MCP server definitions
├── playwright.config.js    # Playwright test config
└── package.json            # Dependencies & scripts
```

## Features

### Core Functionality
- **RFI Input Form** — Manually enter RFI submission data
- **CSV Import** — Bulk import RFI submissions from CSV
- **Salesforce Upload** — Upload Salesforce export files (CSV)
- **Data Comparison** — Match RFI submissions against Salesforce records
- **Results Export** — Download matched results as CSV

### Data Comparison
- Email-required matching (exact match gating)
- Weighted field scoring (name, date, phone, etc.)
- Military service field handling (boolean equivalence)
- Unique record assignment (no double-matching)
- Confidence-based result ranking

### Test Data Generator
- Synthetic RFI record generation
- Configurable identifiers, browser, device
- US & international phone formats
- Batch ID & email generation
- JSON export

### Security
- Restrictive Content-Security-Policy (CSP)
- No referrer header leakage
- Browser permission restrictions (no camera, mic, geolocation)
- Client-side only (no server required)

## Testing

### Unit Tests (17 tests)
Document: [Test/unit/README.md](Test/unit/README.md)

Covers:
- Date parsing (serial dates, strings, Date objects)
- CSV parsing & field canonicalization
- Comparison logic (email requirement, field scoring)
- Military service field handling
- Record uniqueness
- Security baseline (CSP, permissions)

### E2E Tests (9 tests)
Document: [Test/e2e/README.md](Test/e2e/README.md)

Covers:
- Golden-path workflow (upload → compare → download)
- RFI import & deduplication
- Upload size validation (500-row limit for Salesforce and RFI CSVs)
- CSV-only Salesforce upload validation
- Test data generator (download, international formats, batch controls)
- Stale result invalidation after test-data injection

**All tests pass:** `npm run verify` ✓

## Deployment

### Internal Release Readiness
- Syntax check passing
- 17/17 unit tests passing
- 9/9 e2e tests passing
- Security hardened (CSP, referrer policy)
- No hardcoded credentials

### Before Deploying
1. Set up static file server (Node, nginx, CDN, etc.)
2. Configure environment variables (API endpoints, logging)
3. Add deployment manifests (Docker, k8s)
4. Set up CI/CD pipeline
5. Configure monitoring & logging

## Development

### Browser Automation
Playwright MCP is configured for live browser testing. Restart Claude Code to enable.

```bash
# Configured in .mcp.json and .claude/settings.json
npx @anthropic-ai/playwright-mcp
```

### Adding Tests
- Unit tests: `Test/unit/*.test.js` (Node test runner)
- E2E tests: `Test/e2e/*.spec.js` (Playwright)

Both run via `npm run verify`.

### File Size
Upload limit: **500 rows per dataset** (enforced for Salesforce exports and RFI rows in unit/e2e coverage)

## Technology Stack

- **Frontend:** Vanilla JavaScript (no frameworks)
- **Testing:** Node's built-in test module, Playwright
- **Data Parsing:** Native CSV parsing
- **Build:** NPM scripts
- **Automation:** Playwright MCP (Claude Code)

## Documentation

- [Unit Test Documentation](Test/unit/README.md)
- [E2E Test Documentation](Test/e2e/README.md)
- [Minimal Release File List](RELEASE_FILES.md)
- [Agent Workflows](agents/)
- [RFI Validator PRD](RFI_Validator_PRD.md)

## License

See repository license file.
