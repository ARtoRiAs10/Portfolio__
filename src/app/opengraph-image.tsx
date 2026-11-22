import { ImageResponse } from "next/og";

export const alt =
  "Gaurav Kumar — Full-stack and AI engineer. I build fast Next.js SaaS apps and AI workflows that ship on time.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono = "monospace";

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
          background: "#050806",
          backgroundImage:
            "radial-gradient(circle at 74% 46%, rgba(124,255,178,0.16), transparent 34%), linear-gradient(135deg, #040806 0%, #07110e 55%, #0a1c1a 100%)",
          color: "#e8f6ec",
          padding: "52px 60px 44px",
          fontFamily: mono,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(124,255,178,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,255,178,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.7,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
              <div style={{ fontSize: 16, color: "#e8f6ec" }}>Gaurav Kumar</div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#7f9185",
                  marginTop: 5,
                }}
              >
                full-stack &amp; ai engineer
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 650 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#7cffb2",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 30, height: 1, background: "#7cffb2" }} />
              portfolio v1.0 · dual mode
            </div>

            <div
              style={{
                fontSize: 72,
                lineHeight: 1.02,
                letterSpacing: -3,
                color: "#e8f6ec",
                display: "flex",
                flexDirection: "column",
                marginTop: 18,
              }}
            >
              <span>Gaurav Kumar</span>
              <span style={{ color: "#7cffb2" }}>ships on time.</span>
            </div>

            <div
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: "#b9c9bd",
                marginTop: 18,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>I build fast Next.js SaaS apps</span>
              <span>and AI workflows that ship on time.</span>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {[
                { label: "3D WORLD", color: "#7cffb2" },
                { label: "CLI", color: "#67e8f9" },
                { label: "15 CASE STUDIES", color: "#ffc857" },
              ].map((chip) => (
                <div
                  key={chip.label}
                  style={{
                    border: `1px solid ${chip.color}55`,
                    background: `${chip.color}11`,
                    color: chip.color,
                    fontSize: 10,
                    letterSpacing: 1.4,
                    padding: "7px 10px",
                  }}
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </div>

          {/* island illustration */}
          <div
            style={{
              width: 480,
              height: 330,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 8,
                width: 420,
                height: 92,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0b3b4a, #0e5360 55%, #08222e)",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 52,
                width: 310,
                height: 72,
                borderRadius: "50%",
                background: "linear-gradient(180deg, #3a2818, #1c130d)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 80,
                width: 320,
                height: 92,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2f7d4a, #1a4a2e)",
                border: "2px solid #3f9a5a",
              }}
            />

            {/* terminal */}
            <div
              style={{
                position: "absolute",
                left: 92,
                top: 40,
                width: 180,
                height: 108,
                borderRadius: 8,
                background: "#0b1510",
                border: "2px solid #355040",
                display: "flex",
                flexDirection: "column",
                padding: 12,
                gap: 6,
              }}
            >
              <div
                style={{
                  height: 58,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #7cffb2, #67e8f9)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: 8,
                  color: "#04110a",
                  fontSize: 7,
                  lineHeight: 1.5,
                }}
              >
                <span>gaurav@portfolio:~$ help</span>
                <span>ls projects · open orchestra</span>
                <span>services · estimate · hire</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 38, height: 4, background: "#2a1b10" }} />
                <span style={{ width: 24, height: 4, background: "#1c130d" }} />
              </div>
            </div>

            {/* rover */}
            <div
              style={{
                position: "absolute",
                bottom: 112,
                left: 238,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: 4, marginBottom: 3 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#fff2d0" }} />
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#fff2d0" }} />
              </div>
              <div
                style={{
                  width: 96,
                  height: 26,
                  borderRadius: 6,
                  background: "#ffc857",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    width: 50,
                    height: 16,
                    borderRadius: 4,
                    background: "#0b1510",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ width: 34, height: 6, borderRadius: 2, background: "#7cffb2" }} />
                </span>
              </div>
              <div style={{ display: "flex", gap: 42, marginTop: -4 }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: "#111827", border: "4px solid #ffc857" }} />
                <span style={{ width: 22, height: 22, borderRadius: 999, background: "#111827", border: "4px solid #ffc857" }} />
              </div>
            </div>

            {/* floating blocks */}
            {[
              { label: "TS", color: "#7cffb2", left: 28, top: 8 },
              { label: "AI", color: "#ffc857", left: 396, top: 34 },
              { label: "NEXT", color: "#67e8f9", left: 330, top: 0 },
            ].map((block) => (
              <div
                key={block.label}
                style={{
                  position: "absolute",
                  left: block.left,
                  top: block.top,
                  width: 52,
                  height: 48,
                  borderRadius: 4,
                  background: "#0b1510",
                  border: `1px solid ${block.color}88`,
                  color: block.color,
                  fontSize: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {block.label}
              </div>
            ))}

            {/* portal */}
            <div
              style={{
                position: "absolute",
                right: 8,
                bottom: 56,
                width: 62,
                height: 104,
                borderRadius: "50%",
                border: "4px solid #67e8f9",
                boxShadow: "0 0 24px rgba(103,232,249,0.45)",
                opacity: 0.9,
              }}
            />
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