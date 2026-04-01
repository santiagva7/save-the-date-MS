import { DesignTheme, designThemes } from "@/lib/designThemes";
import InvitationPreview from "@/components/InvitationPreview";
import { GuestInfo } from "@/data/guestCodes";

// Guest de prueba para la vista previa
const mockGuest: GuestInfo = {
  code: "DEMO2027",
  name: "Melina & Santiago",
  message: "Querido amigo, esperamos contar con tu presencia en este día tan especial.",
};

const DesignPreview = () => {
  const currentTheme: DesignTheme = designThemes["design3"];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Controles flotantes */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 py-4 px-4"
        style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-semibold">{currentTheme.name}</h2>
          </div>
        </div>
      </div>

      {/* Vista previa del diseño */}
      <div className="pt-20">
        <InvitationPreview guest={mockGuest} theme={currentTheme} />
      </div>
    </div>
  );
};

export default DesignPreview;
