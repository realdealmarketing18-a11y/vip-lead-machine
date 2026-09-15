const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

const targetDir = path.join(__dirname, '..', 'sales-pages-oc');
const htmlFiles = getAllHtmlFiles(targetDir);

console.log(`Found ${htmlFiles.length} HTML files to update.`);

let updatedCount = 0;

htmlFiles.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Warranty fix: 1 yr / 1-year -> 2-Year Craftsmanship Guarantee
  content = content.replace(/1\s*yr\s*Insane\s*Warranty/gi, '2-Year Craftsmanship Guarantee');
  content = content.replace(/1-Year\s*Warranty/gi, '2-Year Craftsmanship Guarantee');
  content = content.replace(/1-Year\s*Craftsmanship\s*Guarantee/gi, '2-Year Craftsmanship Guarantee');

  // 2. Typo fix: Stress-Complimentary -> Stress-Free Concierge Experience
  content = content.replace(/Stress-Complimentary\s*Experience/gi, 'Stress-Free Concierge Experience');
  content = content.replace(/Stress-Complimentary/gi, 'Stress-Free Concierge');

  // 3. Tagline fix: both retired variants -> "Visualize It. Love It. Paint It."
  content = content.replace(/See It\. Love It\. Paint It\./gi, 'Visualize It. Love It. Paint It.');
  content = content.replace(/Visualize It\. See It\. Paint It\./gi, 'Visualize It. Love It. Paint It.');

  // 4. Color replacements
  content = content.replace(/#E8833A/gi, '#141838'); // replace legacy orange with navy
  content = content.replace(/#C9A961/gi, '#A88A47'); // replace old bright gold with antique gold #A88A47

  // 5. Logo wordmark font consistency check: set font family to Fraunces for logo wordmark
  content = content.replace(/font-family:\s*['"]?Cormorant Garamond['"]?/gi, "font-family: 'Fraunces', serif");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`Updated: ${path.relative(targetDir, file)}`);
  }
});

console.log(`Successfully updated ${updatedCount} HTML sales pages.`);
