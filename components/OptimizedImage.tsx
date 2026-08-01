import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

export default function OptimizedImage({
  fill = false,
  priority,
  style,
  className,
  loading,
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

  return (
    <img
      {...props}
      className={className}
      style={resolvedStyle}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding="async"
    />
  );
}
