const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set a good viewport size for the screenshot
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Take the first screenshot (default mode, likely Light Mode)
  console.log('Taking Light Mode screenshot...');
  await page.screenshot({ path: 'skillsync_light_mode.png' });

  // Look for a theme toggle button. We will just click the first button or element that looks like a toggle.
  // Assuming the user has a toggle in the UI (often a button with 'theme' or 'dark' in class/id/text or simply the only button in the header)
  // Let's evaluate to find a likely candidate.
  const clicked = await page.evaluate(() => {
    // Attempt 1: Find something with 'theme' or 'dark' in id/class
    let toggle = document.querySelector('[id*="theme"], [class*="theme"], [id*="dark"], [class*="dark"], button');
    if (toggle) {
      toggle.click();
      return true;
    }
    return false;
  });

  if (clicked) {
    console.log('Clicked theme toggle. Waiting a bit for transition...');
    // Wait for any CSS transitions to finish
    await new Promise(r => setTimeout(r, 1000));
    
    // Take the second screenshot
    console.log('Taking Dark Mode screenshot...');
    await page.screenshot({ path: 'skillsync_dark_mode.png' });
  } else {
    console.log('Could not find a theme toggle button.');
  }

  await browser.close();
  console.log('Done!');
})();
