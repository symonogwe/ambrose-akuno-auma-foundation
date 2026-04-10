import { Box } from '@chakra-ui/react';
import { Toaster } from './components/ui/toaster';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Mission from './sections/Mission';
import Programs from './sections/Programs';
import ImpactStats from './sections/ImpactStats';
import Team from './sections/Team';
import HQMap from './sections/HQMap';

const App = () => {
  return (
    <Box>
      <Toaster />
      <Navbar />
      <Hero />
      <Mission />
      <Programs />
      <ImpactStats />
      <Team />
      <HQMap />
      <Footer />
    </Box>
  );
};

export default App;
