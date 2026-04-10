import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

/**
 * Chakra UI v3 theme — uses createSystem + defineConfig (not extendTheme).
 * Dark mode is toggled by adding/removing the `.dark` class on <html>.
 * Conditions:  _dark  → ".dark &"   |   _light → ":root &, .light &"
 */
const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body:    { value: `'Inter', sans-serif` },
        heading: { value: `'Playfair Display', serif` },
      },
      colors: {
        brand: {
          primary: { value: '#2563EB' }, // Blue
          accent:  { value: '#F59E0B' }, // Gold
          navy:    { value: '#0A1628' }, // Dark navy
        },
      },
    },
    semanticTokens: {
      colors: {
        // bg and fg swap automatically when .dark is on <html>
        'app.bg': { value: { _light: '#FFFFFF', _dark: '#0A1628' } },
        'app.fg': { value: { _light: '#0A1628', _dark: '#F7F8FA' } },
      },
    },
  },
  globalCss: {
    'html, body': {
      bg: 'app.bg',
      color: 'app.fg',
      fontFamily: 'body',
      fontSize: '16px',
    },
  },
});

const system = createSystem(defaultConfig, config);

export default system;
