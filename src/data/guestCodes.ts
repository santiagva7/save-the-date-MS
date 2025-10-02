export interface GuestInfo {
  code: string;
  name: string;
  message?: string;
}

export const guestCodes: GuestInfo[] = [
  {
    code: "MEL2026",
    name: "María",
    message: "Querida María, nos encantaría que nos acompañes en este día tan especial"
  },
  {
    code: "SAN2026",
    name: "Juan",
    message: "Querido Juan, tu presencia haría este día aún más memorable"
  },
  {
    code: "LOVE2026",
    name: "Familia García",
    message: "Querida Familia García, esperamos celebrar con ustedes este momento único"
  },
  {
    code: "WEDDING26",
    name: "Invitado/a",
    message: "Nos encantaría compartir este día especial contigo"
  }
];

export const validateGuestCode = (code: string): GuestInfo | null => {
  const guest = guestCodes.find(
    (g) => g.code.toLowerCase() === code.toLowerCase()
  );
  return guest || null;
};
