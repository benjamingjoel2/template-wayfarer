import { ImageResponse } from "next/og";
import site from "@/site.config";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: the brand monogram on the highlight colour. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: site.colors.highlight,
          color: site.colors.paper,
          fontSize: 40,
        }}
      >
        {site.brand.monogram}
      </div>
    ),
    size,
  );
}
