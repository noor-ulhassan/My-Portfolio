import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Generated favicon: the first initial on the warm terracotta accent. */
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
          background: "#e08a52",
          color: "#14110d",
          fontSize: 22,
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
