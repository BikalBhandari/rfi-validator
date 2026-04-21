# Test Validation Checklist

Use this checklist before each merge/deployment to ensure all test gates are met.

## Pre-Merge Checklist

- [ ] Run `npm run verify` and confirm all tests pass
- [ ] All 17 unit tests pass (no skips, no failures)
- [ ] All 9 e2e tests pass (no skips, no failures)
- [ ] No console errors or warnings (CSP, unhandled rejections)
- [ ] No test fixtures modified unintentionally
- [ ] Test results saved to `Test/results/`

## Pre-Deployment Checklist

### Test Execution
- [ ] Fresh clone of code, all tests run and pass
- [ ] `npm run verify` passes on target environment
- [ ] Test coverage report reviewed (>85% baseline)
- [ ] Latest test results documented in `Test/results/`

### Code Quality
- [ ] No high-severity bugs in current release
- [ ] All acceptance criteria marked as tested
- [ ] Code review completed
- [ ] No console errors in browser (dev tools)

### Accessibility & Security
- [ ] WCAG 2.1 AA baseline validation passed
- [ ] CSP violations: 0
- [ ] XSS/injection vectors: none identified
- [ ] Data handling review: all PII stays local

### Documentation
- [ ] Test summary updated ([TEST_SUMMARY.md](TEST_SUMMARY.md))
- [ ] Test documentation current ([unit/README.md](unit/README.md), [e2e/README.md](e2e/README.md))
- [ ] Known issues documented
- [ ] Regression risk assessment complete

### Performance & Load
- [ ] Golden path workflow tested (file upload → match → export)
- [ ] Edge cases tested (empty files, large files, invalid formats)
- [ ] Response times acceptable (<5s for 500 rows)
- [ ] No memory leaks (browser dev tools)

## Post-Deployment Checklist

- [ ] Live system smoke test passed (golden path)
- [ ] Monitoring active (errors, performance, availability)
- [ ] User feedback monitored for issues
- [ ] Rollback plan available if needed

---

## Test Ownership

| Role | Responsibility |
|------|-----------------|
| **Test Agent** | Execute tests, track results, validate checklist |
| **Development Agent** | Ensure code passes all tests before handoff |
| **Product Agent** | Approve acceptance criteria validation |
| **DevOps Agent** | Validate tests pass on target environment |

---

## Troubleshooting

**Tests fail locally but pass in CI?**
- Check Node.js version: `node --version` (expect v18+)
- Confirm the test fixture is CSV, not `.xls` / `.xlsx`
- Delete `node_modules` and reinstall: `npm install`

**Playwright tests hang?**
- Check for browser process: `ps aux | grep chrome`
- Kill stray processes: `killall chrome`
- Restart Claude Code (Playwright MCP requires restart after code changes)

**"500-row limit" error in new test?**
- Tests enforce 500-row ceiling. Validate test data conforms.
- Update test if behavior intentionally changed.

**CSP violation in console?**
- Inline scripts/styles forbidden. Move to external files.
- No external API calls. Use only local data.
- Review `index.html` CSP meta tag.

---

## Sign-Off

**Test Agent:** ___________________ **Date:** __________

**Development Agent:** ___________________ **Date:** __________

**Product Agent:** ___________________ **Date:** __________
