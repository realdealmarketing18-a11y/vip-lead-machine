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

      // 1. Replace Font Families
      if (content.includes('Cormorant Garamond')) {
        content = content.replace(/Cormorant Garamond/g, 'Fraunces');
        modified = true;
      }
      if (content.includes('CormorantGaramond')) {
        content = content.replace(/CormorantGaramond/g, 'Fraunces');
        modified = true;
      }
      if (content.includes('Montserrat')) {
        content = content.replace(/Montserrat/g, 'Inter');
        modified = true;
      }
      if (content.includes('Poppins')) {
        content = content.replace(/Poppins/g, 'Inter');
        modified = true;
      }

      // 2. Replace Old Brand Orange Hex code (#e8833a / #E8833A) with Primary Gold (#C9A961)
      // for text colors, primary icons, and buttons.
      // We will perform a case-insensitive replacement for #e8833a to #C9A961.
      if (/#e8833a/i.test(content)) {
        content = content.replace(/#e8833a/ig, '#C9A961');
        modified = true;
      }

      // 3. Replace rgb of orange (232, 131, 58) to rgb of gold (201, 169, 97)
      if (content.includes('232,131,58') || content.includes('232, 131, 58')) {
        content = content.replace(/232,\s*131,\s*58/g, '201, 169, 97');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

directories.forEach(walkDir);
console.log('Branding replacement complete!');
