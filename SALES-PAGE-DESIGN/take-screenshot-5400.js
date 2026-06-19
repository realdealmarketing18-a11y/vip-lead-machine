const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost:5400/ ...');
  try {
    await page.goto('http://localhost:5400/', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (err) {
    console.error('Initial navigation failed, attempting without networkidle...', err.message);
    await page.goto('http://localhost:5400/', { timeout: 15000 });
  }

  // Let the client-side JavaScript unpacker run and swap DOM
  console.log('Waiting for unpacking to complete...');
  await page.waitForTimeout(5000);

  console.log('Capturing full layout screenshot...');
  const screenshotPath = path.join(__dirname, 'screenshot-5400.png');
  await page.screenshot({ 
    path: screenshotPath, 
    fullPage: true 
  });

  console.log(`Done! Image saved to ${screenshotPath}`);
  await browser.close();
})();
