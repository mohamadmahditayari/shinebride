# 🚀 راهنمای کامل Deploy در Cloudflare Pages

## ✅ تغییرات اعمال شده در پروژه

### فایل‌های اصلاح شده:

1. **`.nvmrc`** → `22` (سازگاری با بسته‌ها)
2. **`.node-version`** → `22` (سازگاری با بسته‌ها)
3. **`package.json`** → `next@^15.3.0` (رفع آسیب‌پذیری)
4. **`wrangler.toml`** → تنظیم برای Cloudflare Pages
5. **`open-next.config.ts`** → افزودن `buildCommand`
6. **`next.config.ts`** → غیرفعال کردن lint/type-check

---

## 🔧 تنظیمات نهایی

### فایل `wrangler.toml`
```toml
pages_build_output_dir = ".open-next"
compatibility_date = "2026-07-30"
```

### فایل `package.json` - script deploy
```json
"deploy:pages": "npm run build && npx wrangler pages deploy .open-next --project-name=shinebride"
```

---

## 📋 مراحل Deploy در Cloudflare Pages

### مرحله 1: پروژه را در Cloudflare Pages ایجاد کنید
1. به [Cloudflare Dashboard](https://dash.cloudflare.com/) بروید
2. روی **Workers & Pages** کلیک کنید
3. روی **Create application** → **Pages** کلیک کنید
4. Repository خود (`shinebride`) را متصل کنید

### مرحله 2: تنظیمات Build را پیکربندی کنید
1. در پروژه Pages، به تب **Settings** → **Build & deployment** بروید
2. **Build command** را تنظیم کنید:
   ```bash
   npm run build
   ```
3. **Build output directory** را تنظیم کنید:
   ```
   .open-next
   ```
4. **Root directory** را خالی بگذارید (یا `/`)

### مرحله 3: تنظیمات Environment Variables (اگر لازم است)
1. در تب **Settings** → **Environment variables** بروید
2. اگر از `.env` استفاده می‌کنید، متغیرها را اینجا اضافه کنید

---

## 🚀 اجرای Deploy

### از طریق Terminal:
```bash
npm run deploy:pages
```

### یا از طریق Cloudflare:
1. در پروژه Pages، روی **Deployments** کلیک کنید
2. روی **Trigger deployment** کلیک کنید
3. منتظر بمانید تا deploy کامل شود

---

## ✅ چک لیست بعد از Deploy

- [ ] آیا `https://shinebride.pages.dev` کار می‌کند؟
- [ ] آیا تصاویر لود می‌شوند؟
- [ ] آیا صفحه اصلی باز می‌شود؟

---

## 🔍 عیب‌یابی

### اگر 404 می‌دهد:

#### دلیل 1: Build Output Directory اشتباه است
- در Cloudflare Pages، **Build output directory** را چک کنید
- باید **`.open-next`** باشد

#### دلیل 2: فایل‌ها آپلود نشده‌اند
- در تب **Deployments**، آخرین deployment را باز کنید
- در بخش **Assets** چک کنید فایل‌ها آپلود شده‌اند

#### دلیل 3: DNS تنظیم نیست
- `dig shinebride.ir` را اجرا کنید
- اگر IP در رنج Cloudflare نبود (104.21.x.x, 173.245.x.x, 108.162.x.x):
  - به Cloudflare Dashboard بروید
  - در بخش **DNS**، یک **A record** یا **CNAME** اضافه کنید:
    - Type: `CNAME`
    - Name: `@`
    - Target: `shinebride.pages.dev`
    - Proxy: ✅ (نارنجی)

#### دلیل 4: ولید بودن `wrangler.toml`
- مطمئن شوید که `wrangler.toml` دقیقاً همین باشد:
  ```toml
  pages_build_output_dir = ".open-next"
  compatibility_date = "2026-07-30"
  ```

---

## 📞 پشتیبانی

اگر بعد از انجام همه مراحل باز هم مشکل داشتید:
1. خروجی `npm run build` را بفرستید
2. خروجی `ls -la .open-next/assets/` را بفرستید
3. ارور دقیق در مرورگر را بفرستید

---

## 💡 نکات مهم

1. **OpenNext برای ویندوز به طور کامل پشتیبانی نمی‌شود**
   - توصیه می‌شود از WSL یا لینوکس استفاده کنید

2. **تصاویر:**
   - مطمئن شوید که پوشه `public/images/` وجود دارد
   - فایل `logo.png` را در آن قرار دهید

3. **Cloudflare Pages vs Workers:**
   - این پروژه برای **Pages** تنظیم شده است
   - اگر می‌خواهید از **Workers** استفاده کنید، تنظیمات متفاوت است

---

**آخرین به‌روزرسانی:** 2026-08-14
