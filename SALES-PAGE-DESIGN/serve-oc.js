const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5460;

// Root the server at the design-system folder so the OC page's relative
// asset paths ( ../../colors_and_type.css , ../../assets/... ) resolve.
const ROOT = path.join(__dirname, 'VIP-Home-Painting-Design-System');
const INDEX = 'ui_kits/sales-page/VIP_OC_DesignSystem_SEO.html';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Redirect root to the page's real path so its relative asset URLs
  // (viz-photos/..., ../../colors_and_type.css) resolve correctly.
  if (urlPath === '/' || urlPath === '') {
    res.writeHead(302, { Location: '/' + INDEX, 'Cache-Control': 'no-store' });
    res.end();
    return;
  }

  const filePath = path.join(ROOT, urlPath);

  // prevent path traversal outside ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('403'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Not found: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',   // always serve the latest edit
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('\n============================================================');
  console.log('   VIP HOME PAINTING — ORANGE COUNTY SEO PAGE (responsive)');
  console.log('============================================================');
  console.log(`\n  Open:  http://localhost:${PORT}/`);
  console.log('  Serving: ' + INDEX);
  console.log('  Cache disabled — just refresh to see edits.');
  console.log('\n  Press Ctrl+C to stop.\n');
});
