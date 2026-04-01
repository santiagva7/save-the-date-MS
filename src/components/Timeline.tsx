import { Clock, MapPin } from "lucide-react";
import { DesignTheme } from "@/lib/designThemes";

interface TimelineEvent {
  time: string;
  title: string;
  location: string;
  description?: string;
}

interface TimelineProps {
  theme?: DesignTheme;
}

const Timeline = ({ theme }: TimelineProps) => {
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
    <div className="w-full py-12 px-4" style={{ backgroundColor: theme?.colors.background }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" style={{ color: theme?.colors.primary }} />
            <span 
              className="text-sm font-medium uppercase tracking-wider"
              style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
            >
              Cronograma
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
          >
            Horario del Evento
          </h2>
          <p 
            className="max-w-xl mx-auto"
            style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
          >
            Conoce la agenda de nuestra celebración
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical central */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, ${theme?.colors.primary}, ${theme?.colors.primary}cc, transparent)` 
            }}
          ></div>

          {/* Events */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative">
                <div className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div 
                      className="rounded-lg p-6 shadow-sm border hover:shadow-md transition-all duration-300"
                      style={{ 
                        backgroundColor: theme?.colors.light,
                        borderColor: `${theme?.colors.primary}33`
                      }}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: theme?.colors.primary }} />
                        <span 
                          className="text-2xl font-bold"
                          style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.primary }}
                        >
                          {event.time}
                        </span>
                      </div>
                      
                      <h3 
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: theme?.fonts.heading, color: theme?.colors.text }}
                      >
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3 text-sm" style={{ color: theme?.colors.accent }}>
                        <MapPin className="w-4 h-4" style={{ opacity: 0.6 }} />
                        {event.location}
                      </div>

                      {event.description && (
                        <p 
                          className="text-sm"
                          style={{ color: theme?.colors.accent, fontFamily: theme?.fonts.body }}
                        >
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-0 flex justify-center relative">
                    <div 
                      className="w-4 h-4 rounded-full border-4 shadow-md"
                      style={{ 
                        backgroundColor: theme?.colors.primary,
                        borderColor: theme?.colors.background || 'white'
                      }}
                    ></div>
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