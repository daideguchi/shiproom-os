import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const publicUrl = process.env.SHIPROOM_PUBLIC_URL || 'https://daideguchi.github.io/shiproom-os/';
const chromeExecutable =
  process.env.CHROME_EXECUTABLE ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const screenshotPath = path.resolve('media', 'shiproom-public-novus-live-2026-06-11.png');

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes("Executable doesn't exist") || !existsSync(chromeExecutable)) {
      throw error;
    }
    return chromium.launch({ headless: true, executablePath: chromeExecutable });
  }
}

const browser = await launchBrowser();
try {
  mkdirSync(path.dirname(screenshotPath), { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const requests = [];
  page.on('request', (request) => {
    const reqUrl = request.url();
    if (reqUrl.includes('pendo.io')) requests.push(reqUrl);
  });

  const verifyUrl = `${publicUrl}${publicUrl.includes('?') ? '&' : '?'}novus_verify=${Date.now()}`;
  await page.goto(verifyUrl, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.getByRole('button', { name: 'Build Packet' }).click();
  await page.waitForTimeout(2_500);

  const result = await page.evaluate(() => ({
    hasPendo: Boolean(globalThis.pendo),
    hasTrack: typeof globalThis.pendo?.track === 'function',
    hasInitialize: typeof globalThis.pendo?.initialize === 'function',
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    title: document.title,
  }));
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const output = {
    ok: result.hasPendo && result.hasTrack && result.hasInitialize && !result.horizontalOverflow && requests.length > 0,
    url: publicUrl,
    ...result,
    pendoRequestCount: requests.length,
    pendoRequestKinds: [...new Set(requests.map((item) => new URL(item).hostname))],
    screenshot: screenshotPath,
  };

  console.log(JSON.stringify(output, null, 2));
  if (!output.ok) process.exit(1);
} finally {
  await browser.close();
}
