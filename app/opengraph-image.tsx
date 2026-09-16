import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — research materials for qualified researchers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated Open Graph card. Edit the copy here to change link previews. */
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
          background: "#ffffff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#1d4ed8",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 600, color: "#0f172a" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 600, color: "#0f172a", lineHeight: 1.1 }}>
            Research materials for qualified researchers.
          </div>
          <div style={{ fontSize: 28, color: "#64748b" }}>{site.location}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            color: "#1d4ed8",
            fontWeight: 600,
          }}
        >
          RESEARCH USE ONLY · NOT FOR HUMAN OR VETERINARY USE
        </div>
      </div>
    ),
    size,
  );
}
