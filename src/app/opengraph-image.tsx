import { ImageResponse } from "next/og";

export const alt =
  "Gaurav Kumar — I build software that feels inevitable. Full-stack and AI engineer.";
export const size = { width: 1200, height: 630 };
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
          background: "#070a08",
          color: "#d9e6dc",
          padding: "54px 64px 46px",
          fontFamily: "monospace",
          border: "1px solid #1d2a21",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #355040",
                color: "#7cffb2",
                fontSize: 15,
              }}
            >
              GK
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 17, color: "#d9e6dc" }}>
                Gaurav Kumar
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#7f9185",
                  marginTop: 5,
                }}
              >
                freelance engineer
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #355040",
              padding: "9px 13px",
              fontSize: 10,
              letterSpacing: 1,
              color: "#7cffb2",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#7cffb2",
                display: "block",
              }}
            />
            OPEN FOR SELECT PROJECTS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#7f9185",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ width: 30, height: 1, background: "#7cffb2" }} />
            portfolio v3.0 · terminal
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -4,
              color: "#d9e6dc",
              display: "flex",
              flexDirection: "column",
              maxWidth: 980,
            }}
          >
            <span>I build software</span>
            <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span>that feels</span>
              <span style={{ color: "#7cffb2", fontStyle: "italic" }}>
                inevitable.
              </span>
            </span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#7f9185",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "#7cffb2" }}>❯</span>
            <span>full-stack &amp; AI engineer · remote / worldwide</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1d2a21",
            paddingTop: 18,
            fontSize: 10,
            letterSpacing: 1,
            color: "#7f9185",
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>AI PRODUCTS</span>
            <span>SAAS PLATFORMS</span>
            <span>DEVELOPER INFRA</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#d9e6dc" }}>SELECTED WORK</span> 2024—2026
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}