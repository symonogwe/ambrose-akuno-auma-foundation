// AnimatedCounter — placeholder for a count-up animation component
// Used in ImpactStats section to animate numbers on scroll into view
// Will use Framer Motion + a count-up hook when fully implemented

import { Text } from '@chakra-ui/react';

const AnimatedCounter = ({ value, suffix = '' }) => {
  return (
    <Text fontSize="4xl" fontWeight="bold" color="brand.accent">
      {value}{suffix}
    </Text>
  );
};

export default AnimatedCounter;
