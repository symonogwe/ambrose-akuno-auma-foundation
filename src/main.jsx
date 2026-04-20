import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import system from './theme';
import { ColorModeProvider } from './components/ui/ColorModeProvider';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  /* Chakra v3: pass the system object as `value`, not `theme` */
  <ChakraProvider value={system}>
    {/* ColorModeProvider manages .dark class on <html> for dark mode */}
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </ChakraProvider>
);
