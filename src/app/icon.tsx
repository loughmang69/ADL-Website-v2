import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand monogram favicon: accent "ADL" on deep navy.
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
          background: "#0d1f3c",
          color: "#67cbea",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "sans-serif",
        }}
      >
        ADL
      </div>
    ),
    size,
  );
}
