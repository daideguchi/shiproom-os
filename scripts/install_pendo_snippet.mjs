import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const indexPath = path.join(root, 'index.html');
const apiKey = process.env.PENDO_API_KEY || '';
const visitorId = process.env.PENDO_VISITOR_ID || 'shiproom-public-demo';
const accountId = process.env.PENDO_ACCOUNT_ID || 'shiproom-os';

const start = '<!-- Pendo / Novus install: start -->';
const end = '<!-- Pendo / Novus install: end -->';

function assertSafeKey(value) {
  if (!value || value.length < 20) {
    throw new Error('Set PENDO_API_KEY to the real Pendo/Novus install key before running this script.');
  }
  if (/placeholder|fake|demo-key|your[-_ ]?key/i.test(value)) {
    throw new Error('PENDO_API_KEY looks like a placeholder. Refusing to install.');
  }
}

function jsString(value) {
  return JSON.stringify(String(value));
}

function buildSnippet() {
  return `${start}
<script>
  (function(apiKey) {
    (function(p, e, n, d, o) {
      var v, w, x, y, z;
      o = p[d] = p[d] || {};
      o._q = o._q || [];
      v = ['initialize', 'identify', 'updateOptions', 'pageLoad', 'track'];
      for (w = 0, x = v.length; w < x; ++w) (function(method) {
        o[method] = o[method] || function() {
          o._q[method === 'initialize' ? 'unshift' : 'push']([method].concat([].slice.call(arguments, 0)));
        };
      })(v[w]);
      y = e.createElement(n);
      y.async = true;
      y.src = 'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js';
      z = e.getElementsByTagName(n)[0];
      z.parentNode.insertBefore(y, z);
    })(window, document, 'script', 'pendo');

    pendo.initialize({
      visitor: { id: ${jsString(visitorId)} },
      account: { id: ${jsString(accountId)} }
    });
  })(${jsString(apiKey)});
</script>
${end}`;
}

function replaceOrInsert(html, snippet) {
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (pattern.test(html)) {
    return html.replace(pattern, snippet);
  }
  if (!html.includes('</head>')) {
    throw new Error('index.html is missing </head>');
  }
  return html.replace('</head>', `${snippet}\n</head>`);
}

async function main() {
  assertSafeKey(apiKey);
  const html = await readFile(indexPath, 'utf8');
  const next = replaceOrInsert(html, buildSnippet());
  await writeFile(indexPath, next, 'utf8');
  console.log('pendo_snippet_installed');
  console.log(`index=${indexPath}`);
  console.log(`visitor_id=${visitorId}`);
  console.log(`account_id=${accountId}`);
}

main().catch((error) => {
  console.error('pendo_snippet_install_failed');
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
