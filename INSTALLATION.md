# RFI Validator - Installation Guide for Beginners

Welcome! This guide walks you through setting up RFI Validator on your computer from scratch. No prior experience needed.

## What is RFI Validator?

RFI Validator is a web application that helps match Request for Information (RFI) submissions against Salesforce data. You run it in your browser, upload files, and it finds matches locally on your computer—no internet connection required for the app to work.

## Prerequisites

Before you start, you need:

1. **Node.js and npm** — JavaScript runtime and package manager
2. **Git** (optional, but helpful) — Version control
3. **A text editor** — To edit files (VS Code, Sublime, etc.)
4. **A web browser** — Chrome, Firefox, Safari, or Edge

### Do I have Node.js installed?

Open your terminal/command prompt and run:

```bash
node --version
npm --version
```

**Expected output:** Two version numbers (e.g., `v20.10.0` and `10.2.3`)

If you see "command not found," proceed to the installation section below.

---

## Step 1: Install Node.js

Node.js includes npm, so installing Node.js gives you both.

### macOS (using Homebrew)

If you have Homebrew:

```bash
brew install node
```

If you don't have Homebrew, install it first:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then run the Node.js install command above.

### macOS (manual download)

1. Go to [nodejs.org](https://nodejs.org)
2. Click the **LTS** (Long Term Support) button
3. Download the macOS installer
4. Run the installer and follow prompts
5. Restart your terminal

### Windows

1. Go to [nodejs.org](https://nodejs.org)
2. Click the **LTS** (Long Term Support) button
3. Download the Windows installer
4. Run the installer
5. Follow all prompts (leave defaults)
6. Restart your computer
7. Open Command Prompt or PowerShell

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verify Installation

After installation, verify in your terminal:

```bash
node --version
npm --version
```

You should see version numbers.

---

## Step 2: Get the Code

You have two options:

### Option A: Using Git (Recommended)

```bash
git clone <repository-url>
cd "RFI Validator"
```

Replace `<repository-url>` with your project's Git URL.

### Option B: Manual Download

1. Download the project as a ZIP file
2. Extract it to your Documents folder (or Desktop)
3. Open terminal and navigate to the folder:

```bash
cd ~/Desktop/"RFI Validator"
```

(On Windows, use backslashes or open PowerShell in the folder)

---

## Step 3: Install Dependencies

Navigate into the project folder and install required packages:

```bash
npm install
```

This command:
- Reads `package.json` (the recipe for what's needed)
- Downloads the Playwright test tooling
- Creates a `node_modules/` folder (don't edit this)

**Expected output:** Completes with "added X packages" message. Takes 1-2 minutes.

---

## Step 4: Run Tests (Optional but Recommended)

Verify everything works:

```bash
npm run verify
```

This command:
- Checks for syntax errors in the code
- Runs 17 unit tests
- Runs 9 end-to-end browser tests

**Expected output:** All tests pass with checkmarks (✓).

If any test fails, don't panic—see the Troubleshooting section below.

---

## Step 5: Start the Local Server

Run the development server:

```bash
node scripts/static-server.mjs
```

**Expected output:**
```
Static server listening on all interfaces (0.0.0.0):4173
Local URL: http://127.0.0.1:4173
```

By default, the server binds to `0.0.0.0`, which means it can be reached from other machines on the same network if your firewall allows it.

If you want local-only access on your own machine:

```bash
HOST=127.0.0.1 node scripts/static-server.mjs
```

---

## Step 6: Open in Browser

Open your web browser and go to:

```
http://127.0.0.1:4173
```

If you're accessing the app from another machine on your internal network, use this computer's hostname or LAN IP with port `4173`, for example:

```
http://your-machine-name:4173
```

You should see the RFI Validator interface with:
- A form to enter RFI data
- File upload buttons
- A results section

---

## Step 7: Test with Sample Data

The project includes test data you can use:

1. Click **Choose CSV to Import** (or equivalent button)
2. Navigate to `Test Data/` folder
3. Select `report1775759327714.csv`
4. Follow the prompts to upload and compare

You should see matched results displayed.

---

## How to Stop the Server

In your terminal, press:

```
Ctrl+C
```

(On macOS, it's also Cmd+C)

---

## Troubleshooting

### "npm: command not found"

Node.js isn't installed or not in your PATH. Go back to Step 1 and install Node.js.

After installation, **restart your terminal completely** (close and reopen).

### "npm install" takes forever or fails

This is usually a network issue. Try:

```bash
npm install --no-audit --no-fund
```

Or clear npm cache:

```bash
npm cache clean --force
npm install
```

### Tests fail after installation

First, make sure you're in the right folder:

```bash
pwd
```

Should show: `/Users/your-username/Desktop/RFI Validator` (or similar)

Then try again:

```bash
npm run verify
```

If a specific test fails, run just that test to see the error:

```bash
npm test
```

### "Only CSV exports are supported"

This is expected if you upload an Excel file. The validator now accepts Salesforce exports in CSV format only.

Use:

```bash
CSV export from Salesforce
```

If your source file is `.xls` or `.xlsx`, re-export it as `.csv` and upload that file instead.

### Server won't start ("Port 4173 already in use")

Another process is using port 4173. Either:

1. Kill the other process, or
2. Start the server on a different port

Then run:

```bash
PORT=3000 node scripts/static-server.mjs
```

### Browser shows blank page or errors

1. Open the browser's **Developer Tools** (F12 or Cmd+Option+I)
2. Look at the **Console** tab
3. Check for red error messages
4. Try a hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)

---

## Common Tasks

### Run just unit tests

```bash
npm test
```

### Run just browser tests

```bash
npm run test:e2e
```

### Check code for syntax errors

```bash
npm run check
```

### Stop the server

Press `Ctrl+C` in the terminal

### Reinstall everything from scratch

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## What's Next?

Once the server is running and you see the app in your browser:

1. **Explore the UI** — Click buttons, upload test files
2. **Read the docs** — Check `test/README.md` for how tests work
3. **Make changes** — Edit `app.js` or `rfi-core.js` and see changes in the browser
4. **Run tests after changes** — Always run `npm run verify` before considering work done

---

## Getting Help

- **Stuck on Node.js?** See [Node.js official docs](https://nodejs.org/docs/)
- **Questions about the app?** Check `README.md` in the project root
- **Test documentation?** Read `test/README.md` and `e2e/README.md`
- **Code issues?** Check `CLAUDE.md` for project-specific guidance

---

## Quick Cheat Sheet

```bash
# After navigating to the project folder:

npm install              # Install dependencies (do this once)
npm run verify           # Run all checks & tests
npm test                 # Run unit tests only
npm run test:e2e         # Run browser tests only
npm run check            # Check syntax
node scripts/static-server.mjs  # Start the web server
```

Then open `http://127.0.0.1:4173` in your browser.

---

Happy coding! 🚀
