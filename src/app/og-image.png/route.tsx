import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #142b56 0%, #0d1f3c 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#ffffff",
          }}
        >
          <span style={{ color: "#67cbea" }}>ADL</span>
          <span style={{ marginLeft: 14 }}>Business Consulting</span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 28,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            maxWidth: 1000,
          }}
        >
          <span>Big-firm expertise.&nbsp;</span>
          <span style={{ color: "#67cbea" }}>Small business focus.</span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Bay Area CPA &amp; Business Advisor · Fremont, CA · CA #150109
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
