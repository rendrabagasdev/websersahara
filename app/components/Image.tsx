import type { ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  priority?: boolean;
};

export function Image({
  priority = false,
  loading,
  decoding,
  fetchPriority,
  sizes,
  ...rest
}: ImageProps) {
  return (
    <img
      {...rest}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority ?? (priority ? "high" : "low")}
      sizes={sizes ?? "100vw"}
    />
  );
}
