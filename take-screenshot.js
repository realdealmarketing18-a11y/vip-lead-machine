const { chromium } = require('playwright');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set standard desktop width
  await page.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  console.log('Scrolling down the page to trigger all Framer Motion animations...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 150; // scroll amount
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        // Stop scrolling when at the bottom
        if (totalHeight >= document.documentElement.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50); // wait 50ms between scrolls
    });
  });

  console.log('Waiting for completely smooth animations to settle...');
  // Wait for 1.5s so everything firmly locks into opacity: 1 and y: 0
  await page.waitForTimeout(1500);
  
  // Scroll back to the top just in case fullPage screenshot takes it from current view
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  console.log('Capturing full layout screenshot...');
  await page.screenshot({ 
    path: 'C:\\Users\\Owner\\Desktop\\VIP-Sales-Page-Design.png', 
    fullPage: true 
  });

  console.log('Done! Image saved to Desktop.');
  await browser.close();
})();
