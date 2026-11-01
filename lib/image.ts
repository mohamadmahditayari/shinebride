export function normalizeImageSrc(
  value: unknown,
  fallback = "/images/logo.png"
): string {
  if (!value || typeof value !== "string") {
    return fallback;
  }

  let imagePath = value.trim();

  if (!imagePath) {
    return fallback;
  }

  // Windows path
  imagePath = imagePath.replace(/\\/g, "/");

  // Remove public/
  imagePath = imagePath.replace(/^public\//i, "");

  // Remove /public/
  imagePath = imagePath.replace(/^\/public\//i, "/");

  // Full external URL
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Supabase storage URL
  if (
    imagePath.startsWith("https://") ||
    imagePath.startsWith("http://")
  ) {
    return imagePath;
  }

  // Local image
  if (!imagePath.startsWith("/")) {
    imagePath = `/${imagePath}`;
  }

  return imagePath;
}

export function normalizeImageArray(
  items: unknown,
  fallback = "/images/logo.png"
): string[] {
  if (!Array.isArray(items)) {
    return [fallback];
  }

  const result = items
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => normalizeImageSrc(item, ""))
    .filter(Boolean);

  return result.length > 0 ? result : [fallback];
}