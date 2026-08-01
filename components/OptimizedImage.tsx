import { useMemo } from "react";
import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

function buildImageSrc(src: string | undefined) {
  if (!src) return "/images/logo.png?v=shinebride-20260801";

  const fallback = "/images/logo.png?v=shinebride-20260801";
  if (typeof src !== "string") return fallback;

  const trimmed = src.trim();
  if (!trimmed) return fallback;

  if (/^https?:\/\//i.test(trimmed)) {
    return `${trimmed}${trimmed.includes("?") ? "&" : "?"}v=shinebride-20260801`;
  }

  if (trimmed.startsWith("/")) {
    return `${trimmed}${trimmed.includes("?") ? "&" : "?"}v=shinebride-20260801`;
  }

  return `/${trimmed}${trimmed.includes("?") ? "&" : "?"}v=shinebride-20260801`;
}

export default function OptimizedImage({
  fill = false,
  priority,
  style,
  className,
  loading,
  src,
  ...props
}: Props) {
  const resolvedStyle = fill
    ? {
        ...style,
        position: "absolute" as const,
        inset: 0,
        width: "100%",
        height: "100%",
      }
    : style;

  const resolvedSrc = useMemo(() => buildImageSrc(src), [src]);

  return (
    <img
      {...props}
      src={resolvedSrc}
      className={className}
      style={resolvedStyle}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding="async"
    />
  );
}
