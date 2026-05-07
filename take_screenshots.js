import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'C:\\driving_service\\screenshots';

if (!fs.existsSync(SCREENSHOTS_DIR)){
    fs.mkdirSync(SCREENSHOTS_DIR);
}

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log("Navigating to http://localhost:5173...");
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    console.log("Taking screenshot of top of the page...");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_hero.png') });
    
    // Scroll down to Services section
    await page.evaluate(() => { window.scrollBy(0, 1000); });
    await new Promise(r => setTimeout(r, 1000));
    console.log("Taking screenshot of Services section...");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_services.png') });
    
    // Scroll down further
    await page.evaluate(() => { window.scrollBy(0, 1000); });
    await new Promise(r => setTimeout(r, 1000));
    console.log("Taking screenshot of next section...");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_section3.png') });
    
    // Scroll down further
    await page.evaluate(() => { window.scrollBy(0, 1000); });
    await new Promise(r => setTimeout(r, 1000));
    console.log("Taking screenshot of next section...");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_section4.png') });
    
    // Scroll to bottom
    await page.evaluate(() => { window.scrollTo(0, document.body.scrollHeight); });
    await new Promise(r => setTimeout(r, 1000));
    console.log("Taking screenshot of footer...");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_footer.png') });

    // Full page screenshot
    console.log("Taking full page screenshot...");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_full_page.png'), fullPage: true });

    await browser.close();
    console.log("Done!");
})();
