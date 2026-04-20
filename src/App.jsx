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
    <Box
      minH="100vh"
      overflowX="hidden"
    >
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Toaster />
      <Navbar />
      <Box id="main-content">
        {/* id="home" wraps Hero (Hero's internal id is "hero") */}
        <div id="home"><Hero /></div>
        {/* id="about" wraps Mission (Mission's internal id is "mission") */}
        <div id="about"><Mission /></div>
        {/* Programs, ImpactStats, Team already carry the correct id internally */}
        <Programs />
        <ImpactStats />
        <Team />
        {/* id="contact" wraps HQMap (HQMap has no internal id) */}
        <div id="contact"><HQMap /></div>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
