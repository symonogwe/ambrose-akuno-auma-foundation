import { Box, IconButton } from '@chakra-ui/react';
// react-icons replaces @chakra-ui/icons, which is v2-only and incompatible with Chakra v3
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useColorMode } from './components/ui/ColorModeProvider';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Mission from './sections/Mission';
import Programs from './sections/Programs';
import ImpactStats from './sections/ImpactStats';
import Team from './sections/Team';
import HQMap from './sections/HQMap';
import Contact from './sections/Contact';

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Navbar />
      <Hero />
      <Mission />
      <Programs />
      <ImpactStats />
      <Team />
      <HQMap />
      <Contact />
      <Footer />

      {/* Dev-only floating color mode toggle — fixed bottom-right */}
      <IconButton
        aria-label="Toggle color mode"
        onClick={toggleColorMode}
        position="fixed"
        bottom={6}
        right={6}
        zIndex={9999}
        colorPalette="blue"
        borderRadius="full"
        shadow="lg"
        size="lg"
      >
        {colorMode === 'light' ? <BsMoonFill /> : <BsSunFill />}
      </IconButton>
    </Box>
  );
};

export default App;
