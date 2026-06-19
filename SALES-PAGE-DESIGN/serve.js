const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5400;
const FILE_NAME = 'VIP-Sales-Page-Desktop-standalone.html';
const FILE_PATH = path.join(__dirname, FILE_NAME);

if (!fs.existsSync(FILE_PATH)) {
  console.error(`Error: ${FILE_NAME} not found at ${FILE_PATH}`);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toLocaleTimeString()}] Request received: ${req.url}`);

  // Serve the standalone HTML file for any path
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('\n============================================================');
  console.log('       VIP PREMIER PAINTING — LOCAL PREVIEW SERVER');
  console.log('============================================================');
  console.log(`\nYour landing page is now live and hosted locally!`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log('\nPress Ctrl+C to stop the server.\n');
});
