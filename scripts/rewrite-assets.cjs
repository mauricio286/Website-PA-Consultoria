const fs = require('fs');
const path = require('path');
let code = fs.readFileSync('src/assets.ts', 'utf8');
code = code.replace(/from\s+['"](\.\/assets\/.*?\.(png|jpeg|jpg))['"]/g, (match, p1) => {
  const webpPath = p1.replace(/\.(png|jpeg|jpg)$/, '.webp');
  const fullPath = path.join('src', webpPath.replace('./assets', 'assets'));
  if (fs.existsSync(fullPath)) {
    return `from '${webpPath}'`;
  }
  return match;
});
fs.writeFileSync('src/assets.ts', code);
console.log('Rewrote assets.ts');
