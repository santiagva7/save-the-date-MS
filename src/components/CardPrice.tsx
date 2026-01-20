import { CreditCard } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CardPriceProps {
  price: number;
  currency?: string;
}

const CardPrice = ({ price, currency = "USD" }: CardPriceProps) => {
  return (
    <Alert className="border-wedding-gold/30 bg-wedding-gold/5 mb-6">
      <div className="flex items-start gap-3">
        <CreditCard className="w-5 h-5 text-wedding-gold mt-0.5" />
        <AlertDescription className="text-sm">
          <p className="font-medium font bold text-foreground mb-1">Valor de la tarjeta</p>
          <p className="text-wedding-gold font-semibold text-lg">
            ${price} {currency}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Podes pagar en pesos argentinos con el valor del dolar del día!
          </p>
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default CardPrice;
