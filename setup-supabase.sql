-- ============================================
-- ShineBride Supabase Database Setup
-- execute this in Supabase SQL Editor
-- ============================================

-- ============================================
-- STEP 1: Create Extension for UUID (if not exists)
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================
-- STEP 2: Create Categories Table
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);


-- ============================================
-- STEP 3: Create Products Table
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,  -- Stored as string for Persian formatting (e.g., "1.550")
  description TEXT,
  category TEXT NOT NULL,  -- Matches categories.slug
  slug TEXT NOT NULL,
  cover TEXT,  -- Main image URL
  images TEXT[],  -- Array of image URLs
  
  -- For sorting and filtering
  is_featured BOOLEAN DEFAULT false,
  stock_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint for product slug within category
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_category_slug 
  ON products(category, slug);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;


-- ============================================
-- STEP 4: Create Storage Bucket for Product Images
-- ============================================
-- Note: This is created in Supabase Storage, not via SQL
-- But you can verify it exists with:
-- SELECT * FROM storage.buckets WHERE name = 'product-images';


-- ============================================
-- STEP 5: Enable Row Level Security Policies
-- ============================================

-- Enable RLS on categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to categories
CREATE POLICY "Allow public read access to categories"
ON categories FOR SELECT USING (true);

-- Allow admin to manage categories (if you have auth)
CREATE POLICY "Allow admin to manage categories"
ON categories 
  FOR ALL USING (
    -- Replace with your admin check logic
    -- Example: auth.uid() = 'admin-user-id'
    true  -- For now, allow all (change this for production)
  );


-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to products
CREATE POLICY "Allow public read access to products"
ON products FOR SELECT USING (true);

-- Allow admin to manage products
CREATE POLICY "Allow admin to manage products"
ON products 
  FOR ALL USING (
    true  -- For now, allow all (change this for production)
  );


-- ============================================
-- STEP 6: Insert Sample Categories (Optional)
-- ============================================
-- Uncomment if you want sample data
/*
INSERT INTO categories (name, slug, image, description) VALUES
  ('اسپند دود کن', 'esfand', '/images/esfand/esfand.jpg', 'اسپند دود کن و محصولات مرتبط'),
  ('ست بله برون', 'baleh', '/images/baleh/baleh.jpg', 'ست بله برون و لوازم جانبی'),
  ('گیفت', 'gift', '/images/gift/gift.jpg', 'هدایای خاص و مناسبت‌ها'),
  ('گیفت ماشین', 'car', '/images/car/car.jpg', 'هدایای مخصوص ماشین'),
  ('پلکسی', 'plexi', '/images/plexi/plexi.jpg', 'محصولات پلکسی'),
  ('آباژور', 'abajour', '/images/abajour/abajour.jpg', 'آباژور و لوازم دکوراسیون');
*/


-- ============================================
-- STEP 7: Insert Sample Products (Optional)
-- ============================================
-- Uncomment if you want sample data
/*
INSERT INTO products (name, price, description, category, slug, cover, images, is_featured) VALUES
  ('اسپند دود کن اقتصادی', '1.550', 'اسپند دود کن کلاسیک با طراحی شیک', 'esfand', 'em', '/images/esfand/em/1.jpg', ARRAY['/images/esfand/em/1.jpg'], true),
  ('ست وی‌ای‌پی ترک', '5.580', 'ست لوکس و خاص برای مراسم', 'esfand', 'vip', '/images/esfand/vip/1.jpg', ARRAY['/images/esfand/vip/1.jpg', '/images/esfand/vip/2.jpg'], true),
  ('ست استیل دو تکه', '1.980', 'طرح ساده و شیک', 'esfand', 'amjad', '/images/esfand/amjad/1.jpg', ARRAY['/images/esfand/amjad/1.jpg'], true),
  ('ست بله برون کلاسیک', '3.200', 'تکمیل کننده زیبایی', 'baleh', 'baleh-classic', '/images/baleh/darbay/1.jpg', ARRAY['/images/baleh/darbay/1.jpg'], true);
*/


-- ============================================
-- STEP 8: Create Function for Automatic Slug Generation
-- ============================================
CREATE OR REPLACE FUNCTION generate_slug(text_value TEXT)
RETURNS TEXT AS $$
BEGIN
  -- Convert to lowercase
  LET result := LOWER(text_value);
  
  -- Replace Persian characters with their Latin equivalents
  result := REPLACE(result, 'ا', 'a');
  result := REPLACE(result, 'آ', 'a');
  result := REPLACE(result, 'ب', 'b');
  result := REPLACE(result, 'پ', 'p');
  result := REPLACE(result, 'ت', 't');
  result := REPLACE(result, 'ث', 's');
  result := REPLACE(result, 'ج', 'j');
  result := REPLACE(result, 'چ', 'ch');
  result := REPLACE(result, 'ح', 'h');
  result := REPLACE(result, 'خ', 'kh');
  result := REPLACE(result, 'د', 'd');
  result := REPLACE(result, 'ذ', 'z');
  result := REPLACE(result, 'ر', 'r');
  result := REPLACE(result, 'ز', 'z');
  result := REPLACE(result, 'ژ', 'zh');
  result := REPLACE(result, 'س', 's');
  result := REPLACE(result, 'ش', 'sh');
  result := REPLACE(result, 'ص', 's');
  result := REPLACE(result, 'ض', 'z');
  result := REPLACE(result, 'ط', 't');
  result := REPLACE(result, 'ظ', 'z');
  result := REPLACE(result, 'ع', 'a');
  result := REPLACE(result, 'غ', 'gh');
  result := REPLACE(result, 'ف', 'f');
  result := REPLACE(result, 'ق', 'gh');
  result := REPLACE(result, 'ک', 'k');
  result := REPLACE(result, 'گ', 'g');
  result := REPLACE(result, 'ل', 'l');
  result := REPLACE(result, 'م', 'm');
  result := REPLACE(result, 'ن', 'n');
  result := REPLACE(result, 'و', 'v');
  result := REPLACE(result, 'ه', 'h');
  result := REPLACE(result, 'ی', 'y');
  
  -- Remove special characters
  result := REGEXP_REPLACE(result, '[^a-z0-9\-]+', '-', 'g');
  
  -- Remove leading/trailing hyphens
  result := REGEXP_REPLACE(result, '^-+|-+$', '', 'g');
  
  -- Replace multiple hyphens with single hyphen
  result := REGEXP_REPLACE(result, '-+', '-', 'g');
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;


-- ============================================
-- STEP 9: Create Trigger for Automatic Updated At
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to categories
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- INSTRUCTIONS:
-- ============================================
-- 1. Run this entire SQL file in Supabase SQL Editor
-- 2. After running, make sure your .env.local has:
--    NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
-- 3. In Supabase Dashboard, go to Storage and create a bucket named 'product-images'
-- 4. In Supabase Dashboard, go to Authentication > Settings and add your site URL to CORS
-- 5. Test connection with: node test-supabase.js
-- ============================================
