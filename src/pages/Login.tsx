import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateGuestCode } from "@/data/guestCodes";
import { toast } from "sonner";
import { C } from "@/components/shared";

// Palette (from official wedding colors)
// --paper:    #F7F3EE  Parchment
// --paper-2:  #EFE6DA
// --ink:      #4B352A  Deep Mocha
// --gold:     #C5A253  Golden Bronze
// --glaucous: #607C9A  Glaucous (overline, input focus)
// --taupe:    #8B7866

const Login = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const guest = validateGuestCode(code);

      if (guest) {
        localStorage.setItem("guestInfo", JSON.stringify(guest));
        toast.success(`¡Bienvenido/a, ${guest.name}!`);
        navigate("/invitation");
      } else {
        toast.error("Código inválido. Por favor, verifica tu invitación.");
      }

      setIsLoading(false);
    }, 800);
  };

  return (
    <div
      style={{
        background: "#2b2622",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Paper — position:relative so we can layer the double-rule borders */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 430,
          minHeight: 760,
          background:
            "radial-gradient(120% 80% at 50% -10%, #F7F3EE 0%, #EFE6DA 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "64px 44px 40px",
          color: "#4B352A",
        }}
      >
        {/* Double-rule engraved border — outer mocha line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 18,
            border: "1.5px solid rgba(74,55,40,.55)",
            pointerEvents: "none",
          }}
        />
        {/* Double-rule engraved border — inner gold hairline */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 24,
            border: "0.75px solid rgba(197,162,83,.65)",
            pointerEvents: "none",
          }}
        />

        {/* Overline */}
        <p
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 12,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: C.ink,
            marginBottom: 6,
            paddingLeft: "0.42em",
          }}
        >
          Nos casamos
        </p>

        {/* Names */}
        <div style={{ textAlign: "center", lineHeight: 1.15, marginTop: 16 }}>
          <span
            style={{
              display: "block",
              fontFamily: "'Slight', 'Pinyon Script', cursive",
              fontSize: 52,
              color: C.glaucous,
            }}
          >
            Melina
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: 22,
              color: "#C5A253",
              margin: "6px 0",
            }}
          >
            &amp;
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "'Slight', 'Pinyon Script', cursive",
              fontSize: 52,
              color: C.glaucous,
            }}
          >
            Santiago
          </span>
        </div>

        {/* Flourish divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "26px 0 4px",
          }}
        >
          <div
            style={{
              width: 60,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #C5A253 60%, #C5A253)",
            }}
          />
          <div
            style={{
              width: 5,
              height: 5,
              background: "#C5A253",
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              width: 60,
              height: 1,
              background:
                "linear-gradient(270deg, transparent, #C5A253 60%, #C5A253)",
            }}
          />
        </div>

        {/* Form area — lives directly on the paper, no card */}
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Rings */}
          <svg
            width="44"
            height="30"
            viewBox="0 0 44 30"
            fill="none"
            style={{ marginBottom: 22 }}
          >
            <circle cx="17" cy="15" r="11" stroke="#C5A253" strokeWidth="1.2" />
            <circle cx="27" cy="15" r="11" stroke="#C5A253" strokeWidth="1.2" />
          </svg>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 24,
              color: "#4B352A",
              marginBottom: 8,
            }}
          >
            Tu invitación personal
          </h2>

          {/* Subheading */}
          <p
            style={{
              fontSize: 13.5,
              color: "#8B7866",
              letterSpacing: "0.01em",
              marginBottom: 34,
            }}
          >
            Ingresá el código que recibiste
          </p>

          {/* Input */}
          <div style={{ width: "100%", marginBottom: 26 }}>
            <input
              type="text"
              placeholder="Código de invitación"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={20}
              required
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: `1px solid ${inputFocused ? "#607C9A" : "rgba(74,55,40,.35)"}`,
                padding: "10px 4px",
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "#4B352A",
                outline: "none",
                transition: "border-color .25s",
                caretColor: "#607C9A",
              }}
            />
          </div>

          {/* Outline button — fills on hover */}
          <button
            type="submit"
            disabled={isLoading}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              width: "100%",
              background: btnHovered && !isLoading ? "#4B352A" : "transparent",
              border: "1.5px solid #4B352A",
              color: btnHovered && !isLoading ? "#F7F3EE" : "#4B352A",
              fontFamily: "Inter, sans-serif",
              fontSize: 12.5,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              padding: "16px 20px",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color .3s, color .3s, border-color .3s",
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? "Verificando..." : "Ver mi invitación"}
          </button>

          {/* Help text */}
          <p style={{ marginTop: 22, fontSize: 12.5, color: "#8B7866" }}>
            ¿No tenés tu código?{" "}
            <span style={{ color: "#C5A253", borderBottom: "1px solid rgba(197,162,83,.4)", paddingBottom: 1 }}>
              Contactá con los novios
            </span>
          </p>

          {/* Year */}
          <p
            style={{
              marginTop: 30,
              fontFamily: "Playfair Display, serif",
              fontSize: 12,
              letterSpacing: "0.5em",
              color: "#8B7866",
              paddingLeft: "0.5em",
            }}
          >
            2027
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
