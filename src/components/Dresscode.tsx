import { Shirt, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import couplePhoto3 from "@/assets/couple-photo-3.jpg";

const Dresscode = () => {
  const pinterestUrl = "https://www.pinterest.com/search/pins/?q=formal%20wedding%20attire";

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 items-stretch">
        {/* Image - 1/3 */}
        <div className="hidden md:block">
          <img 
            src={couplePhoto3} 
            alt="Couple photo" 
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>
        
        {/* Content - 2/3 */}
        <div className="md:col-span-2 flex flex-col justify-center p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shirt className="w-5 h-5 text-wedding-gold" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Dresscode
              </span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
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
  );
};

export default Dresscode;
