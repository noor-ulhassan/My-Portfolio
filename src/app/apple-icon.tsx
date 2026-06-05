import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Generated touch icon: initial on the warm accent with rounded padding. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14110d",
          color: "#e08a52",
          fontSize: 110,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        {profile.name.charAt(0)}
      </div>
    ),
    { ...size },
  );
}
