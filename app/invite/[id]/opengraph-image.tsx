import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getInvite(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/invites?id=eq.${id}&select=partner1,partner2,date,venue,location,image_url&limit=1`;
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
    });
    const rows = await res.json();
    return rows?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function OGImage({ params }: { params: { id: string } }) {
  const data = await getInvite(params.id);

  const p1 = data?.partner1 || "Partner One";
  const p2 = data?.partner2 || "Partner Two";
  const date = data?.date || "";
  const venue = data?.venue || "";
  const location = data?.location || "";
  const photoUrl: string | null = data?.image_url || null;

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
        {/* Outer gold border */}
        <div
          style={{
            position: "absolute",
            inset: 18,
            border: "1px solid rgba(201,169,110,0.4)",
            display: "flex",
          }}
        />

        {/* Text content */}
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
          {/* Label row */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
            <div style={{ height: 1, width: 60, background: "#C9A96E" }} />
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.45em",
                color: "#B8960C",
                textTransform: "uppercase",
                fontFamily: "Georgia, serif",
              }}
            >
              Wedding Invitation
            </span>
            <div style={{ height: 1, width: 60, background: "#C9A96E" }} />
          </div>

          {/* Partner 1 */}
          <div
            style={{
              fontSize: photoUrl ? 68 : 82,
              color: "#2C2C2C",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              lineHeight: 1.05,
              textAlign: "center",
            }}
          >
            {p1}
          </div>

          {/* & */}
          <div
            style={{
              fontSize: 34,
              color: "#B8960C",
              fontFamily: "Georgia, serif",
              margin: "8px 0",
            }}
          >
            &amp;
          </div>

          {/* Partner 2 */}
          <div
            style={{
              fontSize: photoUrl ? 68 : 82,
              color: "#2C2C2C",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              lineHeight: 1.05,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            {p2}
          </div>

          {/* Divider */}
          <div style={{ height: 1, width: 80, background: "#D4B86A", marginBottom: 24 }} />

          {date && (
            <div
              style={{
                fontSize: 16,
                color: "#6B6359",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {date}
            </div>
          )}

          {venue && (
            <div
              style={{
                fontSize: 22,
                color: "#2C2C2C",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                marginBottom: 6,
              }}
            >
              {venue}
            </div>
          )}

          {location && (
            <div
              style={{
                fontSize: 15,
                color: "#8A8A8A",
                fontFamily: "Georgia, serif",
                letterSpacing: "0.12em",
              }}
            >
              {location}
            </div>
          )}
        </div>

        {/* Photo panel */}
        {photoUrl && (
          <div style={{ display: "flex", width: 380, overflow: "hidden", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Forevermore brand */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: photoUrl ? 380 : 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.45em",
              color: "#C9A96E",
              fontFamily: "Georgia, serif",
              textTransform: "uppercase",
            }}
          >
            Forevermore
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
