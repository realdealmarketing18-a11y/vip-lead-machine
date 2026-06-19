const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../vip-painting-design/src'),
  path.join(__dirname, '../frontend-app/src')
];

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (stat.isFile() && (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Replace #FFB200 with #C9A961
      if (/#FFB200/i.test(content)) {
        content = content.replace(/#FFB200/ig, '#C9A961');
        modified = true;
      }

      // Replace rgba/rgb (255,178,0) with (201,169,97)
      if (content.includes('255,178,0') || content.includes('255, 178, 0')) {
        content = content.replace(/255,\s*178,\s*0/g, '201, 169, 97');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated gold shades in: ${fullPath}`);
      }
    }
  }
}

directories.forEach(walkDir);
console.log('Gold shades normalization complete!');
