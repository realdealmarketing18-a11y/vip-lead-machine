const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'extracted_template.html');
const standalonePath = path.join(__dirname, 'VIP-Sales-Page-Desktop-standalone.html');

if (!fs.existsSync(templatePath)) {
  console.error('extracted_template.html not found!');
  process.exit(1);
}

const templateContent = fs.readFileSync(templatePath, 'utf8');
const standaloneContent = fs.readFileSync(standalonePath, 'utf8');

const lines = standaloneContent.split('\n');

// Line 192 (0-indexed 192) is the __bundler/template line
const serialized = JSON.stringify(templateContent);
lines[192] = serialized;

fs.writeFileSync(standalonePath, lines.join('\n'), 'utf8');
console.log('Successfully bundled extracted_template.html into VIP-Sales-Page-Desktop-standalone.html!');
