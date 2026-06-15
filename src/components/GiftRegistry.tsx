import { useState } from "react";
import { C, Paper, EngravedFrame, Overline, Flourish, InViewFade } from "./shared";

interface GiftOption {
  bank: string;
  holder: string;
  alias: string;
  cbu?: string;
  accountType: string;
}

const GIFTS: GiftOption[] = [
  {
    bank: "Brubank",
    holder: "Santiago Agustín Villar Araya",
    alias: "villar.araya.santiago",
    cbu: "0170123456789012345678",
    accountType: "Cuenta Corriente",
  },
  {
    bank: "Mercado Pago",
    holder: "Melina Capel",
    alias: "melina.capel",
    cbu: "0720987654321098765432",
    accountType: "Cuenta de Ahorro",
  },
];

const Row = ({ label, value, onCopy, copied }: { label: string; value: string; onCopy: () => void; copied: boolean }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 8,
    padding: "10px 0",
    borderBottom: "1px solid rgba(75,53,42,.12)",
  }}>
    <div>
      <p style={{
        fontFamily: "Playfair Display, serif",
        fontSize: 10.5,
        letterSpacing: ".24em",
        textTransform: "uppercase",
        color: C.glaucous,
        marginBottom: 3,
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: "Playfair Display, serif",
        fontSize: 15,
        color: C.ink,
        letterSpacing: ".06em",
        fontVariantNumeric: "tabular-nums",
      }}>
        {value}
      </p>
    </div>
    <button
      onClick={onCopy}
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: 11.5,
        color: copied ? C.taupe : C.gold,
        background: "none",
        border: "none",
        cursor: "pointer",
        flexShrink: 0,
        transition: "color .2s",
        padding: 0,
      }}
    >
      {copied ? "Copiado ✓" : "Copiar"}
    </button>
  </div>
);

const GiftRegistry = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Paper>
      <EngravedFrame />

      <div style={{
        position: "relative",
        zIndex: 3,
        flex: 1,
        padding: "64px 46px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
        <InViewFade>
          <Overline style={{color: C.glaucous}}>Regalos</Overline>
        </InViewFade>
        <InViewFade delay={0.1}>
          <h2 style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 26,
            color: C.ink,
            marginTop: 10,
            lineHeight: 1.2,
          }}>
            Tu presencia es el mejor presente
          </h2>
        </InViewFade>
        <InViewFade delay={0.15}>
          <p style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontSize: 14,
            color: C.taupe,
            lineHeight: 1.65,
            marginTop: 14,
            maxWidth: 310,
          }}>
            Pero si deseás colaborar con un regalo, el dinero nos será de mucha utilidad. Podés depositarlo en cualquiera de las siguientes cuentas.
          </p>
        </InViewFade>
        <InViewFade delay={0.2}>
          <Flourish style={{ margin: "24px 0" }} />
        </InViewFade>

        {/* Bloques de cuenta */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
          {GIFTS.map((g, i) => (
            <div key={i}>
              <InViewFade delay={0.1 + i * 0.1} style={{ width: "100%", textAlign: "left" }}>
                {/* Nombre del banco — Playfair italic golden-bronze */}
                <p style={{
                  fontFamily: "Playfair Display, serif",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: C.gold,
                  marginBottom: 4,
                }}>
                  {g.bank}
                </p>

                <Row
                  label="Titular"
                  value={g.holder}
                  onCopy={() => handleCopy(g.holder, `${i}-holder`)}
                  copied={copied === `${i}-holder`}
                />
                <Row
                  label="Alias"
                  value={g.alias}
                  onCopy={() => handleCopy(g.alias, `${i}-alias`)}
                  copied={copied === `${i}-alias`}
                />
                {g.cbu && (
                  <Row
                    label="CBU"
                    value={g.cbu}
                    onCopy={() => handleCopy(g.cbu!, `${i}-cbu`)}
                    copied={copied === `${i}-cbu`}
                  />
                )}
                <div style={{ height: 1, background: "rgba(75,53,42,.12)" }} />
              </InViewFade>

              {i < GIFTS.length - 1 && (
                <InViewFade delay={0.25} style={{ display: "flex", justifyContent: "center" }}>
                  <Flourish ruleWidth={36} style={{ margin: "24px 0" }} />
                </InViewFade>
              )}
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default GiftRegistry;
