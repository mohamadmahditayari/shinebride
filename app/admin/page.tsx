"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { normalizeImageSrc } from "@/lib/image";

const defaultCover = "/images/logo.png";
const storageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET;

function getStorageBucket() {
  if (!storageBucket) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET env variable. Set the storage bucket name in .env.local and restart the dev server."
    );
  }
  return storageBucket;
}

type Category = {
  id: string | number;
  name: string;
  slug: string;
  image?: string;
};

type Product = {
  id: string | number;
  name: string;
  price: string;
  description: string;
  category: string;
  slug: string;
  cover: string;
  images: string[];
};

type Status = {
  type: "success" | "error";
  message: string;
} | null;

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [cover, setCover] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [images, setImages] = useState("");
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catImage, setCatImage] = useState("");
  const [catImagePath, setCatImagePath] = useState("");
  const [catImageFile, setCatImageFile] = useState<File | null>(null);
  const [catSaving, setCatSaving] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | number | null>(null);
  const [originalCatSlug, setOriginalCatSlug] = useState("");

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  async function getCategories() {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "خطا در بارگیری دستهبندیها رخ داد." });
    }
  }

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "خطا در بارگیری محصولات رخ داد." });
    }
  }

  function resetForm() {
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setSlug("");
    setCover("");
    setCoverFile(null);
    setImages("");
    setGalleryFiles(null);
    setEditingId(null);
    setStatus(null);
  }

  function resetCategoryForm() {
    setCatName("");
    setCatSlug("");
    setCatImage("");
    setCatImagePath("");
    setCatImageFile(null);
    setEditingCategoryId(null);
    setOriginalCatSlug("");
    setStatus(null);
  }

  async function uploadCategoryImage(file: File, slug: string): Promise<string> {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "-");
    const fileName = `${safeSlug}-${Date.now()}.${extension}`;
    const filePath = `categories/${safeSlug}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(getStorageBucket())
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      throw new Error(
        `Storage upload failed for bucket "${getStorageBucket()}" and file "${filePath}": ${uploadError.message || JSON.stringify(uploadError)}`
      );
    }

    const { data: publicData } = supabase.storage
      .from(getStorageBucket())
      .getPublicUrl(filePath);

    if (!publicData?.publicUrl) {
      throw new Error(
        `Unable to get public URL from bucket "${getStorageBucket()}" for file "${filePath}".`
      );
    }
    return publicData.publicUrl;
  }

  async function uploadImage(file: File, slug: string, index: number): Promise<string> {
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "-");
    const fileName = `${safeSlug}-${Date.now()}-${index}.${extension}`;
    const filePath = `products/${safeSlug}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(getStorageBucket())
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      throw new Error(
        `Storage upload failed for bucket "${getStorageBucket()}" and file "${filePath}": ${uploadError.message || JSON.stringify(uploadError)}`
      );
    }

    const { data: publicData } = supabase.storage
      .from(getStorageBucket())
      .getPublicUrl(filePath);

    if (!publicData?.publicUrl) {
      throw new Error(
        `Unable to get public URL from bucket "${getStorageBucket()}" for file "${filePath}".`
      );
    }
    return publicData.publicUrl;
  }

  async function uploadFiles(files: FileList, slug: string): Promise<string[]> {
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      uploadedUrls.push(await uploadImage(file, slug, i));
    }
    return uploadedUrls;
  }

  async function saveProduct() {
    if (!name.trim() || !price.trim() || !category.trim() || !slug.trim()) {
      setStatus({ type: "error", message: "نام، قیمت، دستهبندی و اسلاگ الزامی است." });
      return;
    }

    setSaving(true);
    setUploadingImages(true);
    setStatus(null);

    const manualGalleryImages = images
      .split("\n")
      .map((image) => image.trim())
      .filter(Boolean);

    try {
      const productSlug = slug.trim();
      const uploadedCoverUrl = coverFile ? await uploadImage(coverFile, productSlug, 0) : "";
      const uploadedGalleryUrls = galleryFiles ? await uploadFiles(galleryFiles, productSlug) : [];

      const normalizedManualGalleryImages = manualGalleryImages.map((image) =>
        normalizeImageSrc(image, "")
      ).filter(Boolean);

      const finalGalleryImages = galleryFiles ? uploadedGalleryUrls : normalizedManualGalleryImages;
      const cleanedCover = cover.trim();
      const finalCover = coverFile
        ? uploadedCoverUrl
        : cleanedCover
        ? normalizeImageSrc(cleanedCover)
        : finalGalleryImages[0] || defaultCover;

      const productData = {
        name: name.trim(),
        price: price.trim(),
        description: description.trim(),
        category: category.trim(),
        slug: productSlug,
        cover: finalCover,
        images: finalGalleryImages,
      };

      const result = editingId
        ? await supabase.from("products").update(productData).eq("id", editingId)
        : await supabase.from("products").insert(productData);

      if (result.error) throw result.error;
      setStatus({
        type: "success",
        message: editingId ? "محصول با موفقیت بهروزرسانی شد." : "محصول با موفقیت ذخیره شد.",
      });
      resetForm();
      await getProducts();
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: (error as Error).message || "خطا در ذخیره محصول." });
    } finally {
      setSaving(false);
      setUploadingImages(false);
    }
  }

  async function deleteProduct(id: string | number) {
    const ok = confirm("آیا از حذف این محصول مطمئن هستید؟");
    if (!ok) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setStatus({ type: "success", message: "محصول حذف شد." });
      await getProducts();
    } catch (error) {
      console.error("deleteProduct error", error);
      setStatus({ type: "error", message: (error as Error).message || "خطا در حذف محصول." });
    }
  }

  function editProduct(item: Product) {
    setEditingId(item.id);
    setName(item.name || "");
    setPrice(item.price || "");
    setDescription(item.description || "");
    setCategory(item.category || "");
    setSlug(item.slug || "");
    setCover(normalizeImageSrc(item.cover || "", ""));
    setCoverFile(null);
    setImages(
      Array.isArray(item.images)
        ? item.images.map((img) => normalizeImageSrc(img, "")).filter(Boolean).join("\n")
        : ""
    );
    setGalleryFiles(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveCategory() {
    const nameValue = catName.trim();
    const slugValue = catSlug.trim().toLowerCase();

    if (!nameValue || !slugValue) {
      setStatus({ type: "error", message: "نام و اسلاگ دستهبندی الزامی است." });
      return;
    }

    setCatSaving(true);
    setStatus(null);

    try {
      const { data: existingCategory } = await supabase
        .from("categories")
        .select("id, slug")
        .eq("slug", slugValue)
        .single();

      const categoryData: Record<string, any> = {
        name: nameValue,
        slug: slugValue,
      };

      if (catImageFile) {
        const imageUrl = await uploadCategoryImage(catImageFile, slugValue);
        categoryData.image = imageUrl;
      } else if (catImagePath.trim()) {
        categoryData.image = catImagePath.trim();
      }

      if (editingCategoryId !== null) {
        if (existingCategory && existingCategory.id !== editingCategoryId) {
          throw new Error("این اسلاگ قبلاً استفاده شده است. لطفاً یک اسلاگ دیگر انتخاب کنید.");
        }

        const { error: updateError } = await supabase
          .from("categories")
          .update(categoryData)
          .eq("id", editingCategoryId);

        if (updateError) throw updateError;

        if (originalCatSlug && originalCatSlug !== slugValue) {
          const { error: productUpdateError } = await supabase
            .from("products")
            .update({ category: slugValue })
            .eq("category", originalCatSlug);

          if (productUpdateError) throw productUpdateError;
        }

        setStatus({ type: "success", message: "دستهبندی با موفقیت بروزرسانی شد." });
      } else {
        if (existingCategory) {
          throw new Error("این اسلاگ قبلاً استفاده شده است. لطفاً یک اسلاگ دیگر انتخاب کنید.");
        }

        const { error: insertError } = await supabase.from("categories").insert(categoryData);

        if (insertError) throw insertError;
        setStatus({ type: "success", message: "دستهبندی با موفقیت ذخیره شد." });
      }

      setCategory(slugValue);
      await getCategories();
      resetCategoryForm();
    } catch (error) {
      console.error("saveCategory error", error);
      setStatus({ type: "error", message: (error as Error).message || "خطا در ذخیره دستهبندی." });
    } finally {
      setCatSaving(false);
    }
  }

  async function deleteCategory(id: string | number) {
    const ok = confirm("آیا از حذف این دستهبندی مطمئن هستید؟");
    if (!ok) return;

    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      setStatus({ type: "success", message: "دستهبندی حذف شد." });
      await getCategories();
    } catch (error) {
      console.error("deleteCategory error", error);
      setStatus({ type: "error", message: (error as Error).message || "خطا در حذف دستهبندی." });
    }
  }

  function editCategory(cat: Category) {
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatImage(cat.image || "");
    setCatImageFile(null);
    setEditingCategoryId(cat.id);
    setOriginalCatSlug(cat.slug);
    setStatus(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-xl md:p-10">
        <h1 className="mb-8 text-center text-4xl font-bold">پنل مدیریت ShineBride</h1>

        {status && (
          <div
            className={`mb-6 rounded-2xl border px-5 py-4 text-sm font-semibold ${
              status.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {status.message}
          </div>
        )}

        <section className="mb-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="mb-6 flex flex-col gap-2">
            <h2 className="text-2xl font-bold">مدیریت دستهبندیها</h2>
            <p className="text-sm text-gray-500">
              در این بخش میتوانید دستهبندی جدید ایجاد کنید یا دستههای موجود را ویرایش و حذف کنید.
            </p>
          </div>

          <div className="mb-8 rounded-3xl border border-dashed border-gray-300 bg-white p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">
                  {editingCategoryId ? "ویرایش دستهبندی" : "ایجاد دستهبندی جدید"}
                </h3>
                <p className="text-sm text-gray-500">
                  {editingCategoryId
                    ? "اطلاعات دستهبندی را ویرایش کرده و روی بروزرسانی دستهبندی بزنید."
                    : "نام و اسلاگ دستهبندی را وارد کنید تا یک دسته جدید ایجاد شود."
                  }
                </p>
              </div>
              {editingCategoryId && (
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="rounded-xl bg-gray-200 px-4 py-2 text-sm text-gray-700"
                >
                  انصراف از ویرایش
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="نام دستهبندی"
                className="rounded-xl border p-4"
              />
              <input
                value={catSlug}
                onChange={(e) => setCatSlug(e.target.value)}
                placeholder="اسلاگ دستهبندی، مثال: esfand"
                className="rounded-xl border p-4"
              />
            </div>

            <div className="mt-4 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-4">
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                تصویر دستهبندی (اختیاری)
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setCatImageFile(file);
                    if (file) {
                      setCatImage(URL.createObjectURL(file));
                      setCatImagePath("");
                    }
                  }}
                  className="rounded-xl border border-gray-300 bg-white p-3"
                />
              </label>
              <label className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
                یا مسیر تصویر محلی (داخل /public)
                <input
                  value={catImagePath}
                  onChange={(e) => {
                    setCatImagePath(e.target.value);
                    setCatImage("");
                    setCatImageFile(null);
                  }}
                  placeholder="مثال: /images/esfand.jpg"
                  className="rounded-xl border border-gray-300 bg-white p-3"
                />
              </label>
              {catImage || catImagePath ? (
                <img
                  src={catImage || catImagePath}
                  alt="پیش نمایش تصویر دستهبندی"
                  className="mt-4 h-32 w-32 rounded-2xl object-cover"
                />
              ) : (
                <div className="mt-4 text-sm text-gray-500">هیچ تصویری انتخاب نشده است.</div>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={saveCategory}
                disabled={catSaving}
                className="rounded-xl bg-[#D4AF37] px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {catSaving
                  ? "در حال ذخیره..."
                  : editingCategoryId
                  ? "بروزرسانی دستهبندی"
                  : "ذخیره دستهبندی جدید"}
              </button>
              <button
                type="button"
                onClick={resetCategoryForm}
                className="rounded-xl bg-gray-500 px-6 py-3 text-white"
              >
                پاک کردن
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">دستهبندیهای موجود</h3>
            {categories.length > 0 ? (
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold">{cat.name}</p>
                      <p className="text-sm text-gray-500">{cat.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => editCategory(cat)}
                        className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white"
                      >
                        ویرایش
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategory(cat.id)}
                        className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">هیچ دستهبندیای وجود ندارد.</p>
            )}
          </div>
        </section>

        <section className="grid gap-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام محصول"
            className="rounded-xl border p-4"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="قیمت"
            className="rounded-xl border p-4"
          />

          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="اسلاگ محصول، مثال: amjad"
            className="rounded-xl border p-4"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border p-4"
          >
            <option value="">انتخاب دستهبندی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug || cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="آدرس عکس اصلی، مثال: /images/esfand/amjad/1.jpg"
            className="rounded-xl border p-4"
          />

          <label className="text-sm text-gray-600">
            اپلود عکس اصلی
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-3"
            />
            {coverFile && <span className="mt-2 block text-sm text-gray-500">فایل انتخابشده: {coverFile.name}</span>}
          </label>

          <label className="text-sm text-gray-600">
            اپلود عکسهای گالری (میتوانید چند فایل انتخاب کنید)
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setGalleryFiles(e.target.files)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-3"
            />
            {galleryFiles && galleryFiles.length > 0 && (
              <span className="mt-2 block text-sm text-gray-500">
                {galleryFiles.length} فایل انتخاب شده
              </span>
            )}
          </label>

          <textarea
            rows={6}
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder={
              "آدرس عکسهای گالری، هر عکس در یک خط\n/images/esfand/amjad/1.jpg\n/images/esfand/amjad/2.jpg"
            }
            className="rounded-xl border p-4"
          />

          <textarea
            rows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات محصول"
            className="rounded-xl border p-4"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={saveProduct}
              disabled={saving || uploadingImages}
              className="flex-1 rounded-xl bg-[#D4AF37] py-4 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploadingImages
                ? "در حال آپلود تصاویر..."
                : saving
                ? "در حال ذخیره..."
                : editingId
                ? "ذخیره تغییرات"
                : "ثبت محصول"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl bg-gray-500 px-8 text-white"
              >
                انصراف
              </button>
            )}
          </div>
        </section>

        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-bold">لیست محصولات</h2>

          <div className="space-y-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-5 rounded-xl border border-gray-200 bg-gray-50 p-5 md:flex-row md:items-center"
              >
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="mt-1 text-gray-500">دسته: {item.category}</p>
                  <p className="text-gray-500">اسلاگ: {item.slug || "ندارد"}</p>
                  <p className="mt-2 font-bold text-[#D4AF37]">{item.price} تومان</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => editProduct(item)}
                    className="rounded-lg bg-blue-500 px-5 py-2 text-white"
                  >
                    ویرایش
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(item.id)}
                    className="rounded-lg bg-red-500 px-5 py-2 text-white"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
