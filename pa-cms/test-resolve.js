import { createRequire } from 'module';
const require = createRequire(import.meta.url);
try {
  const resolved = import.meta.resolve('@payloadcms/next/views');
  console.log('RESOLVED PATH:', resolved);
} catch (e) {
  console.error('ERROR RESOLVING:', e);
}
