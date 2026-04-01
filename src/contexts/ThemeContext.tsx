import { createContext, useContext, ReactNode, useState } from 'react';
import { DesignTheme, designThemes } from '@/lib/designThemes';

interface ThemeContextType {
  theme: DesignTheme;
  setTheme: (theme: DesignTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ 
  children, 
  defaultTheme = designThemes.design3 
}: { 
  children: ReactNode;
  defaultTheme?: DesignTheme;
}) => {
  const [theme, setTheme] = useState<DesignTheme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
