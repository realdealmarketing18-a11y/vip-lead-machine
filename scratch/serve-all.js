const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5450;
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url);
  
  // Default to main Orange County landing page
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/SALES-PAGE-DESIGN/VIP_OC_SalesPage_SEO.html';
  }

  const filePath = path.join(ROOT_DIR, reqPath);

  // Safety check to prevent escaping directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    });
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('\n============================================================');
  console.log('       VIP PREMIER PAINTING — LOCAL PREVIEW SERVER');
  console.log('============================================================');
  console.log(`\nServing files from: ${ROOT_DIR}`);
  console.log(`\nPreview URL: http://localhost:${PORT}`);
  console.log('City pages are linked and reachable from the main page grid!');
  console.log('\nPress Ctrl+C to stop the server.\n');
});
