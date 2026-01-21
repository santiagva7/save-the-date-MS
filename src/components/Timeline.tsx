import { Clock, MapPin } from "lucide-react";

interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  description?: string;
}

const Timeline = () => {
  const events: TimelineEvent[] = [
    {
      time: "19:00",
      title: "Ceremonia",
      location: "Iglesia Central",
      description: "Comienza la ceremonia religiosa"
    },
   
    {
      time: "21:00",
      title: "Cena",
      location: "Comedor",
      description: "Cena servida a la mesa"
    },
    {
      time: "22:30",
      title: "Brindis y juegos",
      location: "Salón Principal",
      description: "Brindis especial y actividades"
    }
  ];

  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-wedding-gold" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Cronograma
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-3">
            Horario del Evento
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Conoce la agenda de nuestra celebración
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical central */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-wedding-gold via-wedding-gold to-transparent"></div>

          {/* Events */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative">
                <div className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div className="bg-card rounded-lg p-6 shadow-sm border border-wedding-gold/20 hover:border-wedding-gold/50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-2 mb-2">
                        <Clock className="w-4 h-4 text-wedding-gold flex-shrink-0 mt-0.5" />
                        <span className="font-playfair text-2xl font-bold text-wedding-gold">
                          {event.time}
                        </span>
                      </div>
                      
                      <h3 className="font-playfair text-xl font-bold mb-2">
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-wedding-gold/60" />
                        {event.location}
                      </div>

                      {event.description && (
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-0 flex justify-center relative">
                    <div className="w-4 h-4 bg-wedding-gold rounded-full border-4 border-white shadow-md"></div>
                  </div>

                  {/* Empty space */}
                  <div className="w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;