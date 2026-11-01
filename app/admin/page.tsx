"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { normalizeImageSrc } from "@/lib/image";

const DEFAULT_COVER = "/images/logo.png";

const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ||
  "product-images";

type Category = {
  id: string | number;
  name: string;
  slug: string;
  image?: string | null;
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
  /* =====================================================
     AUTH
  ===================================================== */

  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  /* =====================================================
     DATA
  ===================================================== */

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [status, setStatus] = useState<Status>(null);

  /* =====================================================
     PRODUCT FORM
  ===================================================== */

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");

  /* Cover */

  const [cover, setCover] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  /* Gallery */

  const [images, setImages] = useState("");
  const [galleryFiles, setGalleryFiles] =
    useState<FileList | null>(null);

  const [editingId, setEditingId] =
    useState<string | number | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  /* =====================================================
     CATEGORY FORM
  ===================================================== */

  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const [catImage, setCatImage] = useState("");
  const [catImagePath, setCatImagePath] = useState("");
  const [catImageFile, setCatImageFile] =
    useState<File | null>(null);

  const [catSaving, setCatSaving] = useState(false);

  const [editingCategoryId, setEditingCategoryId] =
    useState<string | number | null>(null);

  const [originalCatSlug, setOriginalCatSlug] = useState("");
  const [originalCatImage, setOriginalCatImage] = useState("");

  /* =====================================================
     HELPERS
  ===================================================== */

  function makeSafeSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function getStorageBucket() {
    return STORAGE_BUCKET;
  }

  /* =====================================================
     AUTH INIT
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      const { data, error } =
        await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Auth error:", error);
        setSession(null);
      } else {
        setSession(data.session);
      }

      setAuthLoading(false);
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!mounted) return;

        setSession(newSession);

        if (!newSession) {
          setCategories([]);
          setProducts([]);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    if (!session) return;

    loadCategories();
    loadProducts();
  }, [session]);

  async function loadCategories() {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", {
          ascending: true,
        });

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      console.error(error);

      setCategories([]);

      setStatus({
        type: "error",
        message:
          "خطا در بارگیری دسته‌بندی‌ها: " +
          ((error as Error)?.message ||
            "خطای نامشخص"),
      });
    }
  }

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      const normalized: Product[] = (data || []).map(
        (item: any) => ({
          ...item,

          cover: normalizeImageSrc(
            item.cover,
            DEFAULT_COVER
          ),

          images: Array.isArray(item.images)
            ? item.images
                .map((image: string) =>
                  normalizeImageSrc(image, "")
                )
                .filter(Boolean)
            : [],
        })
      );

      setProducts(normalized);
    } catch (error) {
      console.error(error);

      setProducts([]);

      setStatus({
        type: "error",
        message:
          "خطا در بارگیری محصولات: " +
          ((error as Error)?.message ||
            "خطای نامشخص"),
      });
    }
  }

  /* =====================================================
     LOGIN
  ===================================================== */

  async function handleLogin() {
    if (!email.trim() || !password) {
      setLoginError(
        "ایمیل و رمز عبور را وارد کنید."
      );
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (error) {
      console.error(error);

      setLoginError(
        "ایمیل یا رمز عبور اشتباه است."
      );
    }

    setLoginLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    setSession(null);
    setCategories([]);
    setProducts([]);
  }

  /* =====================================================
     RESET PRODUCT
  ===================================================== */

  function resetProductForm() {
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
  }

  /* =====================================================
     RESET CATEGORY
  ===================================================== */

  function resetCategoryForm() {
    setCatName("");
    setCatSlug("");

    setCatImage("");
    setCatImagePath("");
    setCatImageFile(null);

    setEditingCategoryId(null);

    setOriginalCatSlug("");
    setOriginalCatImage("");
  }

  /* =====================================================
     UPLOAD RETRY
  ===================================================== */

  async function uploadWithRetry(
    filePath: string,
    file: File,
    maxRetries = 3
  ) {
    let lastError: any = null;

    for (
      let attempt = 1;
      attempt <= maxRetries;
      attempt++
    ) {
      const { error } =
        await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

      if (!error) return;

      lastError = error;

      if (attempt < maxRetries) {
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            attempt * 1000
          )
        );
      }
    }

    throw new Error(
      lastError?.message ||
        "آپلود تصویر ناموفق بود."
    );
  }

  /* =====================================================
     CATEGORY IMAGE UPLOAD
  ===================================================== */

  async function uploadCategoryImage(
    file: File,
    slug: string
  ) {
    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg";

    const safeSlug =
      makeSafeSlug(slug) || "category";

    const fileName =
      `${safeSlug}-${Date.now()}.${extension}`;

    const filePath =
      `categories/${safeSlug}/${fileName}`;

    await uploadWithRetry(
      filePath,
      file
    );

    const { data } =
      supabase.storage
        .from(getStorageBucket())
        .getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error(
        "آدرس تصویر ساخته نشد."
      );
    }

    return data.publicUrl;
  }

  /* =====================================================
     PRODUCT IMAGE UPLOAD
  ===================================================== */

  async function uploadProductImage(
    file: File,
    slug: string,
    index: number
  ) {
    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "jpg";

    const safeSlug =
      makeSafeSlug(slug) || "product";

    const fileName =
      `${safeSlug}-${Date.now()}-${index}.${extension}`;

    const filePath =
      `products/${safeSlug}/${fileName}`;

    await uploadWithRetry(
      filePath,
      file
    );

    const { data } =
      supabase.storage
        .from(getStorageBucket())
        .getPublicUrl(filePath);

    if (!data?.publicUrl) {
      throw new Error(
        "آدرس تصویر ساخته نشد."
      );
    }

    return data.publicUrl;
  }

  /* =====================================================
     MULTIPLE PRODUCT IMAGE UPLOAD
  ===================================================== */

  async function uploadProductImages(
    files: FileList,
    slug: string
  ) {
    const urls: string[] = [];

    for (
      let i = 0;
      i < files.length;
      i++
    ) {
      const url =
        await uploadProductImage(
          files[i],
          slug,
          i
        );

      urls.push(url);
    }

    return urls;
  }

  /* =====================================================
     SAVE CATEGORY
  ===================================================== */

  async function saveCategory() {
    const nameValue =
      catName.trim();

    const slugValue =
      makeSafeSlug(catSlug);

    if (!nameValue || !slugValue) {
      setStatus({
        type: "error",
        message:
          "نام و اسلاگ دسته‌بندی الزامی است.",
      });

      return;
    }

    setCatSaving(true);
    setStatus(null);

    try {
      const { data: existing } =
        await supabase
          .from("categories")
          .select("id, slug")
          .eq("slug", slugValue)
          .maybeSingle();

      if (
        existing &&
        String(existing.id) !==
          String(editingCategoryId)
      ) {
        throw new Error(
          "این اسلاگ قبلاً استفاده شده است."
        );
      }

      let finalImage = "";

      if (catImageFile) {
        finalImage =
          await uploadCategoryImage(
            catImageFile,
            slugValue
          );
      } else if (
        catImagePath.trim()
      ) {
        finalImage =
          normalizeImageSrc(
            catImagePath.trim(),
            ""
          );
      } else if (
        originalCatImage
      ) {
        finalImage =
          originalCatImage;
      }

      const categoryData = {
        name: nameValue,
        slug: slugValue,
        image:
          finalImage || null,
      };

      if (
        editingCategoryId !== null
      ) {
        const { error } =
          await supabase
            .from("categories")
            .update(categoryData)
            .eq(
              "id",
              editingCategoryId
            );

        if (error) throw error;

        if (
          originalCatSlug &&
          originalCatSlug !==
            slugValue
        ) {
          await supabase
            .from("products")
            .update({
              category:
                slugValue,
            })
            .eq(
              "category",
              originalCatSlug
            );
        }

        setStatus({
          type: "success",
          message:
            "دسته‌بندی با موفقیت بروزرسانی شد.",
        });
      } else {
        const { error } =
          await supabase
            .from("categories")
            .insert(
              categoryData
            );

        if (error) throw error;

        setStatus({
          type: "success",
          message:
            "دسته‌بندی با موفقیت ایجاد شد.",
        });
      }

      resetCategoryForm();

      await loadCategories();
      await loadProducts();
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message:
          (error as Error)?.message ||
          "خطا در ذخیره دسته‌بندی.",
      });
    } finally {
      setCatSaving(false);
    }
  }

  /* =====================================================
     EDIT CATEGORY
  ===================================================== */

  function editCategory(
    cat: Category
  ) {
    const image =
      cat.image
        ? normalizeImageSrc(
            cat.image,
            ""
          )
        : "";

    setCatName(
      cat.name || ""
    );

    setCatSlug(
      cat.slug || ""
    );

    setCatImage(image);
    setCatImagePath("");
    setCatImageFile(null);

    setEditingCategoryId(
      cat.id
    );

    setOriginalCatSlug(
      cat.slug || ""
    );

    setOriginalCatImage(
      image
    );

    setStatus(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =====================================================
     DELETE CATEGORY
  ===================================================== */

  async function deleteCategory(
    id: string | number
  ) {
    if (
      !window.confirm(
        "آیا از حذف این دسته‌بندی مطمئن هستید؟"
      )
    ) {
      return;
    }

    try {
      const cat =
        categories.find(
          (item) =>
            String(item.id) ===
            String(id)
        );

      if (cat) {
        const {
          count,
          error,
        } = await supabase
          .from("products")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq(
            "category",
            cat.slug
          );

        if (
          !error &&
          (count || 0) > 0
        ) {
          throw new Error(
            `این دسته‌بندی ${count} محصول دارد. ابتدا محصولات را منتقل کنید.`
          );
        }
      }

      const { error } =
        await supabase
          .from("categories")
          .delete()
          .eq("id", id);

      if (error) throw error;

      setStatus({
        type: "success",
        message:
          "دسته‌بندی حذف شد.",
      });

      await loadCategories();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          (error as Error)?.message ||
          "خطا در حذف دسته‌بندی.",
      });
    }
  }

  /* =====================================================
     SAVE PRODUCT
  ===================================================== */

  async function saveProduct() {
    if (
      !name.trim() ||
      !price.trim() ||
      !category.trim() ||
      !slug.trim()
    ) {
      setStatus({
        type: "error",
        message:
          "نام، قیمت، دسته‌بندی و اسلاگ الزامی است.",
      });

      return;
    }

    setSaving(true);
    setUploadingImages(true);
    setStatus(null);

    try {
      const productSlug =
        makeSafeSlug(slug);

      if (!productSlug) {
        throw new Error(
          "اسلاگ محصول معتبر نیست."
        );
      }

      /* =================================================
         COVER
      ================================================= */

      let finalCover = "";

      if (coverFile) {
        finalCover =
          await uploadProductImage(
            coverFile,
            productSlug,
            0
          );
      } else if (
        cover.trim()
      ) {
        finalCover =
          normalizeImageSrc(
            cover.trim(),
            ""
          );
      }

      /* =================================================
         GALLERY
      ================================================= */

      let finalImages: string[] =
        [];

      /* Uploaded files */

      if (
        galleryFiles &&
        galleryFiles.length > 0
      ) {
        finalImages =
          await uploadProductImages(
            galleryFiles,
            productSlug
          );
      }

      /* Manual URLs */

      const manualImages =
        images
          .split("\n")
          .map((item) =>
            normalizeImageSrc(
              item.trim(),
              ""
            )
          )
          .filter(Boolean);

      /* Add manual images */

      finalImages = [
        ...finalImages,
        ...manualImages,
      ];

      /* =================================================
         COVER AS FIRST GALLERY IMAGE
      ================================================= */

      if (
        finalCover &&
        !finalImages.includes(
          finalCover
        )
      ) {
        finalImages = [
          finalCover,
          ...finalImages,
        ];
      }

      /* If no cover, first gallery becomes cover */

      if (
        !finalCover &&
        finalImages.length > 0
      ) {
        finalCover =
          finalImages[0];
      }

      if (!finalCover) {
        finalCover =
          DEFAULT_COVER;
      }

      /* =================================================
         REMOVE DUPLICATE IMAGES
      ================================================= */

      finalImages = [
        ...new Set(
          finalImages
        ),
      ];

      const productData = {
        name: name.trim(),
        price: price.trim(),
        description:
          description.trim(),

        category:
          category.trim(),

        slug: productSlug,

        cover: finalCover,

        images:
          finalImages,
      };

      /* =================================================
         UPDATE
      ================================================= */

      if (
        editingId !== null
      ) {
        const { error } =
          await supabase
            .from("products")
            .update(
              productData
            )
            .eq(
              "id",
              editingId
            );

        if (error) throw error;

        setStatus({
          type: "success",
          message:
            `محصول بروزرسانی شد — ${finalImages.length} عکس ثبت شد.`,
        });
      }

      /* =================================================
         INSERT
      ================================================= */

      else {
        const { error } =
          await supabase
            .from("products")
            .insert(
              productData
            );

        if (error) throw error;

        setStatus({
          type: "success",
          message:
            `محصول ثبت شد — ${finalImages.length} عکس ثبت شد.`,
        });
      }

      resetProductForm();

      await loadProducts();
    } catch (error) {
      console.error(
        "Save product:",
        error
      );

      setStatus({
        type: "error",
        message:
          (error as Error)?.message ||
          "خطا در ذخیره محصول.",
      });
    } finally {
      setSaving(false);
      setUploadingImages(false);
    }
  }

  /* =====================================================
     EDIT PRODUCT
  ===================================================== */

  function editProduct(
    item: Product
  ) {
    setEditingId(item.id);

    setName(
      item.name || ""
    );

    setPrice(
      item.price || ""
    );

    setDescription(
      item.description || ""
    );

    setCategory(
      item.category || ""
    );

    setSlug(
      item.slug || ""
    );

    setCover(
      normalizeImageSrc(
        item.cover,
        ""
      )
    );

    setCoverFile(null);

    setImages(
      Array.isArray(item.images)
        ? item.images
            .map((image) =>
              normalizeImageSrc(
                image,
                ""
              )
            )
            .filter(Boolean)
            .join("\n")
        : ""
    );

    setGalleryFiles(null);

    setStatus(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  async function deleteProduct(
    id: string | number
  ) {
    if (
      !window.confirm(
        "آیا از حذف این محصول مطمئن هستید؟"
      )
    ) {
      return;
    }

    try {
      const { error } =
        await supabase
          .from("products")
          .delete()
          .eq("id", id);

      if (error) throw error;

      setStatus({
        type: "success",
        message:
          "محصول حذف شد.",
      });

      await loadProducts();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          (error as Error)?.message ||
          "خطا در حذف محصول.",
      });
    }
  }

  /* =====================================================
     AUTH LOADING
  ===================================================== */

  if (authLoading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,206,159,0.22),_transparent_26%),linear-gradient(180deg,#4a1221_0%,_#6d1a2d_24%,_#7d1d2a_52%,_#90374a_100%)] p-6"
      >
        <div className="rounded-3xl bg-white/90 p-8 text-center shadow-[0_18px_40px_rgba(36,8,17,0.2)]">
          <div className="mb-4 text-3xl">
            ✦
          </div>

          <p className="font-semibold">
            در حال بررسی دسترسی...
          </p>
        </div>
      </main>
    );
  }

  /* =====================================================
     LOGIN
  ===================================================== */

  if (!session) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,206,159,0.22),_transparent_26%),linear-gradient(180deg,#4a1221_0%,_#6d1a2d_24%,_#7d1d2a_52%,_#90374a_100%)] p-6"
      >
        <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-[0_18px_40px_rgba(36,8,17,0.2)]">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              ورود به پنل مدیریت
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              ShineBride
            </p>
          </div>

          {loginError && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {loginError}
            </div>
          )}

          <div className="space-y-4">

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="ایمیل مدیر"
              autoComplete="email"
              className="w-full rounded-xl border p-4 outline-none focus:border-[#D4AF37]"
            />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="رمز عبور"
              autoComplete="current-password"
              className="w-full rounded-xl border p-4 outline-none focus:border-[#D4AF37]"
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  handleLogin();
                }
              }}
            />

            <button
              type="button"
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full rounded-xl bg-[#D4AF37] py-4 font-bold text-white disabled:opacity-60"
            >
              {loginLoading
                ? "در حال ورود..."
                : "ورود به پنل"}
            </button>

          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     ADMIN
  ===================================================== */

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,206,159,0.22),_transparent_26%),linear-gradient(180deg,#4a1221_0%,_#6d1a2d_24%,_#7d1d2a_52%,_#90374a_100%)] p-4 md:p-10"
    >
      <div className="mx-auto max-w-6xl rounded-3xl bg-[#fffaf7]/90 p-5 shadow-[0_18px_40px_rgba(36,8,17,0.18)] md:p-10">

        {/* HEADER */}

        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">

          <div>
            <h1 className="text-3xl font-bold md:text-4xl">
              پنل مدیریت ShineBride
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              مدیریت محصولات و دسته‌بندی‌ها
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl bg-gray-800 px-6 py-3 text-sm font-semibold text-white"
          >
            خروج از پنل
          </button>

        </div>

        {/* STATUS */}

        {status && (
          <div
            className={`mb-8 rounded-2xl border px-5 py-4 text-sm font-semibold ${
              status.type ===
              "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="mb-10 rounded-3xl border bg-gray-50 p-5 md:p-7">

          <h2 className="mb-6 text-2xl font-bold">
            مدیریت دسته‌بندی‌ها
          </h2>

          <div className="rounded-3xl border bg-white p-5">

            <div className="grid gap-4 md:grid-cols-2">

              <input
                value={catName}
                onChange={(e) =>
                  setCatName(
                    e.target.value
                  )
                }
                placeholder="نام دسته‌بندی"
                className="rounded-xl border p-4 outline-none focus:border-[#D4AF37]"
              />

              <input
                value={catSlug}
                onChange={(e) =>
                  setCatSlug(
                    e.target.value
                  )
                }
                placeholder="اسلاگ"
                className="rounded-xl border p-4 outline-none focus:border-[#D4AF37]"
              />

            </div>

            {/* CATEGORY IMAGE */}

            <div className="mt-5 rounded-2xl border border-dashed bg-gray-50 p-5">

              <p className="mb-3 font-semibold">
                تصویر دسته‌بندی
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0] ||
                    null;

                  setCatImageFile(
                    file
                  );

                  if (file) {
                    setCatImage(
                      URL.createObjectURL(
                        file
                      )
                    );

                    setCatImagePath(
                      ""
                    );
                  }
                }}
                className="w-full rounded-xl border bg-white p-3"
              />

              <div className="my-3 text-center text-xs text-gray-400">
                یا مسیر / لینک عکس
              </div>

              <input
                value={catImagePath}
                onChange={(e) => {
                  setCatImagePath(
                    e.target.value
                  );

                  setCatImageFile(
                    null
                  );
                }}
                placeholder="/images/category.jpg"
                className="w-full rounded-xl border bg-white p-4"
              />

              {(catImage ||
                catImagePath ||
                originalCatImage) && (
                <img
                  src={normalizeImageSrc(
                    catImage ||
                      catImagePath ||
                      originalCatImage
                  )}
                  alt="preview"
                  className="mt-5 h-32 w-32 rounded-2xl object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      DEFAULT_COVER;
                  }}
                />
              )}

            </div>

            <div className="mt-5 flex gap-3">

              <button
                type="button"
                onClick={
                  saveCategory
                }
                disabled={
                  catSaving
                }
                className="rounded-xl bg-[#D4AF37] px-7 py-3 font-bold text-white disabled:opacity-60"
              >
                {catSaving
                  ? "در حال ذخیره..."
                  : editingCategoryId !==
                    null
                  ? "ذخیره تغییرات"
                  : "ایجاد دسته‌بندی"}
              </button>

              <button
                type="button"
                onClick={
                  resetCategoryForm
                }
                className="rounded-xl bg-gray-500 px-7 py-3 text-white"
              >
                پاک کردن
              </button>

            </div>

          </div>

          {/* CATEGORY LIST */}

          <div className="mt-7 space-y-3">

            {categories.map(
              (cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-4 md:flex-row md:items-center"
                >

                  <div className="flex items-center gap-4">

                    {cat.image ? (
                      <img
                        src={normalizeImageSrc(
                          cat.image
                        )}
                        alt={cat.name}
                        className="h-16 w-16 rounded-xl object-cover"
                        onError={(
                          e
                        ) => {
                          e.currentTarget.src =
                            DEFAULT_COVER;
                        }}
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                        بدون عکس
                      </div>
                    )}

                    <div>
                      <p className="font-bold">
                        {cat.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {cat.slug}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        editCategory(
                          cat
                        )
                      }
                      className="rounded-xl bg-blue-500 px-5 py-2 text-white"
                    >
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteCategory(
                          cat.id
                        )
                      }
                      className="rounded-xl bg-red-500 px-5 py-2 text-white"
                    >
                      حذف
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* =================================================
            PRODUCT
        ================================================= */}

        <section className="rounded-3xl border bg-gray-50 p-5 md:p-7">

          <h2 className="mb-6 text-2xl font-bold">
            {editingId !== null
              ? "ویرایش محصول"
              : "ثبت محصول جدید"}
          </h2>

          <div className="grid gap-5">

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="نام محصول"
              className="rounded-xl border bg-white p-4"
            />

            <input
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              placeholder="قیمت"
              className="rounded-xl border bg-white p-4"
            />

            <input
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value
                )
              }
              placeholder="اسلاگ محصول مثال: amjad"
              className="rounded-xl border bg-white p-4"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="rounded-xl border bg-white p-4"
            >
              <option value="">
                انتخاب دسته‌بندی
              </option>

              {categories.map(
                (cat) => (
                  <option
                    key={cat.id}
                    value={cat.slug}
                  >
                    {cat.name}
                  </option>
                )
              )}
            </select>

            {/* =================================================
                COVER
            ================================================= */}

            <div className="rounded-2xl border bg-white p-5">

              <p className="mb-3 font-semibold">
                عکس اصلی محصول
              </p>

              <input
                value={cover}
                onChange={(e) =>
                  setCover(
                    e.target.value
                  )
                }
                placeholder="/images/esfand/amjad/1.jpg یا URL"
                className="mb-4 w-full rounded-xl border p-4"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setCoverFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="w-full rounded-xl border p-3"
              />

              {coverFile && (
                <p className="mt-2 text-sm text-gray-500">
                  {coverFile.name}
                </p>
              )}

              {cover && (
                <img
                  src={normalizeImageSrc(
                    cover
                  )}
                  alt="cover"
                  className="mt-4 h-32 w-32 rounded-xl object-cover"
                  onError={(
                    e
                  ) => {
                    e.currentTarget.src =
                      DEFAULT_COVER;
                  }}
                />
              )}

            </div>

            {/* =================================================
                MULTIPLE GALLERY
            ================================================= */}

            <div className="rounded-2xl border border-dashed bg-white p-5">

              <p className="mb-2 text-lg font-bold">
                گالری تصاویر محصول
              </p>

              <p className="mb-4 text-sm text-gray-500">
                می‌توانی همزمان چندین عکس انتخاب کنی.
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setGalleryFiles(
                    e.target.files
                  )
                }
                className="w-full rounded-xl border p-3"
              />

              {galleryFiles &&
                galleryFiles.length >
                  0 && (
                  <div className="mt-4">

                    <p className="mb-3 text-sm font-semibold">
                      {galleryFiles.length} عکس انتخاب شده
                    </p>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">

                      {Array.from(
                        galleryFiles
                      ).map(
                        (
                          file,
                          index
                        ) => (
                          <img
                            key={
                              `${file.name}-${index}`
                            }
                            src={URL.createObjectURL(
                              file
                            )}
                            alt={`gallery-${index}`}
                            className="aspect-square w-full rounded-xl object-cover"
                          />
                        )
                      )}

                    </div>

                  </div>
                )}

            </div>

            {/* =================================================
                MANUAL IMAGE LINKS
            ================================================= */}

            <div className="rounded-2xl border bg-white p-5">

              <p className="mb-2 font-semibold">
                یا لینک عکس‌های گالری
              </p>

              <p className="mb-3 text-xs text-gray-500">
                هر عکس را در یک خط وارد کن.
              </p>

              <textarea
                rows={7}
                value={images}
                onChange={(e) =>
                  setImages(
                    e.target.value
                  )
                }
                placeholder={`/images/esfand/amjad/1.jpg
/images/esfand/amjad/2.jpg
/images/esfand/amjad/3.jpg`}
                className="w-full rounded-xl border p-4"
              />

            </div>

            {/* DESCRIPTION */}

            <textarea
              rows={7}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              placeholder="توضیحات محصول"
              className="rounded-xl border bg-white p-4"
            />

            {/* SAVE */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={
                  saveProduct
                }
                disabled={
                  saving ||
                  uploadingImages
                }
                className="flex-1 rounded-xl bg-[#D4AF37] py-4 font-bold text-white disabled:opacity-60"
              >
                {uploadingImages
                  ? "در حال آپلود تصاویر..."
                  : saving
                  ? "در حال ذخیره..."
                  : editingId !== null
                  ? "ذخیره تغییرات"
                  : "ثبت محصول"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={
                    resetProductForm
                  }
                  className="rounded-xl bg-gray-500 px-8 py-3 font-semibold text-white"
                >
                  انصراف
                </button>
              )}

            </div>

          </div>

        </section>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <section className="mt-12">

          <h2 className="mb-6 text-3xl font-bold">
            لیست محصولات
          </h2>

          {products.length ===
          0 ? (
            <div className="rounded-2xl border bg-gray-50 p-8 text-center text-gray-500">
              هنوز محصولی ثبت نشده است.
            </div>
          ) : (
            <div className="space-y-4">

              {products.map(
                (item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border bg-gray-50 p-5"
                  >

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                      <div className="flex items-center gap-4">

                        <img
                          src={normalizeImageSrc(
                            item.cover,
                            DEFAULT_COVER
                          )}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                          onError={(
                            e
                          ) => {
                            e.currentTarget.src =
                              DEFAULT_COVER;
                          }}
                        />

                        <div>

                          <h3 className="text-xl font-bold">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            دسته:{" "}
                            {item.category}
                          </p>

                          <p className="text-sm text-gray-500">
                            اسلاگ:{" "}
                            {item.slug}
                          </p>

                          <p className="mt-2 font-bold text-[#D4AF37]">
                            {item.price} تومان
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {item.images?.length ||
                              0}{" "}
                            عکس
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            editProduct(
                              item
                            )
                          }
                          className="rounded-xl bg-blue-500 px-5 py-2 font-semibold text-white"
                        >
                          ویرایش
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteProduct(
                              item.id
                            )
                          }
                          className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white"
                        >
                          حذف
                        </button>

                      </div>

                    </div>

                    {/* PRODUCT GALLERY PREVIEW */}

                    {item.images &&
                      item.images.length >
                        0 && (
                        <div className="mt-5 border-t pt-5">

                          <p className="mb-3 text-sm font-semibold">
                            تصاویر محصول
                          </p>

                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-8">

                            {item.images.map(
                              (
                                image,
                                index
                              ) => (
                                <img
                                  key={
                                    `${image}-${index}`
                                  }
                                  src={normalizeImageSrc(
                                    image,
                                    DEFAULT_COVER
                                  )}
                                  alt={`${item.name}-${index + 1}`}
                                  className="aspect-square w-full rounded-xl object-cover"
                                  onError={(
                                    e
                                  ) => {
                                    e.currentTarget.src =
                                      DEFAULT_COVER;
                                  }}
                                />
                              )
                            )}

                          </div>

                        </div>
                      )}

                  </div>
                )
              )}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}