import { Box, Text } from '@chakra-ui/react';

// Placeholder — Programs section to be built out
const Programs = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
    >
      <Text fontSize="2xl" fontWeight="bold">
        Programs Section
      </Text>
    </Box>
  );
};

export default Programs;
