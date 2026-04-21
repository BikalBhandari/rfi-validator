# Minimal Release File List

This project is a static browser app. For a minimal internal release, ship only the runtime files below.

## Required Runtime Files

- `index.html`
- `app.js`
- `rfi-core.js`
- `styles.css`

## Optional Runtime Files

- `sample_rfi-entered_timestamp.csv`
  Keep this if you want the in-app sample CSV download link to work.
- `scripts/static-server.mjs`
  Keep this only if you plan to use the bundled Node static server instead of another internal web server.
- `package.json`
- `package-lock.json`
  Keep these only if you want to reinstall dependencies or run local validation commands on the release host.

## Not Needed In The Release Artifact

- `node_modules/`
- `Test/`
- `playwright.config.js`
- `playwright-global-setup.js`
- `.mcp.json`
- `.claude/`
- `.github/`
- `agents/`
- `Phase/`
- `CLAUDE.md`
- `README.md`
- `INSTALLATION.md`
- `RFI_Validator_PRD.md`
- `test-cases.csv`
- `test-summary.csv`

## Recommended Internal Hosting Layout

If you are publishing a static release bundle, the smallest practical layout is:

```text
index.html
app.js
rfi-core.js
styles.css
sample_rfi-entered_timestamp.csv   # optional
```
