import { Box } from '@chakra-ui/react';

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
    </Box>
  );
};

export default App;
