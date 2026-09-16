import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: research materials for qualified researchers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14130f";
const ACID = "#c9f24d";
const PAPER = "#f0ece1";
const MUTED = "#a39d8c";

/**
 * Generated Open Graph card. Edit the copy here to change link previews.
 *
 * Note: the renderer requires an explicit `display` on any element with more
 * than one child, and does not support <br>; each line is its own element.
 */
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
          background: INK,
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 12, height: 12, background: ACID }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: ACID,
              fontFamily: "monospace",
            }}
          >
            {`${site.location} / Research supply`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, color: PAPER, lineHeight: 1.04 }}>
            Research materials for
          </div>
          <div style={{ fontSize: 88, color: PAPER, lineHeight: 1.04 }}>
            qualified researchers.
          </div>
          <div style={{ display: "flex", width: 220, height: 4, background: ACID, marginTop: 34 }} />
          <div style={{ fontSize: 30, color: MUTED, fontFamily: "sans-serif", marginTop: 30 }}>
            {site.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 19,
            letterSpacing: 5,
            color: MUTED,
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Research use only · Not for human or veterinary use
        </div>
      </div>
    ),
    size,
  );
}
