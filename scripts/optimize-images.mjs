import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'src', 'assets');

const optimizeImage = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    
    // Only process jpg and png, ignore existing webp
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;
    
    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    
    // Convert anything above 100KB to webp for massive savings
    if (sizeMB < 0.1) return;

    console.log(`Optimizing & Converting to WebP: ${filePath} (${sizeMB.toFixed(2)} MB)`);

    const fileBuffer = fs.readFileSync(filePath);
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();

    // Resize if wider than 2560px
    if (metadata.width > 2560) {
      image.resize(2560, null, { withoutEnlargement: true });
    }

    // Convert to webp
    image.webp({ quality: 80, effort: 6 });

    // Output file path
    const parsedPath = path.parse(filePath);
    const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    const buffer = await image.toBuffer();
    fs.writeFileSync(outputPath, buffer);
    
    // Delete the original file to clean up the assets folder
    fs.unlinkSync(filePath);
    
    const newStats = fs.statSync(outputPath);
    const newSizeMB = newStats.size / (1024 * 1024);
    
    console.log(`✅ Converted to WebP. Reduced from ${sizeMB.toFixed(2)}MB to ${newSizeMB.toFixed(2)}MB`);
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
