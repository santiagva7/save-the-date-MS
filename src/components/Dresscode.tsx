import { Shirt, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import extendedKiss from "@/assets/extended-hand-kiss.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Dresscode = () => {
  const pinterestUrl = "https://www.pinterest.com/search/pins/?q=formal%20wedding%20attire";

  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Mobile layout - Image on top */}
        <div className="md:hidden flex flex-col gap-0">
          <img 
            src={extendedKiss} 
            alt="Couple photo" 
            className={`w-full h-80 object-cover rounded-t-2xl ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          />
          
          {/* Content */}
          <div className={`flex flex-col justify-center p-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-2 mb-4 justify-center ${isVisible ? 'animate-slide-up-delay-200' : 'opacity-0'}`}>
                <Shirt className="w-5 h-5 text-wedding-gold" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Dresscode
                </span>
              </div>
              <h2 className={`font-playfair text-3xl font-bold mb-2 ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}>
                Código de vestimenta
              </h2>
            </div>

            <div className="grid gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <h3 className="font-playfair text-xl font-semibold mb-3 text-wedding-gold">
                  Formal Elegante
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Mujeres:</span> Vestidos largos o de cóctel elegantes
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Hombres:</span> Traje completo con corbata
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <h3 className="font-playfair text-xl font-semibold mb-3 text-wedding-gold">
                  Formal Sport
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Mujeres:</span> Vestidos cortos o conjuntos elegantes
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Hombres:</span> Camisa con pantalón de vestir (sin corbata)
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                asChild
                variant="outline"
                className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10"
              >
                <a
                  href={pinterestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver ideas de outfits
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop layout - Image on left */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-0 md:items-stretch">
          {/* Image - 1/3 */}
          <div className={isVisible ? 'animate-slide-in-left' : 'opacity-0'}>
            <img 
              src={extendedKiss} 
              alt="Couple photo" 
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>
          
          {/* Content - 2/3 */}
          <div className={`md:col-span-2 flex flex-col justify-center p-8 md:p-12 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="text-center mb-8">
              <div className={`inline-flex items-center gap-2 mb-4 justify-center ${isVisible ? 'animate-slide-up-delay-300' : 'opacity-0'}`}>
                <Shirt className="w-5 h-5 text-wedding-gold" />
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Dresscode
                </span>
              </div>
              <h2 className={`font-playfair text-3xl md:text-4xl font-bold mb-2 ${isVisible ? 'animate-slide-up-delay-400' : 'opacity-0'}`}>
                Código de vestimenta
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <h3 className="font-playfair text-xl font-semibold mb-3 text-wedding-gold">
                  Formal Elegante
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Mujeres:</span> Vestidos largos o de cóctel elegantes
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Hombres:</span> Traje completo con corbata
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <h3 className="font-playfair text-xl font-semibold mb-3 text-wedding-gold">
                  Formal Sport
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Mujeres:</span> Vestidos cortos o conjuntos elegantes
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Hombres:</span> Camisa con pantalón de vestir (sin corbata)
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                asChild
                variant="outline"
                className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold/10"
              >
                <a
                  href={pinterestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver ideas de outfits
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dresscode;
