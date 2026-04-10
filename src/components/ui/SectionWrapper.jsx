// SectionWrapper — consistent padding and max-width container for all sections
// Wrap each section's inner content with this to keep layout uniform

import { Box } from '@chakra-ui/react';

const SectionWrapper = ({ children, bg, ...rest }) => {
  return (
    <Box as="section" bg={bg} py={{ base: 16, md: 24 }} px={{ base: 4, md: 6 }} {...rest}>
      <Box maxW="7xl" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default SectionWrapper;
