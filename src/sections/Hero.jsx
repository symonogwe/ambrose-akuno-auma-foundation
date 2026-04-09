import { Box, Text } from '@chakra-ui/react';

// Placeholder — Hero section to be built out with Framer Motion animations
const Hero = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#2563EB"
      color="white"
    >
      <Text fontSize="2xl" fontWeight="bold">
        Hero Section
      </Text>
    </Box>
  );
};

export default Hero;
