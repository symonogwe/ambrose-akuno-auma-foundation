import { Box, Text, Heading } from '@chakra-ui/react';

// TODO: Replace placeholder box with Google Maps embed using API key
// Map integration will use the @react-google-maps/api package
const HQMap = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
      px={8}
      gap={4}
    >
      <Heading as="h2" fontFamily="heading">
        Find Us
      </Heading>
      <Text fontSize="lg" color="gray.500">
        Our UK Headquarters
      </Text>

      {/* Placeholder for Google Maps embed */}
      <Box
        w="full"
        maxW="800px"
        h="400px"
        bg="gray.300"
        _dark={{ bg: 'gray.700' }}
        borderRadius="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="gray.500" fontSize="sm">
          Map placeholder — Google Maps embed coming soon
        </Text>
      </Box>
    </Box>
  );
};

export default HQMap;
