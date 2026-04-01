export interface DesignTheme {
  id: 'design3';
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    light: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export const designThemes: Record<string, DesignTheme> = {
  design3: {
    id: 'design3',
    name: 'Diseño 3 - Natural y Elegante',
    colors: {
      primary: '#a1714e',      // Brown
      secondary: '#cebbaa',    // Tan
      accent: '#d4b48d',       // Light tan
      dark: '#603e32',         // Darkest brown
      light: '#e8dcc8',        // Very light
      text: '#202020',         // Dark gray/black
      background: '#faf6f0',   // Off-white
    },
    fonts: {
      heading: "'Josefin Slab', serif",
      body: "'Josefin Sans', sans-serif",
    },
  },
};

export const getTheme = (designId: 'design3'): DesignTheme => {
  return designThemes[designId];
};
