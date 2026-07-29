export function normalizeImageSrc(value: unknown, fallback = "/images/logo.png"): string {
  if (!value || typeof value !== "string") {
    return fallback;
  }

  let imagePath = value.trim();
  if (!imagePath) {
    return fallback;
  }

  imagePath = imagePath.replace(/\\/g, "/");
  imagePath = imagePath.replace(/\/\/+/g, "/");

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  imagePath = imagePath.replace(/^public\//i, "");

  if (!imagePath.startsWith("/")) {
    imagePath = `/${imagePath}`;
  }

  return imagePath;
}

export function normalizeImageArray(items: unknown[], fallback = "/images/logo.png"): string[] {
  if (!Array.isArray(items)) {
    return [fallback];
  }

  const normalized = items
    .filter((item) => Boolean(item))
    .map((item) => normalizeImageSrc(item, fallback));

  return normalized.length > 0 ? normalized : [fallback];
}
