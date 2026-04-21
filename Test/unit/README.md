# Unit Tests

Core logic validation using Node.js `test` runner.

## Running Tests

```bash
npm test                          # Run all unit tests
npm test -- --grep "pattern"      # Run tests matching pattern
```

## Test Files

- `rfi-core.test.js` — Parser, matcher, scorer logic (13 tests)
- `profile-view.test.js` — UI state management (1 test)
- `sample-rfi-template.test.js` — RFI template validation (1 test)
- `security-baseline.test.js` — CSP, data isolation (2 tests)

**Total: 17 tests, all passing**

## Coverage

| Component | Tests | Details |
|-----------|-------|---------|
| Date normalization | 1 | Serial dates, strings, and Date objects normalize to ISO |
| CSV parsing | 1 | Quoted commas, header aliases |
| File diagnostics | 1 | Header field recognition |
| Record comparison | 5 | Email gating, military service matching |
| Best match selection | 1 | Distinct assignments |
| Header canonicalization | 1 | Field aliasing (military service variants) |
| Field display | 1 | Military service label rendering |
| Record count validation | 1 | 500-row limit enforcement |
| CSV download link | 1 | Bulk import panel fixture |
| CSV headers | 1 | Expected import fields |
| CSP baseline | 2 | Inline script/style prohibition, referrer/permission policies |

## Key Constraints

- **500-Row Limit:** Enforced via `validateRecordCount`. Changes require test updates.
- **CSP Compliance:** `index.html` defines restrictive meta tag. No inline scripts/styles.
- **Email Gating:** Exact match required for record comparison (no fuzzy matching).
- **Military Service:** Handles boolean equivalence (1 = true, 0 = false, '' = blank).

## Adding Tests

1. Create new test file: `my-feature.test.js`
2. Import module: `const { myFunction } = require('../../my-module.js');`
3. Write tests using `test()` and `assert`
4. Run `npm test` to verify
5. Update this README with new test counts and coverage details
