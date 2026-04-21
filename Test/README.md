# Test Suite

All tests for the RFI Validator are consolidated under this folder. Run tests from the project root with `npm run verify`.

## Structure

```
Test/
├── unit/                 # Unit tests (17 tests)
│   ├── README.md        # Unit test documentation
│   ├── rfi-core.test.js
│   ├── profile-view.test.js
│   ├── sample-rfi-template.test.js
│   └── security-baseline.test.js
│
├── e2e/                  # End-to-end tests (6+ tests)
│   ├── README.md        # E2E test documentation
│   └── app.spec.js      # Playwright browser workflow tests
│
├── data/                 # Test fixtures & sample data
│   ├── report1775759327714.csv       # Salesforce export fixture
│   └── report1775759327714_rfi_fixture.json  # RFI fixture
│
├── results/              # Latest test run results
│   ├── app-browser-workflow-...
│   └── [other test result dirs]
│
├── reports/              # Playwright HTML reports
│   └── index.html       # Visual e2e test report
│
├── TEST_SUMMARY.md      # Test overview & coverage
├── TEST_CHECKLIST.md    # Pre-release validation gates
└── README.md            # This file
```

## Running Tests

```bash
# All tests (unit + e2e)
npm run verify

# Unit tests only
npm test

# E2E tests only
npm run test:e2e

# Specific e2e test
npx playwright test --grep "test name"

# E2E tests in headed mode (see browser)
npx playwright test --headed
```

## Test Counts

- **Unit Tests:** 17 ✅
- **E2E Tests:** 6+ ✅
- **Total:** 23+ all passing

## Test Documentation

- [Unit Tests](unit/README.md) — Parser, comparison, security baseline
- [E2E Tests](e2e/README.md) — Browser workflows, file upload, data import
- [Test Summary](TEST_SUMMARY.md) — Coverage overview & validation gates
- [Test Checklist](TEST_CHECKLIST.md) — Pre-release validation checklist

## Key Constraints

- **500-Row Limit:** Enforced at both unit-test and e2e-test boundaries
- **CSP Compliance:** No inline scripts/styles, no external API calls
- **Email Gating:** Exact match required (no fuzzy matching)
- **Military Service:** Boolean equivalence (1=true, 0=false, ''=blank)

## Test Results & Reports

After running tests:

- **Unit test results:** Displayed in console during `npm test`
- **E2E test results:** `Test/results/` (debug info, fixtures)
- **E2E HTML report:** `Test/reports/index.html` (visual browser report)

View the Playwright report:

```bash
open Test/reports/index.html
```

## Adding New Tests

**Unit tests:**
1. Create `Test/unit/my-feature.test.js`
2. Import module: `require('../../my-module.js')`
3. Write tests with `test()` and `assert`
4. Run `npm test` to verify

**E2E tests:**
1. Add test to `Test/e2e/app.spec.js`
2. Use Playwright API: `page.fill()`, `page.click()`, `expect()`
3. Run `npx playwright test --grep "your test name"`

**Update documentation:**
- Update [unit/README.md](unit/README.md) or [e2e/README.md](e2e/README.md) with new test counts & coverage
- If test expectations change, update [TEST_SUMMARY.md](TEST_SUMMARY.md)

## Validation Gates

**Before Merging:**
- [ ] `npm run verify` passes
- [ ] All 17 unit tests pass
- [ ] All e2e tests pass
- [ ] No CSP violations in console

**Before Deploying:**
- [ ] All tests pass on target environment
- [ ] No high-severity bugs
- [ ] Test results documented (save output from `npm run verify`)
- [ ] Accessibility validation passed (WCAG 2.1 AA)
- [ ] Use [TEST_CHECKLIST.md](TEST_CHECKLIST.md) for full pre-deployment checklist

## Ownership

| Role | Responsibility |
|------|-----------------|
| **Test Agent** | Maintain tests, validate results, track coverage |
| **Development Agent** | Ensure code passes all tests before handoff |
| **Product Agent** | Approve acceptance criteria validation |
| **DevOps Agent** | Verify tests pass on target environment |

See [Agent_Charter.md](../Phase/Agent_Charter.md) for full SDLC roles.
