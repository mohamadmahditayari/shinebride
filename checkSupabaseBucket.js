const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local not found');
  process.exit(1);
}

const envText = fs.readFileSync(envPath, 'utf8');
const env = envText
  .split(/\r?\n/)
  .filter(Boolean)
  .reduce((acc, line) => {
    const idx = line.indexOf('=');
    if (idx === -1) return acc;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    acc[key] = value;
    return acc;
  }, {});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const bucket = env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'product-images';

console.log('SUPABASE_URL=', url);
console.log('SUPABASE_KEY=', !!key);
console.log('SUPABASE_BUCKET=', bucket);
if (!url || !key) {
  console.error('Missing env');
  process.exit(1);
}

const supabase = createClient(url, key);
(async () => {
  try {
    const res = await supabase.storage.listBuckets();
    console.log('listBuckets:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('listBuckets error:', err.message || err);
  }
  try {
    const res2 = await supabase.storage.from(bucket).list('categories');
    console.log('list path categories result:', JSON.stringify(res2, null, 2));
  } catch (err) {
    console.error('list path categories error:', err.message || err);
  }
})();
