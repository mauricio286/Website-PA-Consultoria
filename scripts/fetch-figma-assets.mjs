import fs from 'fs/promises';
import path from 'path';

const ASSETS_FILE = path.join(process.cwd(), 'src', 'assets.ts');

async function run() {
  try {
    let content = await fs.readFile(ASSETS_FILE, 'utf-8');
    
    // Pattern to match: export const imgVarName = "http://localhost:3845/assets/someHash.svg";
    const regex = /export const \w+ = "http:\/\/localhost:3845\/assets\/[^"]+";\r?\n?/g;
    
    const newContent = content.replace(regex, '');
    
    await fs.writeFile(ASSETS_FILE, newContent, 'utf-8');
    console.log(`Successfully removed all unused Figma HTTP links from assets.ts!`);
    
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
