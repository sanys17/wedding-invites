import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; bot/1.0)" } }
    ).then((r) => r.text());
    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
    if (!match) return null;
    return fetch(match[1]).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OGImage({ params }: { params: { id: string } }) {
  const [{ data }, fontData] = await Promise.all([
    supabase.from("invites").select("partner1,partner2,date,venue,location,image_url").eq("id", params.id).single(),
    loadFont(),
  ]);

  const p1 = data?.partner1 || "Partner One";
  const p2 = data?.partner2 || "Partner Two";
  const date = data?.date || "";
  const venue = data?.venue || "";
  const location = data?.location || "";
  const photoUrl = data?.image_url || null;

  const fonts = fontData
    ? [
        { name: "Playfair", data: fontData, style: "italic" as const, weight: 400 as const },
        { name: "Playfair", data: fontData, style: "normal" as const, weight: 400 as const },
      ]
    : [];

  const serifFamily = fontData ? "Playfair" : "Georgia, serif";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#FAF8F5",
          position: "relative",
        }}
      >
        {/* Gold border */}
        <div
          style={{
            position: "absolute",
            inset: 18,
            border: "1px solid rgba(201,169,110,0.35)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(201,169,110,0.15)",
            display: "flex",
          }}
        />

        {/* Main text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            padding: photoUrl ? "60px 60px 60px 80px" : "60px 80px",
          }}
        >
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 36,
            }}
          >
            <div style={{ height: 1, width: 56, background: "#C9A96E" }} />
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.45em",
                color: "#B8960C",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                fontWeight: 300,
              }}
            >
              Wedding Invitation
            </span>
            <div style={{ height: 1, width: 56, background: "#C9A96E" }} />
          </div>

          {/* Partner 1 */}
          <div
            style={{
              fontSize: photoUrl ? 64 : 76,
              color: "#2C2C2C",
              fontFamily: serifFamily,
              fontStyle: "italic",
              lineHeight: 1.05,
              textAlign: "center",
            }}
          >
            {p1}
          </div>

          {/* Ampersand */}
          <div
            style={{
              fontSize: 36,
              color: "#B8960C",
              fontFamily: "sans-serif",
              marginTop: 6,
              marginBottom: 6,
            }}
          >
            &amp;
          </div>

          {/* Partner 2 */}
          <div
            style={{
              fontSize: photoUrl ? 64 : 76,
              color: "#2C2C2C",
              fontFamily: serifFamily,
              fontStyle: "italic",
              lineHeight: 1.05,
              textAlign: "center",
              marginBottom: 36,
            }}
          >
            {p2}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              width: 72,
              background: "#D4B86A",
              marginBottom: 22,
            }}
          />

          {/* Date */}
          {date && (
            <div
              style={{
                fontSize: 16,
                color: "#6B6359",
                fontFamily: "sans-serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {date}
            </div>
          )}

          {/* Venue */}
          {venue && (
            <div
              style={{
                fontSize: 20,
                color: "#2C2C2C",
                fontFamily: serifFamily,
                fontStyle: "italic",
                marginBottom: 4,
              }}
            >
              {venue}
            </div>
          )}

          {/* Location */}
          {location && (
            <div
              style={{
                fontSize: 15,
                color: "#8A8A8A",
                fontFamily: "sans-serif",
                letterSpacing: "0.12em",
              }}
            >
              {location}
            </div>
          )}
        </div>

        {/* Couple photo panel */}
        {photoUrl && (
          <div
            style={{
              display: "flex",
              width: 380,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Fade overlay on left edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: 80,
                background: "linear-gradient(to right, #FAF8F5, transparent)",
                display: "flex",
              }}
            />
          </div>
        )}

        {/* Corner ornaments */}
        {[
          { top: 30, left: 30 },
          { top: 30, right: 30 },
          { bottom: 30, left: 30 },
          { bottom: 30, right: 30 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 16,
              height: 16,
              borderTop: i < 2 ? "1px solid rgba(201,169,110,0.5)" : undefined,
              borderBottom: i >= 2 ? "1px solid rgba(201,169,110,0.5)" : undefined,
              borderLeft: i % 2 === 0 ? "1px solid rgba(201,169,110,0.5)" : undefined,
              borderRight: i % 2 === 1 ? "1px solid rgba(201,169,110,0.5)" : undefined,
              display: "flex",
              ...pos,
            }}
          />
        ))}

        {/* Forevermore brand */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 0,
            right: photoUrl ? 380 : 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.4em",
              color: "#C9A96E",
              fontFamily: "sans-serif",
              textTransform: "uppercase",
            }}
          >
            Forevermore
          </span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
