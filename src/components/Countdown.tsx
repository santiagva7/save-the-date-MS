import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import couplePhoto1 from "@/assets/couple-photo-1.jpg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const weddingDate = new Date("2027-12-15T18:00:00");
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = weddingDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-card rounded-xl shadow-[var(--shadow-soft)] p-4 mb-2 min-w-[70px] md:min-w-[90px]">
        <span className="font-playfair text-3xl md:text-4xl font-bold text-wedding-gold">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-0 items-stretch">
        {/* Image - 1/3 */}
        <div className="hidden md:block">
          <img 
            src={couplePhoto1} 
            alt="Couple photo" 
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>
        
        {/* Content - 2/3 */}
        <div className="md:col-span-2 flex flex-col justify-center p-8 md:p-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-wedding-gold" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Cuenta regresiva
              </span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8">
              Faltan...
            </h2>

            <div className="flex justify-center gap-4 md:gap-6">
              <TimeUnit value={timeLeft.days} label="Días" />
              <TimeUnit value={timeLeft.hours} label="Horas" />
              <TimeUnit value={timeLeft.minutes} label="Minutos" />
              <TimeUnit value={timeLeft.seconds} label="Segundos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
