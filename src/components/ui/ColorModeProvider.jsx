/**
 * ColorModeProvider — lightweight dark/light mode context for Chakra UI v3.
 *
 * Chakra v3 dark mode is driven by the `.dark` CSS class on <html>.
 * This provider manages that class and exposes a toggleColorMode hook.
 * Initial mode: light (matches theme config).
 */

import { createContext, useContext, useState } from 'react';

const ColorModeContext = createContext({
  colorMode: 'light',
  toggleColorMode: () => {},
});

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState('light');

  const toggleColorMode = () => {
    setColorMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      // Chakra v3 reads the `.dark` class on the root element
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

// Drop-in hook — mirrors the Chakra v2 API for easy future migration
export const useColorMode = () => useContext(ColorModeContext);
