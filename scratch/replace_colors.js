const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Deprecated to Canonical mapping
const REPLACEMENTS = [
  { search: /#FF8210/gi, replace: '#C9A961' },
  { search: /#262362/gi, replace: '#1A1F4E' },
  { search: /rgba\(38,\s*35,\s*98/gi, replace: 'rgba(26,31,78' },
  { search: /rgba\(38,35,98/gi, replace: 'rgba(26,31,78' },
  { search: /255,\s*130,\s*16/g, replace: '201,169,97' },
  { search: /--shadow-cta-hover/g, replace: 'var(--shadow-gold-hover)' },
  { search: /--shadow-cta/g, replace: 'var(--shadow-gold)' },
  { search: /var\(var\(--shadow-gold\)\)/g, replace: 'var(--shadow-gold)' }, // Clean double var nesting if it happens
  { search: /var\(var\(--shadow-gold-hover\)\)/g, replace: 'var(--shadow-gold-hover)' }
];

const IGNORE_DIRS = [
  'node_modules',
  '.git',
  '.obsidian',
  'dist',
  'build'
];

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        walk(filePath, callback);
      }
    } else {
      callback(filePath);
    }
  }
}

// Process files
walk(ROOT_DIR, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.html', '.css', '.jsx', '.md', '.js'].includes(ext)) {
    return;
  }

  // Skip self
  if (filePath === __filename) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Specific cleanup for duplicate :root in HTML pages (run first on content)
  if (ext === '.html') {
    // If it has a stylesheet link and an inline :root redefining colors, let's clean it up.
    // Check if the file has a :root block
    const rootRegex = /:root\s*\{([^}]*)\}/g;
    let match;
    // We use a temp string to find matches from original but replace on content
    while ((match = rootRegex.exec(original)) !== null) {
      const blockContent = match[1];
      // Check if it's redefining brand variables
      if (blockContent.includes('--vip-gold') || blockContent.includes('--vip-navy')) {
        // Yes, this is a duplicate brand color :root block.
        // We will construct the clean version:
        const cleanRoot = `:root {
  --grad-gold:       linear-gradient(135deg, var(--vip-gold-bright) 0%, var(--vip-gold) 60%, var(--vip-gold-deep) 100%);
  --grad-navy:       linear-gradient(180deg, var(--vip-navy) 0%, var(--vip-navy-deep) 100%);
  --fg-primary:      var(--vip-navy);
  --shadow-inset:    inset 0 1px 0 rgba(255,255,255,0.25);
  --vip-beige-soft:  #E8E0D6;
  --vip-beige:       #BAAEA1;
}`;
        // Since we are replacing the entire match[0] from the original content, we must make sure we replace the equivalent block in content.
        // Since match[0] has deprecated values (like #FF8210) which are still in content (as we haven't run replacements on content yet),
        // we can safely replace match[0] directly on content!
        content = content.replace(match[0], cleanRoot);

        // Add the stylesheet link if not already present
        if (!content.includes('href="assets/css/colors_and_type.css"')) {
          // Find <style> tag to insert before it
          const styleIndex = content.indexOf('<style>');
          if (styleIndex !== -1) {
            const beforeStyle = content.substring(0, styleIndex);
            const afterStyle = content.substring(styleIndex);
            content = beforeStyle + '<link rel="stylesheet" href="assets/css/colors_and_type.css">\n' + afterStyle;
          }
        }
      }
    }
  }

  // 2. Perform standard search & replacements
  for (const rep of REPLACEMENTS) {
    content = content.replace(rep.search, rep.replace);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(ROOT_DIR, filePath)}`);
  }
});

console.log('Search and replace operations finished.');
