import { Box, Text } from '@chakra-ui/react';

// Placeholder — full Navbar to be built out
const Navbar = () => {
  return (
    <Box
      as="nav"
      bg="#2563EB"
      color="white"
      px={8}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Text fontWeight="bold" fontSize="lg">
        Ambrose Akuno Auma Foundation — Navbar
      </Text>
    </Box>
  );
};

export default Navbar;
