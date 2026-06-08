import { ImageResponse } from "next/og";

export const alt =
  "The Cherry Effect — Psychology-led Digital Marketing Agency in Delhi NCR";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 18% 18%, rgba(255,0,149,0.35), transparent 42%), radial-gradient(circle at 85% 22%, rgba(245,230,168,0.28), transparent 38%), radial-gradient(circle at 75% 90%, rgba(0,168,107,0.30), transparent 42%), linear-gradient(180deg, #0b0b0b 0%, #050505 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#f5e6a8",
          }}
        >
          The Cherry Effect
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Digital Marketing Agency in Delhi NCR
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "rgba(255,255,255,0.72)",
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Performance marketing, social, SEO, influencer & affiliate
            marketing, web development, and growth consultancy.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: 30,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          <span style={{ display: "flex", color: "#ff0095" }}>Influence.</span>
          <span style={{ display: "flex", color: "#f5e6a8" }}>Growth.</span>
          <span style={{ display: "flex", color: "#00a86b" }}>Precision.</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
