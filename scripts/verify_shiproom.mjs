import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = path.resolve('.');
const pagePath = `file://${path.join(root, 'index.html')}`;
const outDir = path.join(root, 'media');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
});

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(pagePath, { waitUntil: 'networkidle' });

  const h1 = await page.locator('h1').innerText();
  if (h1 !== 'Shiproom OS') {
    throw new Error(`unexpected h1: ${h1}`);
  }

  await page.getByRole('button', { name: 'Build Packet' }).click();
  const exportText = await page.locator('#exportOutput').innerText();
  const packet = JSON.parse(exportText);
  if (packet.product !== 'Shiproom OS') {
    throw new Error('launch packet missing product');
  }
  if (!packet.proof_checklist.some((item) => item.includes('Novus.ai'))) {
    throw new Error('Novus proof slot missing');
  }
  if (!packet.evidence_ledger.some((item) => item.name === 'Novus.ai' && item.status === 'verified')) {
    throw new Error('Novus verified evidence missing');
  }
  if (!Array.isArray(packet.learning_loop) || packet.learning_loop.length < 6) {
    throw new Error('learning loop missing');
  }
  if (!packet.learning_loop.some((item) => item.name === 'Activation signal')) {
    throw new Error('activation signal missing from learning loop');
  }
  if (!packet.agent_handoff || !packet.agent_handoff.Stopline || !packet.agent_handoff['Definition of done']) {
    throw new Error('next agent handoff missing');
  }
  if (!packet.judge_snapshot || !packet.judge_snapshot.Who || !packet.judge_snapshot['Human control']) {
    throw new Error('judge snapshot missing');
  }
  if (!packet.analytics_events?.includes('shiproom_packet_built') || !packet.analytics_events?.includes('shiproom_snapshot_saved')) {
    throw new Error('Pendo/Novus event map missing from launch packet');
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  if (!html.includes('safePendoTrack') || !html.includes('shiproom_json_downloaded')) {
    throw new Error('safe Pendo tracking hooks missing');
  }
  const markdown = await page.locator('#markdownOutput').innerText();
  if (!markdown.includes('Judge Snapshot') || !markdown.includes('Evidence Ledger') || !markdown.includes('Learning Loop') || !markdown.includes('Next Agent Brief') || !markdown.includes('Claim Boundary')) {
    throw new Error('markdown launch brief missing required sections');
  }

  const cards = await page.locator('.section').count();
  if (cards < 11) {
    throw new Error(`not enough sections: ${cards}`);
  }
  await page.getByRole('button', { name: 'Save Snapshot' }).click();
  const historyCount = await page.locator('.history-item').count();
  if (historyCount < 1) {
    throw new Error('saved packet history missing');
  }

  const screenshot = path.join(outDir, 'shiproom-os-mvp-full.png');
  await page.screenshot({ path: screenshot, fullPage: true });
  const bytes = fs.statSync(screenshot).size;
  if (bytes < 80_000) {
    throw new Error(`screenshot too small: ${bytes}`);
  }

  console.log('shiproom_verify_ok');
  console.log(`sections=${cards}`);
  console.log(`screenshot=${screenshot}`);
  console.log(`bytes=${bytes}`);
} finally {
  await browser.close();
}
