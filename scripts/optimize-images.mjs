import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src', 'assets');

const optimizeImage = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
    
    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    
    // Only optimize images larger than 500KB to save time, or we can just optimize all.
    // Given the massive files, let's optimize anything over 500KB to be safe.
    if (sizeMB < 0.5) return;

    console.log(`Optimizing: ${filePath} (${sizeMB.toFixed(2)} MB)`);

    const fileBuffer = fs.readFileSync(filePath);
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();

    // Resize if wider than 2560px (to preserve quality on large monitors)
    if (metadata.width > 2560) {
      image.resize(2560, null, { withoutEnlargement: true });
    }

    // Compress based on format
    if (ext === '.png') {
      image.png({ quality: 90, compressionLevel: 9 });
    } else {
      image.jpeg({ quality: 90, progressive: true });
    }

    const buffer = await image.toBuffer();
    fs.writeFileSync(filePath, buffer);
    
    const newStats = fs.statSync(filePath);
    const newSizeMB = newStats.size / (1024 * 1024);
    
    console.log(`✅ Reduced from ${sizeMB.toFixed(2)}MB to ${newSizeMB.toFixed(2)}MB`);
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err);
  }
};

const processDirectory = async (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      await optimizeImage(fullPath);
    }
  }
};

console.log('Starting image optimization...');
await processDirectory(assetsDir);
console.log('Finished image optimization.');
