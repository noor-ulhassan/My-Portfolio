import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share card (warm espresso, terracotta accent). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14110d",
          color: "#ece3d3",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#e08a52",
              color: "#14110d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {profile.name.charAt(0)}
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#9c9181",
              fontFamily: "monospace",
            }}
          >
            {profile.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 34, color: "#9c9181", maxWidth: 900 }}>
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#9c9181" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#e08a52" }} />
          {profile.available ? "Available for work" : "Open to opportunities"}
          <div style={{ marginLeft: "auto", color: "#756a5b" }}>{profile.location}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
