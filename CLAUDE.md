# Claude Code Instructions for RFI Validator

## Project Context

RFI Validator is a client-side web application for matching Request for Information submissions against Salesforce CSV export data. It's deployment-ready with full test coverage (17 unit + 9 e2e tests).

**Current Status:** ✅ Ready for non-prod deployment

## Test Coverage

- **Unit Tests (17):** Core logic, CSV parsing, comparison, security baseline
- **E2E Tests (9):** Full workflows, data import, generator, boundary validation
- **Command:** `npm run verify` (runs syntax check, unit tests, e2e tests)

All tests **pass without skips or failures.**

## Before Making Changes

1. **Run tests first:** `npm run verify` — ensures baseline is solid
2. **Modify code only after tests pass** — don't debug against broken baseline
3. **If tests fail after your changes,** fix them before leaving

## Key Files

| File | Purpose |
|------|---------|
| `rfi-core.js` | Core business logic: parsing, comparison, scoring |
| `app.js` | UI event handlers & DOM state management |
| `index.html` | HTML structure (restrictive CSP) |
| `styles.css` | Styling |
| `Test/` | All tests: unit, e2e, fixtures, results, reports |
| `Test/unit/` | Unit tests (Node test runner) — 17 tests |
| `Test/e2e/` | E2E tests (Playwright) — 9 tests |
| `Test/data/` | Test fixtures & sample data |
| `Test/results/` | Latest test run results & artifacts |
| `Test/reports/` | Playwright HTML reports |

## Architecture Notes

**No Frameworks:** Vanilla JavaScript for simplicity and a minimal dependency footprint.

**Security First:** CSP forbids inline scripts/styles, external connections, form submissions. Data stays local.

**500-Row Limit:** Enforced at both unit-test and e2e-test boundaries. Changes to this limit require test updates.

**Comparison Logic:** Email is a gating field (exact match required). All other fields use weighted scoring.

**Military Service Field:** Handles boolean equivalence (1 = true, 0 = false, '' = blank/inactive). Multiple field names map to one field (Military Service, Military Status).

## Common Tasks

### Adding a Feature
1. Write test first (unit or e2e)
2. Implement in `rfi-core.js` or `app.js`
3. Run `npm run verify` — test must pass
4. Update test documentation ([test/README.md](test/README.md) or [e2e/README.md](e2e/README.md))

### Fixing a Bug
1. Find the failing test (unit or e2e)
2. Reproduce in the test
3. Fix the code
4. `npm run verify` until passing
5. No doc changes needed unless behavior changes

### Updating Dependencies
- Keep runtime dependencies minimal.
- After dependency changes, run `npm run verify` to check compatibility.

### Deploying
The app is ready for non-prod now. For prod:
- Add environment variable support (API endpoints, logging level, etc.)
- Set up static file server
- Add deployment manifests (Docker/k8s)
- Configure CI/CD to run `npm run verify` on every commit
- Add monitoring/logging

## Code Style

- **No comments unless WHY is non-obvious.** Well-named functions need no explanation.
- **No premature abstraction.** Three similar lines is fine; don't DRY it out.
- **No error handling for impossible cases.** Trust framework guarantees.
- **No feature flags or backwards-compat shims.** Just change the code.

## When Stuck

- Check test documentation: [Test/unit/README.md](Test/unit/README.md), [Test/e2e/README.md](Test/e2e/README.md), [Test/TEST_SUMMARY.md](Test/TEST_SUMMARY.md)
- Read the failing test — it shows expected behavior
- Run a single test: `npx playwright test --grep "test name"`
- Check git history: `git log --oneline -10` (understand recent changes)

## Don't Forget

- **Always test before committing.** `npm run verify` is your safety net.
- **Update test docs if test expectations change.**
- **Keep runtime assets checked in.** The release bundle should remain runnable after clone.
- **Playwright MCP requires restart** — after changes to `.mcp.json`, restart Claude Code.

## Testing the UI

For manual UI testing:
1. Start a local server: `node scripts/static-server.mjs`
2. Open `http://127.0.0.1:4173`
3. Use the test fixtures: 
   - RFI fixture: `Test Data/report1775759327714_rfi_fixture.json`
   - CSV export: `Test Data/report1775759327714.csv`
4. Check browser console for errors (CSP violations, etc.)

## Playwright MCP

Configured in `.mcp.json` and enabled in `.claude/settings.json`. Use it to automate browser testing:
- Open browser sessions
- Fill forms
- Upload files
- Assert UI state
- Take screenshots

See [agents/Test_Automation_Engineer.md](agents/Test_Automation_Engineer.md) for automation workflows.
