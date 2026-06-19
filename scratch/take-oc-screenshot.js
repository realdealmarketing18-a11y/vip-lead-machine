const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log('Launching headless browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport to standard luxury desktop size
  await page.setViewportSize({ width: 1440, height: 900 });
  
  const fileUrl = 'file:///' + path.resolve(__dirname, '../SALES-PAGE-DESIGN/VIP_OC_SalesPage_SEO.html').replace(/\\/g, '/');
  console.log(`Navigating to direct file URL: ${fileUrl}`);
  
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
  
  // Give it a moment to render properly
  await page.waitForTimeout(1000);
  
  const screenshotPath = 'C:/Users/Owner/.gemini/antigravity-ide/brain/9a2c783f-35d3-4ffa-8861-721f423f7da3/oc-preview.png';
  console.log(`Capturing full-page screenshot to: ${screenshotPath}`);
  
  await page.screenshot({ 
    path: screenshotPath, 
    fullPage: true 
  });

  console.log('Successfully captured screenshot!');
  await browser.close();
})();
