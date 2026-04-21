const fs = require('fs');
const path = require('path');

module.exports = async () => {
  // Clean test results directories before running tests
  const dirs = ['test-results', 'playwright-report'];
  for (const dir of dirs) {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✓ Cleaned ${dir}/`);
    }
  }
};
