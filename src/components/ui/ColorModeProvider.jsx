/* eslint-disable react-refresh/only-export-components */
// Context modules that co-locate a provider + hooks are a known exception to this rule.

/**
 * ColorModeProvider — lightweight dark/light mode context for Chakra UI v3.
 *
 * Chakra v3 dark mode is driven by the `.dark` CSS class on <html>.
 * This provider manages that class and exposes useColorMode + useColorModeValue.
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
      // Chakra v3 resolves the `_dark` condition via `.dark` on <html>
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

/** Returns the active color mode and a toggle function. */
export const useColorMode = () => useContext(ColorModeContext);

/**
 * Returns lightValue when in light mode, darkValue when in dark mode.
 * Mirrors the Chakra v2 useColorModeValue API.
 */
export const useColorModeValue = (lightValue, darkValue) => {
  const { colorMode } = useContext(ColorModeContext);
  return colorMode === 'light' ? lightValue : darkValue;
};
