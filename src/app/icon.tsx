import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const buf = fs.readFileSync(path.join(process.cwd(), "public/profile.jpeg"));
  const dataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <img src={dataUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ),
    { ...size },
  );
}
