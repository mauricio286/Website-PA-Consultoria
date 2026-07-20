import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Carrega a URL da API priorizando variáveis de ambiente do sistema, .env.production ou .env
let apiUrl = process.env.VITE_API_URL || process.env.PAYLOAD_URL || '';

if (!apiUrl) {
  const envProdPath = path.join(rootDir, '.env.production');
  const envPath = path.join(rootDir, '.env');
  const targetEnv = (process.env.NODE_ENV === 'production' && fs.existsSync(envProdPath)) ? envProdPath : (fs.existsSync(envPath) ? envPath : envProdPath);

  if (fs.existsSync(targetEnv)) {
    const envContent = fs.readFileSync(targetEnv, 'utf-8');
    const match = envContent.match(/VITE_API_URL\s*=\s*(.+)/);
    if (match && match[1]) {
      apiUrl = match[1].trim().replace(/^['"]|['"]$/g, '');
    }
  }
}

if (!apiUrl) {
  apiUrl = 'http://localhost:3000';
}

console.log(`[Sync CMS] Conectando ao Payload CMS em: ${apiUrl}`);

const outputDataDir = path.join(rootDir, 'src', 'data', 'cms');
const outputMediaDir = path.join(rootDir, 'public', 'cms-media');

if (!fs.existsSync(outputDataDir)) {
  fs.mkdirSync(outputDataDir, { recursive: true });
}
if (!fs.existsSync(outputMediaDir)) {
  fs.mkdirSync(outputMediaDir, { recursive: true });
}

const LOCALES = ['pt', 'en'];

const GLOBALS = [
  'home-page',
  'about-page',
  'services-page',
  'careers-page',
  'contact-settings',
  'site-settings',
  'footer-settings',
  'ald-bioenergia-page',
  'lavoura-page',
  'centro-pesquisa-page',
  'palestras-page',
];

const COLLECTIONS = [
  { slug: 'services', query: '?limit=100' },
  { slug: 'jobs', query: '?sort=order&where[visible][equals]=true' },
  { slug: 'map-locations', query: '?limit=100&sort=order&where[published][equals]=true' },
  { slug: 'testimonials', query: '?limit=100&sort=order&where[published][equals]=true' },
];

// Cache de downloads para evitar baixar a mesma imagem 2x
const downloadedMedia = new Map();

async function downloadMedia(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return rawUrl;
  
  // Se for base64 ou link externo que não é mídia do servidor, mantém
  if (rawUrl.startsWith('data:')) return rawUrl;

  let fullUrl = rawUrl;
  if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
    fullUrl = `${apiUrl.replace(/\/$/, '')}/${rawUrl.replace(/^\//, '')}`;
  }

  if (downloadedMedia.has(fullUrl)) {
    return downloadedMedia.get(fullUrl);
  }

  try {
    const urlObj = new URL(fullUrl);
    let filename = path.basename(urlObj.pathname);
    if (!filename || !filename.includes('.')) {
      filename = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.jpg`;
    }
    
    // Limpa nome de arquivo para evitar caracteres inválidos
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const localFilePath = path.join(outputMediaDir, filename);
    const publicUrlPath = `/cms-media/${filename}`;

    if (!fs.existsSync(localFilePath)) {
      console.log(`  └─ Baixando mídia: ${filename}`);
      const res = await fetch(fullUrl);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(localFilePath, buffer);
      } else {
        console.warn(`  ⚠️ Falha ao baixar mídia (${res.status}): ${fullUrl}`);
        return fullUrl;
      }
    }

    downloadedMedia.set(fullUrl, publicUrlPath);
    return publicUrlPath;
  } catch (err) {
    console.warn(`  ⚠️ Erro ao processar mídia ${fullUrl}:`, err.message);
    return rawUrl;
  }
}

async function processObjectMedia(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    const newArr = [];
    for (const item of obj) {
      newArr.push(await processObjectMedia(item));
    }
    return newArr;
  }

  // Se for um objeto de Media do Payload (possui id e url)
  if (obj.url && typeof obj.url === 'string') {
    const newMediaUrl = await downloadMedia(obj.url);
    const copy = { ...obj, url: newMediaUrl };
    if (copy.filename) {
      copy.filename = path.basename(newMediaUrl);
    }
    return copy;
  }

  const copy = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string' && (val.startsWith('/media/') || val.startsWith('/api/media/') || val.match(/\.(png|jpe?g|svg|webp|gif)$/i))) {
      copy[key] = await downloadMedia(val);
    } else if (typeof val === 'object' && val !== null) {
      copy[key] = await processObjectMedia(val);
    } else {
      copy[key] = val;
    }
  }

  return copy;
}

async function fetchFromCms(endpoint) {
  const url = `${apiUrl.replace(/\/$/, '')}${endpoint}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} em ${url}`);
  }
  return res.json();
}

async function syncLocale(locale) {
  console.log(`\n[Sync CMS] Sincronizando dados para o idioma: [${locale.toUpperCase()}]...`);
  const data = {
    globals: {},
    collections: {},
    syncedAt: new Date().toISOString(),
  };

  // Sync Globals
  for (const globalSlug of GLOBALS) {
    try {
      const rawData = await fetchFromCms(`/api/globals/${globalSlug}?locale=${locale}`);
      data.globals[globalSlug] = await processObjectMedia(rawData);
      console.log(`  ✓ Global carregado: ${globalSlug}`);
    } catch (err) {
      console.warn(`  ⚠️ Falha ao carregar Global [${globalSlug}]: ${err.message}`);
    }
  }

  // Sync Collections
  for (const item of COLLECTIONS) {
    try {
      const sep = item.query.includes('?') ? '&' : '?';
      const rawData = await fetchFromCms(`/api/${item.slug}${item.query}${sep}locale=${locale}`);
      const docs = rawData.docs || [];
      data.collections[item.slug] = await processObjectMedia(docs);
      console.log(`  ✓ Coleção carregada: ${item.slug} (${docs.length} itens)`);
    } catch (err) {
      console.warn(`  ⚠️ Falha ao carregar Coleção [${item.slug}]: ${err.message}`);
    }
  }

  const jsonFileName = `cms-${locale}.json`;
  const jsonFilePath = path.join(outputDataDir, jsonFileName);
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`[Sync CMS] Dados gravados com sucesso em: src/data/cms/${jsonFileName}`);
}

async function main() {
  try {
    // Testa se o servidor CMS está rodando
    try {
      await fetch(`${apiUrl}/api/globals/site-settings?locale=pt`);
    } catch (e) {
      console.warn(`\n⚠️ ATENÇÃO: O servidor Payload CMS em ${apiUrl} parece estar OFFLINE.`);
      console.warn(`O build continuará utilizando os dados estáticos gravados anteriormente em src/data/cms/.\n`);
      return;
    }

    for (const locale of LOCALES) {
      await syncLocale(locale);
    }
    console.log(`\n[Sync CMS] Sincronização concluída com sucesso! 🎉\n`);
  } catch (error) {
    console.error(`\n[Sync CMS] Erro durante a sincronização:`, error);
  }
}

main();
