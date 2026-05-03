import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface GiftOption {
  bank: string;
  accountHolder: string;
  alias: string;
  accountType: string;
  cbu?: string;
}

const GiftRegistry = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const giftOptions: GiftOption[] = [
    {
      bank: "Brubank",
      accountHolder: "Santiago Agustín Villar Araya",
      alias: "1234567890",
      accountType: "Cuenta Corriente",
      cbu: "0170123456789012345678"
    },
    {
      bank: "Mercado Pago",
      accountHolder: "Melina Capel",
      alias: "9876543210",
      accountType: "Cuenta de Ahorro",
      cbu: "0720987654321098765432"
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="w-full py-12 px-4 bg-gradient-to-b from-white to-wedding-gold/5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 mb-6 ${isVisible ? 'animate-slide-up' : ''}`}>
            <Gift className="w-5 h-5 text-wedding-gold" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Regalos
            </span>
          </div>
          <p className={`font-playfair text-3xl md:text-5xl font-light mb-6 leading-relaxed ${isVisible ? 'animate-slide-up-delay-200' : ''}`}>
            Tu presencia es el mejor presente
          </p>
          <p className={`text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed ${isVisible ? 'animate-slide-up-delay-400' : ''}`}>
            Sabemos el esfuerzo que representa acompañarnos en este día tan especial. Si deseás colaborar con un regalo, el dinero nos será de utilidad. Podés depositarlo en cualquiera de las siguientes cuentas.
          </p>
        </div>

        {/* Gift Options */}
        <div className="space-y-6">
          {giftOptions.map((option, index) => (
            <div
              key={index}
              className={`bg-card rounded-lg p-8 shadow-sm border border-wedding-gold/20 hover:border-wedding-gold/50 hover:shadow-md transition-all duration-300 ${isVisible ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: isVisible ? `${index * 0.2}s` : '0s' }}
            >
              <h3 className="font-playfair text-2xl font-bold mb-6 text-wedding-gold">
                {option.bank}
              </h3>

              <div className="space-y-4">
                {/* Account Holder */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Titular de la Cuenta
                  </p>
                  <div className="flex items-center justify-between bg-muted/50 rounded p-3">
                    <span className="font-medium">{option.accountHolder}</span>
                    <button
                      onClick={() => handleCopy(option.accountHolder, index)}
                      className="text-wedding-gold hover:text-wedding-gold/80 transition-colors"
                      title="Copiar"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Account Number */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Número de Cuenta
                  </p>
                  <div className="flex items-center justify-between bg-muted/50 rounded p-3">
                    <span className="font-medium font-mono">{option.alias}</span>
                    <button
                      onClick={() => handleCopy(option.alias, index)}
                      className="text-wedding-gold hover:text-wedding-gold/80 transition-colors"
                      title="Copiar"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Account Type */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Tipo de Cuenta
                  </p>
                  <p className="text-sm">{option.accountType}</p>
                </div>

                {/* CBU if available */}
                {option.cbu && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      CBU
                    </p>
                    <div className="flex items-center justify-between bg-muted/50 rounded p-3">
                      <span className="font-medium font-mono text-sm">{option.cbu}</span>
                      <button
                        onClick={() => handleCopy(option.cbu!, index)}
                        className="text-wedding-gold hover:text-wedding-gold/80 transition-colors"
                        title="Copiar"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            Gracias por ser parte de nuestro día especial.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GiftRegistry;