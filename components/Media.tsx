import type { Photo } from "@/site.config";

/** A photo that fills its (relatively positioned) parent. */
export function Media({
  photo,
  priority = false,
  decorative = false,
  className = "",
}: {
  photo: Photo;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo.src}
      alt={decorative ? "" : photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ backgroundColor: photo.tone ?? "#5b6152" }}
    />
  );
}
