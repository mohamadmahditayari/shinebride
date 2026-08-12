# راهنمای کامل وصل کردن Supabase به ShineBride

## مشکل: پنل مدیریت محصولات کار نمی‌کند

اگر محصولاتی که از طریق پنل مدیریت اضافه می‌کنید نمایش داده نمی‌شوند، احتمالاً **اتصال به Supabase برقرار نیست**.

---

## 🔧 گام به گام حل مشکل

### گام 1: چک کردن فایل `.env.local`

فایل `.env.local` باید شامل این مقادیر باشد:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=product-images
```

**چطور پیدا کنیم:**
1. به [Supabase Dashboard](https://app.supabase.com/) بروید
2. پروژه خود را انتخاب کنید
3. از منوی سمت چپ "Project Settings" > "API" رو انتخاب کنید
4. مقادیر زیر رو کپی کنید:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

⚠️ **توجه:** از `anon key` استفاده کنید، نه `service_role key`

---

### گام 2: تنظیم CORS در Supabase

1. به [Supabase Dashboard](https://app.supabase.com/) بروید
2. پروژه خود را انتخاب کنید
3. از منوی سمت چپ "Authentication" > "Settings" رو انتخاب کنید
4. به پایین صفحه بروید به بخش **Site URL**
5. آدرس سایت خود را اضافه کنید:
   ```
   http://localhost:3000
   https://your-domain.ir
   ```
6. ذخیره کنید

**یا از SQL Runner:**
```sql
-- اضافه کردن سایت به لیست CORS
INSERT INTO cors (origin) VALUES ('http://localhost:3000'), ('https://your-domain.ir');
```

---

### گام 3: غیرفعال کردن Row Level Security (RLS)

برای این که بتوانید بدون احراز هویت داده‌ها را بخوانید:

1. به [Supabase Dashboard](https://app.supabase.com/) بروید
2. پروژه خود را انتخاب کنید
3. از منوی سمت چپ "Authentication" > "Policies" رو انتخاب کنید
4. روی جدول `products` کلیک کنید
5. پلیسی به نام "Enable read access to everyone" یا مشابه آن پیدا کنید
6. اگر چنین پلیسی وجود ندارد، آن را ایجاد کنید:

**SQL برای غیرفعال کردن RLS:**
```sql
-- برای جدول products
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- برای جدول categories
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
```

**یا ایجاد پلیسی برای دسترسی عمومی:**
```sql
-- برای جدول products
CREATE POLICY "Enable read access to everyone for products"
ON products FOR SELECT USING (true);

-- برای جدول categories
CREATE POLICY "Enable read access to everyone for categories"
ON categories FOR SELECT USING (true);

-- برای جدول storage (برای آپلود فایل‌ها)
CREATE POLICY "Enable public read access for storage"
ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
```

---

### گام 4: تست اتصال به Supabase

از اسکریپت آماده استفاده کنید:

```bash
# اجرای اسکریپت تست
node test-supabase.js
```

**نتیجه مورد انتظار:**
```
🔍 Testing Supabase connection...

📋 Checking 'categories' table...
✅ Found 6 categories:
   - اسپند دود کن (esfand)
   - ست بله برون (baleh)
   ...

📦 Checking 'products' table...
✅ Found 15 products:
   - اسپند دود کن اقتصادی (esfand/em)
   - ست وی‌ای‌پی ترک (esfand/vip)
   ...

✅ Connection test complete!
```

**اگر خطا دیدید:**
- خطای `ENOTFOUND` → `.env.local` اشتباه است
- خطای `403 Forbidden` → RLS فعال است
- خطای `CORS` → CORS تنظیم نشده

---

## 🛠 تنظیمات پیشرفته

### تغییر نام جدول‌ها

اگر از نام‌های دیگری برای جدول‌ها استفاده می‌کنید، فایل‌های زیر را اصلاح کنید:

**در `lib/products.ts`:**
```typescript
// قبل:
const { data, error } = await supabase.from("categories").select("*");

// بعد (مثال برای جدول با نام مختلف):
const { data, error } = await supabase.from("my_categories").select("*");
```

**در `app/admin/page.tsx`:**
```typescript
// قبل:
const { data, error } = await supabase.from("categories").select("*");

// بعد:
const { data, error } = await supabase.from("my_categories").select("*");
```

---

### استفاده از Server Components برای دسترسی به Supabase

در Next.js 16، برای دسترسی به Supabase در Server Components باید از این روش استفاده کنید:

```typescript
// مثال برای fetch کردن در server component
export default async function Page() {
  const { data: products } = await supabase.from("products").select("*");
  return <div>{JSON.stringify(products)}</div>;
}
```

---

## ✅ چک لیست نهایی

- [ ] `.env.local` با مقادیر درست Supabase پر شده
- [ ] CORS برای دامنه سایت تنظیم شده
- [ ] RLS برای جدول‌ها غیرفعال یا پلیسی برای دسترسی عمومی ایجاد شده
- [ ] اسکریپت `test-supabase.js` با موفقیت اجرا می‌شود
- [ ] پنل مدیریت (`/admin`) کار می‌کند
- [ ] محصولات جدید نمایش داده می‌شوند

---

## 🚨 مشکلات رایج و راه حل‌ها

### مشکل: "fetch failed" یا "ENOTFOUND"
**راه حل:** چک کنید که `.env.local` درست پر شده باشد

### مشکل: "403 Forbidden"
**راه حل:** RLS را غیرفعال کنید یا پلیسی برای دسترسی عمومی ایجاد کنید

### مشکل: "CORS error"
**راه حل:** CORS را در Supabase تنظیم کنید

### مشکل: محصولات جدید نمایش داده نمی‌شوند
**راه حل:**
1. مطمئن شوید که محصولات با فیلدهای درست ذخیره شده‌اند:
   - `name` (必要)
   - `slug` (ضروری - باید منحصر به فرد باشد)
   - `category` (ضروری)
   - `price` (ضروری)
   - `description` (اختیاری)
   - `cover` (اختیاری - آدرس تصویر اصلی)
   - `images` (اختیاری - آرایه از آدرس تصاویر)
2. بعد از ذخیره محصول، صفحه را refresh کنید

---

## 📞 پشتیبانی

اگر بعد از انجام این مراحل باز هم مشکل داشتید:

1. **اسکریپت تست را اجرا کنید:**
   ```bash
   node test-supabase.js
   ```

2. **نتیجه را اینجا به اشتراک بگذارید** تا بتوانیم مشکل را تشخیص دهیم

3. **چک کنید که:**
   - اینترنت شما وصل است
   - سایت Supabase بالا است (چک کنید: https://status.supabase.com/)
   - مقادیر `.env.local` دقیقاً از Supabase Dashboard کپی شده‌اند
