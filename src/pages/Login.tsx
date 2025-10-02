import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateGuestCode } from "@/data/guestCodes";
import { toast } from "sonner";

const Login = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-cream via-wedding-pink to-wedding-beige p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Heart className="w-16 h-16 mx-auto mb-4 text-wedding-gold" />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-2">
            Melina & Santiago
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Nuestra boda
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-[var(--shadow-elegant)] p-8 animate-scale-in">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent mb-3">
              <Lock className="w-6 h-6 text-accent-foreground" />
            </div>
            <h2 className="font-playfair text-2xl font-semibold mb-2">
              Ingresa tu código
            </h2>
            <p className="text-sm text-muted-foreground">
              Introduce el código de invitación que recibiste
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Código de invitación"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="text-center text-lg tracking-wider font-medium"
                maxLength={20}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-wedding-gold hover:bg-wedding-gold/90 text-foreground font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Acceder"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            ¿No tienes tu código? Contacta con los novios
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
